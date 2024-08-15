const AdminTable = () => {

    return (
        <div className="flex flex-col">
            <div className="flex flex-row justify-between">
                <h1 className="text-2xl font-bold">Table</h1>
                <div className="flex space-x-4">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Add</button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded-md">Delete</button>
                </div>
            </div>
        </div>
    )
}

export default AdminTable