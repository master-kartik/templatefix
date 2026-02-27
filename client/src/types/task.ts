export interface Task {
  id: number;
  task_title: string;
  task_description: string;
  task_due_date: string;
  task_status: string;
  task_remarks: string;
  created_on: string;
  last_updated_on: string;
  created_by_name: string;
  created_by_id: string;
  last_updated_by_name: string;
  last_updated_by_id: string;
}

export type TaskFormData = Omit<Task, "id" | "created_on" | "last_updated_on">;
