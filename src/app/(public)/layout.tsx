import AuthChecker from "@/components/AuthChecker"
import { getServerAuthSession } from "@/server/auth"

type Props = {
    children: React.ReactNode
}

export const dynamic = 'force-dynamic';

const PublicLayout = async ({ children }: Props) => {
    const session = await getServerAuthSession()
    
    return (
        <AuthChecker session={session}>
            {children}
        </AuthChecker>
    )
}

export default PublicLayout