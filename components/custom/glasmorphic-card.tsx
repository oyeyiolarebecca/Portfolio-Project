import { cn } from "@/lib/utils"
import Image from "next/image"

interface GlassmorphicCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
    imageSrc?: string
}

export function GlassmorphicCard({ children, className, imageSrc, ...props }: GlassmorphicCardProps) {
    return (
        <div
            className={cn(
                "relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-xl backdrop-blur-xl",
                className
            )}
            {...props}
        >
            {imageSrc && (
                <div className="absolute inset-0 z-0">
                    <Image
                        src={imageSrc}
                        alt="Background"
                        layout="fill"
                        objectFit="cover"
                        className="opacity-20"
                    />
                </div>
            )}
            <div className="relative z-10 p-8">
                {children}
            </div>
        </div>
    )
}

