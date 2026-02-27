import supabase from "../config/db.js";

const TaskModel = {
  async create(taskData) {
    const { data, error } = await supabase
      .from("tasks")
      .insert([{...taskData,  task_due_date: taskData.task_due_date || null}])
      .select();
    if (error) {
      console.error("Supabase INSERT error:", error);
      throw new Error(error.message);
    }
    return data[0];
  },

  async getAll() {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("created_on", { ascending: false });
    if (error) {
      console.error("Supabase SELECT ALL error:", error);
      throw new Error(error.message);
    }
    return data || [];
  },

  async update(id, taskData) {
    const { data, error } = await supabase
      .from("tasks")
      .update({ ...taskData, last_updated_on: new Date().toISOString() })
      .eq("id", id)
      .select();
    if (error) {
      console.error("Supabase UPDATE error:", error);
      throw new Error(error.message);
    }
    return data[0];
  },

  async delete(id) {
    const { error } = await supabase.from("tasks").delete().eq("id", id);
    if (error) {
      console.error("Supabase DELETE error:", error);
      throw new Error(error.message);
    }
    return true;
  },

  async search(query) {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .ilike("task_title", `%${query}%`)
      .order("created_on", { ascending: false });
    if (error) {
      console.error("Supabase SEARCH error:", error);
      throw new Error(error.message);
    }
    return data || [];
  },
};

export default TaskModel;
