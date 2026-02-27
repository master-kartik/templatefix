import { Task } from "../types/task";

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => Promise<void>;
}

function statusColor(status: string) {
  switch (status) {
    case "Completed": return "bg-green-100 text-green-800";
    case "In Progress": return "bg-yellow-100 text-yellow-800";
    case "Cancelled": return "bg-red-100 text-red-800";
    default: return "bg-gray-100 text-gray-800";
  }
}

export function TaskList({ tasks, loading, onEdit, onDelete }: TaskListProps) {
  if (loading) {
    return <div className="text-center py-6 text-gray-500 text-sm">Loading...</div>;
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No tasks found. Click '+ New Task' to create one.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div key={task.id} className="bg-white border border-gray-200 rounded p-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-gray-900">{task.task_title}</h3>
              {task.task_description && (
                <p className="text-sm text-gray-600 mt-1">{task.task_description}</p>
              )}
            </div>
            <span className={`text-xs px-2 py-1 rounded font-medium ${statusColor(task.task_status)}`}>
              {task.task_status}
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-gray-500 mt-3">
            {task.task_due_date && (
              <div><span className="font-medium">Due:</span> {task.task_due_date}</div>
            )}
            {task.task_remarks && (
              <div><span className="font-medium">Remarks:</span> {task.task_remarks}</div>
            )}
            <div>
              <span className="font-medium">Created:</span> {new Date(task.created_on).toLocaleDateString()}
            </div>
            <div>
              <span className="font-medium">By:</span> {task.created_by_name} ({task.created_by_id})
            </div>
          </div>

          {task.created_on !== task.last_updated_on && (
            <div className="text-xs text-gray-400 mt-1">
              Updated: {new Date(task.last_updated_on).toLocaleDateString()} by {task.last_updated_by_name} ({task.last_updated_by_id})
            </div>
          )}

          <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
            <button
              onClick={() => onEdit(task)}
              className="text-xs text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="text-xs text-red-600 hover:text-red-800 font-medium cursor-pointer"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
