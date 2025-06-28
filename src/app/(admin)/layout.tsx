import AuthChecker from "@/components/AuthChecker"
import { Suspense } from "react"

type Props = {
    children: React.ReactNode
}

export const dynamic = 'force-dynamic';

const AdminLayout = ({ children }: Props) => {
    return (
        <Suspense>
            <AuthChecker userRole="admin">
                {children}
            </AuthChecker>
        </Suspense>
    )
}

export default AdminLayout