defmodule Tasks3Web.UserController do
  use Tasks3Web, :controller

  alias Tasks3.Users
  alias Tasks3.Users.User

  action_fallback Tasks3Web.FallbackController

  def index(conn, _params) do
    users = Users.list_users()
    render(conn, "index.json", users: users)
  end

  def create(conn, %{"name" => name, "password" => password}) do
    t = %{"name" => name, "password_hash" => Comeonin.Argon2.hashpwsalt(password)}
    with {:ok, %User{} = user} <- Users.create_user(t) do 
      conn
      |> put_session(:user_id, user.id)
      |> put_resp_header("location", Routes.page_path(conn, :index))
      |> redirect(to: Routes.page_path(conn, :index))
    end
  end

  def show(conn, %{"id" => id}) do
    user = Users.get_user!(id)
    render(conn, "show.json", user: user)
  end

  def update(conn, %{"id" => id, "user" => user_params}) do
    user = Users.get_user!(id)

    with {:ok, %User{} = user} <- Users.update_user(user, user_params) do
      render(conn, "show.json", user: user)
    end
  end

  def delete(conn, %{"id" => id}) do
    user = Users.get_user!(id)

    with {:ok, %User{}} <- Users.delete_user(user) do
      send_resp(conn, :no_content, "")
    end
  end
end
