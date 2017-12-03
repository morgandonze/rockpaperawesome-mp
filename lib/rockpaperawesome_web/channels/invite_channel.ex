defmodule Rockpaperawesome.InviteChannel do
  use RockpaperawesomeWeb, :channel
  alias Rockpaperawesome.{Presence, GameServer, InvitationServer}

  def join("invite", _, socket) do
    send(self(), :after_join)
    {:ok, set_invitation_token(socket)}
  end

  def join("invite:" <> token, params, socket) do
    {:ok, socket}
  end

  def handle_info(:after_join, socket) do
    {:ok, _} = Presence.track(socket, socket.assigns.user_id, %{
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

  def handle_in("accept_invite", %{"token" => token}, socket) do
    player_id = socket.assigns.user_id
    with {:ok, player_id, game_id} <- InvitationServer.accept_invite(token, player_id) do
      broadcast(socket, "game_started", %{game_id: game_id, user_id: player_id})
    end
    {:reply, :ok, socket}
  end
end