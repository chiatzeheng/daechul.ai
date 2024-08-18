import React from 'react';
import AdminTable from './AdminTable';
import AdminSidebar from './AdminSidebar';
import { api } from '@/trpc/server';




const Page = async () => {

    const data = await api.loan.getAllLoans();

    return (
        <div className=" bg-black p-8">
            <div className="shadow-lg overflow-hidden">
                <div className="grid grid-cols-4 grid-rows-1 gap-6 bg">
                    <AdminSidebar />
                    <AdminTable data={data} />
                </div>
            </div>
        </div>
    );
};

export default Page;