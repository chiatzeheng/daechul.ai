import { getServerAuthSession } from "@/server/auth"
import { redirect } from "next/navigation"

type Props = {
    children: React.ReactNode
}
const PublicLayout = async ({ children }: Props) => {
    const session = await getServerAuthSession()

    if (session?.user) {
        return redirect('/dashboard')
    }

    return (
        <>
            {children}
        </>
    )
}

export default PublicLayout