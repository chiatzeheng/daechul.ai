import AuthChecker from "@/components/AuthChecker"
import { getServerAuthSession } from "@/server/auth"
import { Suspense } from "react"

type Props = {
    children: React.ReactNode
}

export const dynamic = 'force-dynamic';

const PrivateLayout = async ({ children }: Props) => {
    const session = await getServerAuthSession()
    
    return (
        <Suspense>
            <AuthChecker userRole="user" session={session}>
                {children}
            </AuthChecker>
        </Suspense>
    )
}

export default PrivateLayout