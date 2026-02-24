import { Loader2 } from "lucide-react";

export default function LoadingSpinner({ size = 36, text = "Loading..." }) {
    return (
        <div className="flex flex-col items-center justify-center gap-3 py-16 w-full">
            <Loader2 size={size} className="animate-spin text-orange-400" />
            <p className="text-gray-400 text-sm font-medium">{text}</p>
        </div>
    );
}
