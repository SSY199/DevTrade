import { useQuery } from "@tanstack/react-query";
import { getAllProject } from "@/api/project.api";
import ProjectCard from "@/components/cards/ProjectCards";

export default function Explore() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["all-projects"],
    queryFn: getAllProject,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        <h1 className="text-3xl font-bold mb-6">Explore Projects</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-gray-900 border border-gray-800 rounded-xl p-4 animate-pulse"
            >
              <div className="h-40 bg-gray-800 rounded mb-4" />
              <div className="h-4 bg-gray-800 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-800 rounded w-1/2 mb-4" />
              <div className="h-8 bg-gray-800 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (isError) return <p className="text-red-500">Failed to load projects.</p>;

  const projects = data?.data?.projects || []; // depends on your backend response

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Explore Projects</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>

      {projects.length === 0 && (
        <p className="text-gray-400 mt-4">No projects found.</p>
      )}
    </div>
  );
}
