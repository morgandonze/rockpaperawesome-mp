defmodule Rockpaperawesome.GameChannel do
  use RockpaperawesomeWeb, :channel
  alias Rockpaperawesome.{Presence, MatchMaker}

  def join("game:queue", _, socket) do
    send(self(), :after_join)
    {:ok, socket}
  end

  def handle_info(:after_join, socket) do
    push socket, "presence_state", Presence.list(socket)
    {:ok, _} = Presence.track(socket, socket.assigns.user_id, %{
      online_at: inspect(System.system_time(:seconds)),
      # Assign user to a game
      # TODO: implement actual queueing in a child process
      game_id: "de1e7e"
    })

    MatchMaker.add_player_to_queue(socket.assigns.user_id)

    {:noreply, socket}
  end

  def handle_in("test", message, socket) do
    broadcast! socket, "test:receive", %{
      "test": message
    }
    {:noreply, socket}
  end
end
