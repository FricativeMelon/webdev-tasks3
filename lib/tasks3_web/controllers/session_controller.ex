defmodule Tasks3Web.SessionController do
  use Tasks3Web, :controller

  def create(conn, %{"name" => name, "password" => password}) do
    user = Tasks3.Users.get_and_auth_user(name, password)
    case user do
      nil ->
        conn
        |> put_resp_header("content-type", "application/json; charset=utf-8")
        |> send_resp(:not_found, Jason.encode!("error"))
      _ ->
        resp = %{
          data: %{
            token: Phoenix.Token.sign(Tasks3Web.Endpoint, "user_id", user.id),
            user_id: user.id,
          }
        }
        conn
        |> put_resp_header("content-type", "application/json; charset=utf-8")
        |> send_resp(:created, Jason.encode!(resp))
    end
  end
end
