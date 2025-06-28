import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface StatusBadgeProps {
  status: string
  variant?: "default" | "success" | "warning" | "error"
  className?: string
}

export function StatusBadge({ status, variant, className }: StatusBadgeProps) {
  const getVariant = () => {
    if (variant) return variant
    
    switch (status.toLowerCase()) {
      case 'approved':
        return 'success'
      case 'pending':
      case 'under_review':
        return 'warning'
      case 'rejected':
      case 'cancelled':
        return 'error'
      default:
        return 'default'
    }
  }

  const variantStyles = {
    default: "bg-gray-100 text-gray-800 border-gray-200",
    success: "bg-green-100 text-green-800 border-green-200",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
    error: "bg-red-100 text-red-800 border-red-200"
  }

  return (
    <Badge 
      className={cn(
        "font-medium",
        variantStyles[getVariant()],
        className
      )}
    >
      {status.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}
    </Badge>
  )
}