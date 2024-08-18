import { FileText } from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';

type Document = {
    name: string;
}

const DocumentList = ({ documents }: { documents: Document[] }) => (
    <Card className="h-full overflow-auto">
        <CardHeader>
            <CardTitle>Documents</CardTitle>
        </CardHeader>
        <CardContent>
            <ul className="space-y-2">
                {documents.map((doc, index) => (
                    <li key={index} className="flex items-center">
                        <FileText className="mr-2 h-4 w-4" />
                        <span>{doc.name}</span>
                    </li>
                ))}
            </ul>
        </CardContent>
    </Card>
);

export default DocumentList;