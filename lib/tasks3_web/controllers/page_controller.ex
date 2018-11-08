defmodule Tasks3Web.PageController do
  use Tasks3Web, :controller

  def index(conn, _params) do
    users = Tasks3.Users.list_users()
    |> Enum.map(&(Map.take(&1, [:id, :name])))
    render(conn, "index.html", users: users)
  end
end
