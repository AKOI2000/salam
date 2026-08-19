// app/(admin)/admin/projects/[slug]/loading.jsx
import ProjectPageSkeleton from "@/app/_components/ProjectPageSkeleton";

export default function Loading() {
  return (
    <>
      <div className="container">
        <ProjectPageSkeleton />
      </div>
    </>
  );
}
