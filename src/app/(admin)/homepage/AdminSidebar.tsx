const AdminSidebar = () => {
    return (
        <div className="rounded-lg  col-span-1 row-span-1 bg-gray-100 p-6">
            <h2 className="text-xl font-bold mb-4"></h2>
            <ul className="space-y-2">
                <li><a href="#" className="text-gray-700 hover:text-gray-900">Home</a></li>
                <li><a href="#" className="text-gray-700 hover:text-gray-900">About</a></li>
                <li><a href="#" className="text-gray-700 hover:text-gray-900">Contact</a></li>
            </ul>
        </div>
    )
}
export default AdminSidebar;