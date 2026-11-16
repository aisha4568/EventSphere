export default function SkeletonCard() {
  return (
    <div className="card p-4 animate-pulse">
      <div className="skeleton h-40 w-full mb-4" />
      <div className="skeleton h-5 w-3/4 mb-2" />
      <div className="skeleton h-4 w-1/2 mb-2" />
      <div className="skeleton h-10 w-full mt-4" />
    </div>
  );
}