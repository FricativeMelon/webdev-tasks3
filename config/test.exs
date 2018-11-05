use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :tasks3, Tasks3Web.Endpoint,
  http: [port: 4001],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

# Configure your database
config :tasks3, Tasks3.Repo,
  username: "tasks3",
  password: "theeloh8eiZ5",
  database: "tasks3_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox
