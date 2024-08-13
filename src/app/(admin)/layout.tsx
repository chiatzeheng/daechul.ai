import { getServerAuthSession } from "@/server/auth"
import { redirect } from "next/navigation"
import { Suspense } from "react"

type Props = {
    children: React.ReactNode
}
const PublicLayout = async ({ children }: Props) => {
    const session = await getServerAuthSession()

    if (session?.user.role != 'admin') {
        return redirect('/dashboard')
    }

    return (
        <Suspense>
            {children}
        </Suspense>
    )
}

export default PublicLayout