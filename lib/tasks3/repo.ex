defmodule Tasks3.Repo do
  use Ecto.Repo,
    otp_app: :tasks3,
    adapter: Ecto.Adapters.Postgres
end
