import { TaskFormData } from "../types/task";

interface TaskFormProps {
  form: TaskFormData;
  editingId: number | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onCancel: () => void;
}

export function TaskForm({ form, editingId, onChange, onSubmit, onCancel }: TaskFormProps) {
  return (
    <div className="bg-white rounded border border-gray-200 p-5 mb-6">
      <h2 className="text-lg font-semibold mb-4">
        {editingId ? "Edit Task" : "Create Task"}
      </h2>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
            <input
              name="task_title"
              value={form.task_title}
              onChange={onChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              placeholder="Task title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
            <input
              name="task_due_date"
              type="date"
              value={form.task_due_date}
              onChange={onChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="task_description"
            value={form.task_description}
            onChange={onChange}
            rows={3}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            placeholder="Task description"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              name="task_status"
              value={form.task_status}
              onChange={onChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            >
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
            <input
              name="task_remarks"
              value={form.task_remarks}
              onChange={onChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              placeholder="Any remarks"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Created By (Name) *</label>
            <input
              name="created_by_name"
              value={form.created_by_name}
              onChange={onChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Created By (ID) *</label>
            <input
              name="created_by_id"
              value={form.created_by_id}
              onChange={onChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              placeholder="Your ID"
            />
          </div>
        </div>

        {editingId && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Updated By (Name)</label>
              <input
                name="last_updated_by_name"
                value={form.last_updated_by_name}
                onChange={onChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                placeholder="Updater name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Updated By (ID)</label>
              <input
                name="last_updated_by_id"
                value={form.last_updated_by_id}
                onChange={onChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                placeholder="Updater ID"
              />
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded text-sm font-medium hover:bg-blue-700 cursor-pointer"
          >
            {editingId ? "Update Task" : "Create Task"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-200 text-gray-700 px-5 py-2 rounded text-sm font-medium hover:bg-gray-300 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
