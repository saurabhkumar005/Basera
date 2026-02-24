export default function ListingCardSkeleton() {
    return (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse">
            <div className="w-full aspect-video bg-slate-200" />
            <div className="p-3 flex flex-col gap-2">
                <div className="h-4 bg-slate-200 rounded w-3/4" />
                <div className="h-4 bg-slate-200 rounded w-1/2" />
                <div className="h-3 bg-slate-200 rounded w-2/3" />
                <div className="h-7 bg-slate-100 rounded-xl mt-1" />
            </div>
        </div>
    );
}
