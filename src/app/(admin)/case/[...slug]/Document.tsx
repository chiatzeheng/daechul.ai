"use client";
import React, { useState } from 'react';
import { FileText, ChevronLeft, ChevronRight, ExternalLink, Edit } from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { DocumentStatus } from '@prisma/client';
import { api } from '@/trpc/react';
import { capitalizeFirst } from '@/lib/functions';
import { toast } from '@/components/ui/use-toast';




type Document = {
    id: number;
    userId: string;
    name: string;
    key: string;
    url: string;
    currentStatus: DocumentStatus;
}

const DocumentList = ({ documents }: { documents: Document[] }) => {
    const utils = api.useUtils()

    const [currentPage, setCurrentPage] = useState(1);
    const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
    const [editingDoc, setEditingDoc] = useState<Document | null>(null);
    const [newStatus, setNewStatus] = useState<DocumentStatus | null>(null);
    const documentsPerPage = 4;

    const indexOfLastDoc = currentPage * documentsPerPage;
    const indexOfFirstDoc = indexOfLastDoc - documentsPerPage;
    const currentDocs = documents.slice(indexOfFirstDoc, indexOfLastDoc);

    const totalPages = Math.ceil(documents.length / documentsPerPage);

    const handlePrevious = () => setCurrentPage(prev => Math.max(prev - 1, 1));
    const handleNext = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));

    const handleStatusChange = api.loan.updateDocumentStatus.useMutation();
    const handleDelete = api.loan.deleteDocument.useMutation();

    const updateStatus = async (docId: number, status: DocumentStatus) => {
        handleStatusChange.mutate({ id: docId, status: status }, {
            onSuccess: () => {
                async () => {
                    return await utils.loan.getAllLoans.invalidate();
                }
                toast({
                    description: `Document ${docId} status updated to ${status}`,
                })
                if (status === 'REJECTED') {
                    handleDelete.mutate({ id: docId }, {
                        onSuccess: () => {
                            toast({
                                description: `Document ${docId} deleted`,
                            })
                        },
                        onError: (error) => {
                            console.error("Error deleting document:", error);
                            toast({
                                description: "Error deleting document",
                                variant: "destructive"
                            })
                        }
                    });
                }
                setEditingDoc(null);
                setNewStatus(null);
            },
            onError: (error) => {
                console.error("Error updating document status:", error);
                toast({
                    description: "Error updating document status",
                    variant: "destructive"
                })
            }


        });
    };

    return (
        <Card className="h-full flex flex-col">
            <CardHeader>
                <CardTitle>Documents</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow overflow-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentDocs.map((doc) => (
                            <TableRow key={doc.id}>
                                <TableCell className="flex items-center">
                                    <FileText className="mr-2 h-6 w-6" />
                                    {doc.name}
                                </TableCell>
                                <TableCell>{capitalizeFirst(doc.currentStatus)}</TableCell>
                                <TableCell>
                                    <div className="flex space-x-2">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="outline" size="sm" onClick={() => setSelectedDoc(doc)}>
                                                    <ExternalLink className="h-4 w-4 mr-2" />
                                                    View
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="max-w-4xl max-h-[80vh]">
                                                <DialogHeader>
                                                    <DialogTitle>{selectedDoc?.name}</DialogTitle>
                                                </DialogHeader>
                                                <div className="w-full h-[calc(80vh-100px)]">
                                                    {selectedDoc && (
                                                        <iframe
                                                            src={selectedDoc.url}
                                                            className="w-full h-full border-0"
                                                            title={selectedDoc.name}
                                                        />
                                                    )}
                                                </div>
                                            </DialogContent>
                                        </Dialog>

                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="outline" size="sm" onClick={() => setEditingDoc(doc)}>
                                                    <Edit className="h-4 w-4 mr-2" />
                                                    Edit
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Edit Document Status</DialogTitle>
                                                </DialogHeader>
                                                <Select onValueChange={(value) => setNewStatus(value as DocumentStatus)}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select new status" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="PENDING">Pending</SelectItem>
                                                        <SelectItem value="UNDER_REVIEW">Under Review</SelectItem>
                                                        <SelectItem value="APPROVED">Approved</SelectItem>
                                                        <SelectItem value="REJECTED">Rejected</SelectItem>
                                                        <SelectItem value="CANCELLED">Cancelled</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <Button onClick={async () => {
                                                    if (editingDoc && newStatus) {
                                                        await updateStatus(editingDoc.id, newStatus);
                                                    }
                                                }}>
                                                    Update Status
                                                </Button>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
                <Button onClick={handlePrevious} disabled={currentPage === 1}>
                    <ChevronLeft className="h-4 w-4 mr-2" /> Previous
                </Button>
                <span>Page {currentPage} of {totalPages}</span>
                <Button onClick={handleNext} disabled={currentPage === totalPages}>
                    Next <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
            </CardFooter>
        </Card>
    );
};

export default DocumentList;