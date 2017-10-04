defmodule Rockpaperawesome.GameChannel do
  use RockpaperawesomeWeb, :channel
  alias Rockpaperawesome.{Presence, MatchMaker, GameServer}

  def join("game:" <> game_id, _, socket) do
    send(self(), {:after_join, game_id})
    {:ok, socket}
  end

  def handle_info({:after_join, game_id}, socket) do
    {:ok, game} = GameServer.get_game(game_id)

    {:ok, _} = Presence.track(socket, socket.assigns.user_id, %{
      user_name: socket.assigns.user_name,
      online_at: inspect(System.system_time(:seconds)),
      game: game
    })

    {:noreply, socket}
  end

  # Handles moves made by players (e.g. rock, paper, or scissors)
  def handle_in("throw", hand, socket) do
    {:noreply, socket}
  end
end
