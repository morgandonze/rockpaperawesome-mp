defmodule Rockpaperawesome.InviteChannel do
  use RockpaperawesomeWeb, :channel
  alias Rockpaperawesome.{Presence, GameServer, InvitationServer}

  def join("invite", _, socket) do
    send(self(), :after_join)
    {:ok, set_invitation_token(socket)}
  end

  def handle_info(:after_join, socket) do
    {:ok, _} = Presence.track(socket, socket.assigns.user_id, %{
      user_name: socket.assigns.user_name,
      online_at: inspect(System.system_time(:seconds)),
    })
    push(socket, "invite_created", %{invite_token: socket.assigns.invite_token})

    {:noreply, socket}
  end

  defp set_invitation_token(socket) do
    {:ok, token} =
      InvitationServer.create_invitation(socket.assigns.user_id)
    assign(socket, :invite_token, token)
  end
end