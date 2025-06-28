import AuthChecker from "@/components/AuthChecker"

type Props = {
    children: React.ReactNode
}

export const dynamic = 'force-dynamic';

const PublicLayout = async ({ children }: Props) => {
    return (
        <AuthChecker>
            {children}
        </AuthChecker>
    )
}

export default PublicLayout