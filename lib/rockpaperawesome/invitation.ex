defmodule Rockpaperawesome.Invitation do
  def create(player_id) do
    %{
      token: Ecto.UUID.generate,
      inviting_player: player_id,
      accepting_player: nil
    }
  end

  def players(invite) do
    [ invite.inviting_player,
      invite.accepting_player
    ]
  end
end