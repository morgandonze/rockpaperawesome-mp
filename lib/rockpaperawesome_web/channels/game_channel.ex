defmodule Rockpaperawesome.GameChannel do
  use RockpaperawesomeWeb, :channel
  alias Rockpaperawesome.{Presence, GameServer, Game}

  def join("game:" <> game_id, _, socket) do
    send(self(), {:after_join, game_id})
    {:ok, socket}
  end

  def handle_info({:after_join, game_id}, socket) do
    {:ok, _} = Presence.track(socket, socket.assigns.user_id, user_presence(socket, game_id))
    push(socket, "presence_state", Presence.list(socket))
    {:noreply, socket}
  end

  def handle_in("throw", move, socket) do
    user_id = socket.assigns.user_id
    game_id = game_id(socket, user_id)

    with {:ok, game} <- GameServer.get_game(game_id),
         game <- Game.make_move(game, user_id, move),
         game <- Game.update_score(game) do

      GameServer.update_game(game, game_id)
      broadcast_throw_complete(socket, game)
    end

    {:noreply, socket}
  end

  def broadcast_throw_complete(socket, %{turns: [turn|_]}=game) do
    yeah = Rockpaperawesome.Game.Turn.complete?(turn)
    IO.inspect yeah
    if yeah do
      broadcast(socket, "throw_complete", game)
    end
  end

  def game_id(socket, user_id) do
    Presence.list(socket)
    %{^user_id => %{metas: metas}} = Presence.list(socket)
    # Multiple metas happen when a user logs in from multiple clients
    # I'll just ignore metas other than the first
    [%{game_id: game_id} | _] = metas
    game_id
  end

  def user_presence(socket, game_id) do
    %{
      user_name: socket.assigns.user_name,
      player_number: player_number(game_id, socket),
      game_id: game_id
    }
  end

  def player_number(game_id, socket) do
    case GameServer.get_game(game_id) do
      {:ok, game} ->
        Game.player_number(game, socket.assigns.user_id)
      _ ->
        nil
     end
  end
end
