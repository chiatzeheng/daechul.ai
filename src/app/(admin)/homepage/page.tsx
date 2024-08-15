import React from 'react';
import AdminTable from './AdminTable';
import AdminSidebar from './AdminSidebar';


const Page = () => {

    return (
        <div className="min-h-screen bg-black p-8">
            <div className="shadow-lg overflow-hidden">
                <div className="grid grid-cols-4 grid-rows-1 gap-6 bg">
                    <AdminSidebar />
                    <AdminTable />
                </div>
            </div>
        </div>
    );
};

export default Page;