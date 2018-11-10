defmodule Tasks3.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset


  schema "tasks" do
    field :completed, :boolean, default: false
    field :desc, :string
    field :time_worked, :integer
    field :title, :string
    field :assigned_user, :id

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:title, :desc, :completed, :time_worked, :assigned_user])
    |> validate_required([:title, :desc, :completed, :time_worked, :assigned_user])
  end
end
