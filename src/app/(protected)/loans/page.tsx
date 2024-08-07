import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import FileUploadComponent from '@/components/LoanUpload';
import UploadFiles from '@/components/UploadFiles';

export default function LoanApplicationPage() {
    return (
        <div className="min-h-screen bg-black text-white p-8">
            <h1 className="text-3xl font-bold mb-8">Loan Application</h1>
            <Card className="bg-white text-black">
                <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="firstName">First Name</Label>
                            <Input id="firstName" placeholder="John" />
                        </div>
                        <div>
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input id="lastName" placeholder="Doe" />
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="johndoe@example.com" />
                    </div>
                    <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" placeholder="(123) 456-7890" />
                    </div>
                    <div>
                        <Label htmlFor="loanAmount">Desired Loan Amount</Label>
                        <Input id="loanAmount" type="number" placeholder="10000" />
                    </div>

                    <UploadFiles />
                    <Button className="w-full bg-gradient-to-br from-blue-600  hover:bg-blue-700 text-white">
                        Submit Application
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}