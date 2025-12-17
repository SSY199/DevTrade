import ProjectCard from "./ProjectCards";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { deleteProject } from "@/api/project.api";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useState } from "react";
import { createPortal } from "react-dom";

export default function MyProjectCard({ project, refetch }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteProject(project._id),
    onSuccess: () => {
      toast.success("Project deleted successfully");
      setConfirmOpen(false);
      refetch();
    },
    onError: () => toast.error("Delete failed"),
  });

  return (
    <div className="bg-[#0d121a] border border-gray-800 rounded-xl shadow-lg p-4 space-y-4">
      {/* Project Preview */}
      <ProjectCard project={project} />

      {/* ACTION BUTTONS */}
      <div className="grid grid-cols-2 gap-3 pt-2">
        <Link to={`/update/${project._id}`}>
          <Button
            size="sm"
            className="w-full bg-blue-600/90 hover:bg-blue-600 transition"
          >
            Edit
          </Button>
        </Link>

        <Button
          size="sm"
          onClick={() => setConfirmOpen(true)}
          disabled={isPending}
          className="w-full bg-red-600/90 hover:bg-red-600 transition"
        >
          Delete
        </Button>
      </div>

      {/* CONFIRM MODAL */}
      {confirmOpen &&
        createPortal(
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
  <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 w-full max-w-sm md:max-w-md shadow-2xl">
    
    <h2 className="text-xl font-semibold text-white mb-2">Delete Project?</h2>

    <p className="text-gray-400 mb-6 text-sm leading-relaxed">
      Are you sure you want to delete{" "}
      <span className="text-white font-medium">{project.title}</span>?
      This action cannot be undone.
    </p>

    <div className="flex gap-3 flex-wrap justify-end">
      <Button
        variant="secondary"
        className="px-4 py-2 text-sm"
        onClick={() => setConfirmOpen(false)}
      >
        Cancel
      </Button>

      <Button
        className="px-4 py-2 text-sm bg-red-600 hover:bg-red-700"
        disabled={isPending}
        onClick={() => mutate()}
      >
        {isPending ? "Deleting..." : "Confirm"}
      </Button>
    </div>
  </div>
</div>
,
          document.body
        )}
    </div>
  );
}
