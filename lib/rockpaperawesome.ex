defmodule Rockpaperawesome do
  @moduledoc """
  Rockpaperawesome keeps the contexts that define your domain
  and business logic.

  Contexts are also responsible for managing your data, regardless
  if it comes from the database, an external API or others.
  """

  def start do
    import Supervisor.Spec

    children = [
      supervisor(Rockpaperawesome.Presence, [])
    ]

    opts = [strategy: :one_for_one, name: Rockpaperawesome.Supervisor]
    Supervisor.start_link(children, opts)
  end

end
