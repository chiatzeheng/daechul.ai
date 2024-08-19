import React from 'react';
import AdminTable from './AdminTable';
import { api } from '@/trpc/server';




const Page = async () => {

    const data = await api.loan.getAllLoans();

    return (
        <div className=" bg-black p-8">
            <div className="shadow-lg overflow-hidden">
                <AdminTable data={data} />
            </div>
        </div>
    );
};

export default Page;