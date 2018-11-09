defmodule Tasks3Web.Router do
  use Tasks3Web, :router

  alias Tasks3Web.Plugs

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
    plug Plugs.FetchSession
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :ajax do
    plug :accepts, ["json"]
    plug :fetch_session
    plug :fetch_flash
    plug Plugs.FetchSession
  end

  scope "/ajax", Tasks3Web do
    pipe_through :ajax  
  end

  scope "/", Tasks3Web do
    pipe_through :browser

    get "/", PageController, :index
  end

  scope "/api/v1", Tasks3Web do
    pipe_through :api

    resources "/users", UserController, except: [:new, :edit]
    resources "/tasks", TaskController, except: [:new, :edit]
    resources "/sessions", SessionController, only: [:create, :delete], singleton: true
  end

  # Other scopes may use custom stacks.
  # scope "/api", Tasks3Web do
  #   pipe_through :api
  # end
end
