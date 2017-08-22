defmodule Rockpaperawesome.GameChannel do
  use RockpaperawesomeWeb, :channel
  alias Rockpaperawesome.Presence

  def join("game:queue", _, socket) do
    send self(), :after_join
    # send self(), :game_found
    {:ok, socket}
  end

  def handle_info(:after_join, socket) do
    Presence.track(socket, socket.assigns.user, %{
      online_at: :os.system_time(:milli_seconds)
    })
    push socket, "presence_state", Presence.list(socket)
    {:noreply, socket}
  end

  def handle_info(:game_found, socket) do
    # Create a fake game id and give it to the user
    # In the future, the process of matchmaking will happen
    # in an async process.
    game_id = 72

    Presence.update(socket, "presence_state", socket.assigns.user, %{
      game_id: game_id
    })
    push socket, "presence_state", Presence.list(socket)
    {:noreply, socket}
  end
end
