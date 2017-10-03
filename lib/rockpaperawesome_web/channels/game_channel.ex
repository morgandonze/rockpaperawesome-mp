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
      user_name: socket.assigns.user_name,
      online_at: inspect(System.system_time(:seconds)),
    })

    # with {:ok, {[p1, p2], game_id}} <- MatchMaker.queue_player(socket.assigns.user_id) do
    #   # Presence.update(socket, p1, fn meta -> Map.put(meta, :game_id, game_id) end)
    #   # TODO send a message to the two players who have just been added to a game
    # end

    {:noreply, socket}
  end

  # Handles moves made by players (e.g. rock, paper, or scissors)
  def handle_in("throw", hand, socket) do
    # user_id = socket.assigns.user_id
    Presence.list(socket) |> IO.inspect
    {:noreply, socket}
  end
end
