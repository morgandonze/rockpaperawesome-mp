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

  def handle_in("throw", move, socket) do
    player_id = socket.assigns.player_id

    game =
      player_id
      |> get_game_from_presence()
      |> Game.make_move(player_id, move, game)

    {:noreply, socket}
  end

  def get_game_from_presence(player_id) do
    %{^player_id => %{metas: metas}} = Presence.list(socket)
    [%{game: game} | _] = metas
    game
  end
end
