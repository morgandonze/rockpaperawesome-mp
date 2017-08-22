defmodule Rockpaperawesome.GameChannel do
  use RockpaperawesomeWeb, :channel
  alias Rockpaperawesome.Presence

  def join("game:queue", %{user_id: user_id}, socket) do
    send(self(), :after_join)
    {:ok, assign(socket, :user_id, user_id)}
  end

  def join("game:queue", _, socket) do
    send(self(), :after_join)
    {:ok, assign(socket, :user_id, 'user_id_need_to_generate')}
  end

  def handle_info(:after_join, socket) do
    push socket, "presence_state", Presence.list(socket)
    {:ok, _} = Presence.track(socket, socket.assigns.user_id, %{
          online_at: inspect(System.system_time(:seconds))
                              })
    {:noreply, socket}
  end
end
