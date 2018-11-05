defmodule Tasks3Web.PageController do
  use Tasks3Web, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
