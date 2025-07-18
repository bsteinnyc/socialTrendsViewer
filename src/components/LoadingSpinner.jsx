import { Loader2 } from "lucide-react"

export function LoadingSpinner({ size = "md", text }) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  }

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <Loader2 className={`animate-spin ${sizeClasses[size]} text-muted-foreground`} />
      {text && <p className="mt-2 text-sm text-muted-foreground">{text}</p>}
    </div>
  )
}
