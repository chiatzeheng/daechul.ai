import Navigation from "@/components/Navigation"
import { getServerAuthSession } from "@/server/auth"
import { redirect } from "next/navigation"
import { Suspense } from "react"

type Props = {
    children: React.ReactNode
}
const PrivateLayout = async ({ children }: Props) => {
    const session = await getServerAuthSession()

    if (!session?.user) {
        return redirect('/authenticate')
    }

    if (session?.user.role === 'admin') {
        return redirect('/homepage')
    }
    return (
        <Suspense>
            <Navigation user={session?.user} />
            {children}
        </Suspense>
    )
}

export default PrivateLayout