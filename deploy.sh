export MIX_ENV=prod
export PORT=4343
export NODEBIN=`pwd`/assets/node_modules/.bin
export PATH="$PATH:$NODEBIN"

mix deps.get --only prod

(cd assets && npm install)
(cd assets && webpack --mode production)
mix compile
mix phx.digest
mix ecto.migrate
echo "Generating release..."
mix release --env=prod

echo "Starting app..."

_build/prod/rel/tasks3/bin/tasks3 foreground
