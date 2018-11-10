defmodule Tasks3Web.PageController do
  use Tasks3Web, :controller

  def index(conn, _params) do
    users = Tasks3.Users.list_users()
    |> Enum.map(&(Map.take(&1, [:id, :name])))
    tasks = Tasks3.Tasks.list_tasks()
    |> Enum.map(&(Map.take(&1, [:id, :title, :desc, :assigned_user, :completed, :time_worked])))
    render(conn, "index.html", users: users, tasks: tasks)
  end
end
