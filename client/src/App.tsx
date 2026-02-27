import { useState, useEffect } from "react";
import axios from "axios";
import { Task, TaskFormData } from "./types/task";
import { TaskForm } from "./components/TaskForm";
import { TaskList } from "./components/TaskList";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
const API_URL = `${BACKEND_URL}/api/tasks`;

const emptyForm: TaskFormData = {
  task_title: "",
  task_description: "",
  task_due_date: "",
  task_status: "Pending",
  task_remarks: "",
  created_by_name: "",
  created_by_id: "",
  last_updated_by_name: "",
  last_updated_by_id: "",
};

export function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [form, setForm] = useState<TaskFormData>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchTasks() {
    setLoading(true);
    try {
      const { data } = await axios.get<Task[]>(API_URL);
      setTasks(data);
      setError("");
    } catch (err) {
      setTasks([]);
      setError("Cannot connect to backend.");
    }
    setLoading(false);
  }

  async function searchTasks(query: string) {
    if (!query.trim()) { fetchTasks(); return; }
    setLoading(true);
    try {
      const { data } = await axios.get<Task[]>(`${API_URL}/search`, {
        params: { q: query },  
      });
      setTasks(data);
      setError("");
    } catch (err) {
      setTasks([]);
      setError("Search failed. Check backend connection.");
    }
    setLoading(false);
  }

  useEffect(() => { fetchTasks(); }, []);

  useEffect(() => {
    const timer = setTimeout(() => { searchTasks(searchQuery); }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.task_title.trim() || !form.created_by_name.trim() || !form.created_by_id.trim()) return;

    try {
      if (editingId !== null) {
        await axios.put(`${API_URL}/${editingId}`, {
          ...form,
          last_updated_by_name: form.last_updated_by_name || form.created_by_name,
          last_updated_by_id: form.last_updated_by_id || form.created_by_id,
        });
      } else {
        await axios.post(API_URL, {
          ...form,
          last_updated_by_name: form.created_by_name,
          last_updated_by_id: form.created_by_id,
        });
      }
      setForm(emptyForm);
      setEditingId(null);
      setShowForm(false);
      setError("");
      fetchTasks();
    } catch (err) {
      setError("Failed to save task. Check backend connection.");
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this task?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTasks();
    } catch (err) {
      setError("Failed to delete task.");
    }
  }

  function handleEdit(task: Task) {
    setForm({
      task_title: task.task_title,
      task_description: task.task_description || "",
      task_due_date: task.task_due_date || "",
      task_status: task.task_status,
      task_remarks: task.task_remarks || "",
      created_by_name: task.created_by_name,
      created_by_id: task.created_by_id,
      last_updated_by_name: task.last_updated_by_name,
      last_updated_by_id: task.last_updated_by_id,
    });
    setEditingId(task.id);
    setShowForm(true);
  }

  function handleCancel() {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900 pointer hover:cursor-pointer">Task Manager</h1>
          <button
            onClick={() => { setShowForm(!showForm); if (showForm) handleCancel(); }}
            className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700 cursor-pointer"
          >
            {showForm ? "Close" : "+ New Task"}
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        {showForm && (
          <TaskForm
            form={form}
            editingId={editingId}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        )}

        <div className="mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks by title..."
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white"
          />
        </div>

        <TaskList
          tasks={tasks}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </main>
    </div>
  );
}
