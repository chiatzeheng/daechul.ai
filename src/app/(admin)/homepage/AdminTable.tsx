import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";


const AdminTable = () => {
    return (
        <div className="rounded-lg  col-span-3 p-8 bg-white">
            <h1 className="text-2xl font-bold mb-6">Pending Loans</h1>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Name</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">Kim</TableCell>
                        <TableCell>Pending</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium"></TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium"></TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}
export default AdminTable