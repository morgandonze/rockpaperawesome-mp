defmodule Rockpaperawesome.Invitation do
  def create(player_id) do
    %{
      token: Ecto.UUID.generate,
      inviting_player: player_id
    }
  end
end