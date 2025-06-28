import Navigation from "@/components/Navigation"
import { getServerAuthSession } from "@/server/auth"
import { redirect } from "next/navigation"
import { Suspense } from "react"

export const dynamic = 'force-dynamic';

type Props = {
    children: React.ReactNode
}
const PublicLayout = async ({ children }: Props) => {
    const session = await getServerAuthSession()

    if (session?.user.role === 'user') {
        return redirect('/dashboard')
    }

    return (
        <Suspense>
            <Navigation user={session?.user} />
            {children}
        </Suspense>
    )
}

export default PublicLayout