import { redirect } from "next/navigation"
import { Header } from "./layout/Header"
import { Session } from "next-auth"

type Props = {
    children: React.ReactNode
    userRole?: 'admin' | 'user'
    redirectTo?: string
    session?: Session | null
}

const AuthChecker = ({ children, userRole, redirectTo, session }: Props) => {
    // Handle redirects based on user role and authentication status
    if (userRole === 'admin' && session?.user.role !== 'admin') {
        if (session?.user.role === 'user') {
            return redirect('/dashboard')
        }
        return redirect('/authenticate')
    }

    if (userRole === 'user' && session?.user.role !== 'user') {
        if (session?.user.role === 'admin') {
            return redirect('/homepage')
        }
        return redirect('/authenticate')
    }

    // For public routes, redirect authenticated users to their appropriate dashboard
    if (!userRole && session) {
        if (session.user.role === 'admin') {
            return redirect('/homepage')
        }
        if (session.user.role === 'user') {
            return redirect('/dashboard')
        }
    }

    // If redirectTo is specified and user is not authenticated, redirect
    if (redirectTo && !session) {
        return redirect(redirectTo)
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {session?.user && <Header user={session.user} />}
            <main className="flex-1">
                {children}
            </main>
        </div>
    )
}

export default AuthChecker