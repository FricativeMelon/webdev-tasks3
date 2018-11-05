defmodule Tasks3.Repo.Migrations.CreateTasks do
  use Ecto.Migration

  def change do
    create table(:tasks) do
      add :title, :string, null: false
      add :desc, :text, null: false
      add :completed, :boolean, default: false, null: false
      add :time_worked, :integer, null: false
      add :assigned_user, references(:users, on_delete: :nothing)

      timestamps()
    end

    create index(:tasks, [:assigned_user])
  end
end
