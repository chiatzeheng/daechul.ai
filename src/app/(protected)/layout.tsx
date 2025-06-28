import AuthChecker from "@/components/AuthChecker"
import { Suspense } from "react"

type Props = {
    children: React.ReactNode
}

export const dynamic = 'force-dynamic';

const PrivateLayout = ({ children }: Props) => {
    return (
        <Suspense>
            <AuthChecker userRole="user">
                {children}
            </AuthChecker>
        </Suspense>
    )
}

export default PrivateLayout