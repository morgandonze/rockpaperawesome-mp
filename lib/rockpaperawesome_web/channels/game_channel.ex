defmodule Rockpaperawesome.GameChannel do
  use RockpaperawesomeWeb, :channel
  alias Rockpaperawesome.{Presence, MatchMaker, GameServer}

  def join("game:queue", _, socket) do
    send(self(), :after_join)
    {:ok, socket}
  end

  def handle_info(:after_join, socket) do
    {:ok, _} = Presence.track(socket, socket.assigns.user_id, %{
      user_name: socket.assigns.user_name,
      online_at: inspect(System.system_time(:seconds)),
    })

    MatchMaker.queue_player(socket.assigns.user_id)

    {:noreply, socket}
  end

  def handle_in("check_for_game", _, %{assigns: %{user_id: user_id}} = socket) do
    with {:ok, game_id} <- GameServer.find_game_id(user_id) do
      game_id_inputter = fn meta -> Map.put(meta, :game_id, game_id) end
      Presence.update(socket, user_id, game_id_inputter)
    end

    {:noreply, socket}
  end

  # Handles moves made by players (e.g. rock, paper, or scissors)
  def handle_in("throw", hand, socket) do
    {:noreply, socket}
  end
end
