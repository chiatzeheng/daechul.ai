import { getServerAuthSession } from "@/server/auth"
import { redirect } from "next/navigation"
import { Suspense } from "react"

type Props = {
    children: React.ReactNode
}
const PublicLayout = async ({ children }: Props) => {
    const session = await getServerAuthSession()
    if (!session?.user) {
        return redirect('/authenticate')
    }
    return (
        <Suspense>
            {children}
        </Suspense>
    )
}

export default PublicLayout