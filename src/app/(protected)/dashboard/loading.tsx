import { Skeleton } from "@/components/ui/skeleton";

const LoanSkeleton = () => {
    return (
        <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
        </div>
    )


}


export default LoanSkeleton;