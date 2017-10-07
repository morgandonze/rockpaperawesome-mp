defmodule Rockpaperawesome.GameChannel do
  use RockpaperawesomeWeb, :channel
  alias Rockpaperawesome.{Presence, GameServer, Game}

  def join("game:" <> game_id, _, socket) do
    send(self(), {:after_join, game_id})
    {:ok, socket}
  end

  def handle_info({:after_join, game_id}, socket) do
    {:ok, _} = Presence.track(socket, socket.assigns.user_id, %{
      user_name: socket.assigns.user_name,
      online_at: inspect(System.system_time(:seconds)),
      game_id: game_id,
    })

    push(socket, "presence_state", Presence.list(socket))

    {:noreply, socket}
  end

  def handle_in("throw", move, socket) do
    user_id = socket.assigns.user_id
    game_id = get_game_id_from_presence(user_id, socket)

    with {:ok, game} <- GameServer.get_game(game_id),
         game <- Game.make_move(game, user_id, move),
         game <- Game.update_score(game) do

      user_id
      |> Game.player_num(game)
      |> track_player_number(socket)

      GameServer.update_game(game, game_id)
      broadcast(socket, "throw_complete", game)
    end

    {:noreply, socket}
  end

  def get_game_id_from_presence(user_id, socket) do
    %{^user_id => %{metas: metas}} = Presence.list(socket)
    [%{game_id: game_id} | _] = metas
    game_id
  end

  def track_player_number(n, socket) do
    Presence.update(socket, socket.assigns.user_id, %{
      player_number: n
    })
    Presence.list(socket) |> IO.inspect
  end
end
