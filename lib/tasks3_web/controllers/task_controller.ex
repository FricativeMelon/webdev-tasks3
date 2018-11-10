defmodule Tasks3Web.TaskController do
  use Tasks3Web, :controller

  alias Tasks3.Tasks
  alias Tasks3.Tasks.Task

  action_fallback Tasks3Web.FallbackController

  def index(conn, _params) do
    tasks = Tasks.list_tasks()
    render(conn, "index.json", tasks: tasks)
  end

  def create(conn, %{"title" => title, "desc" => desc, "assigned_user" => assigned_user}) do
    t = %{"title" => title, "desc" => desc, "assigned_user" => assigned_user, "completed" => false, "time_worked" => 0}
    with {:ok, %Task{} = task} <- Tasks.create_task(t) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.task_path(conn, :index))
      |> redirect(to: Routes.task_path(conn, :index))
    end
  end

  def update(conn, %{"id" => id, "title" => title, "desc" => desc, "assigned_user" => assigned_user, "completed" => completed}) do
    params = %{"title" => title, "desc" => desc, "assigned_user" => assigned_user, "completed" => completed, "time_worked" => 0}
    t = Tasks.get_task!(id)
    with {:ok, %Task{} = task} <- Tasks.update_task(t, params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.task_path(conn, :index))
      |> redirect(to: Routes.task_path(conn, :index))
    end
  end

  def show(conn, %{"id" => id}) do
    task = Tasks.get_task!(id)
    render(conn, "show.json", task: task)
  end

  def delete(conn, %{"id" => id}) do
    task = Tasks.get_task!(id)

    with {:ok, %Task{}} <- Tasks.delete_task(task) do
      send_resp(conn, :no_content, "")
    end
  end
end
