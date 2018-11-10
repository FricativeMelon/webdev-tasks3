defmodule Tasks3Web.TaskView do
  use Tasks3Web, :view
  alias Tasks3Web.TaskView

  def render("index.json", %{tasks: tasks}) do
    %{data: render_many(tasks, TaskView, "task.json")}
  end

  def render("show.json", %{task: task}) do
    %{data: render_one(task, TaskView, "task.json")}
  end

  def render("task.json", %{task: task}) do
    %{id: task.id,
      title: task.title,
      desc: task.desc,
      completed: task.completed,
      time_worked: task.time_worked,
      assigned_user: task.assigned_user}
  end
end
