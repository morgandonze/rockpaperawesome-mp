defmodule Rockpaperawesome.InvitationServer do
  use GenServer
  alias Rockpaperawesome.Invitation

  def start_link do
    GenServer.start_link(__MODULE__, :ok, name: __MODULE__)
  end

  def init(:ok) do
    {:ok, %{invitations: []}}
  end

  def create_invitation(player_id) do
    GenServer.call(__MODULE__, {:create_invitation, player_id})
  end

  def handle_call({:create_invitation, player_id}, _from, state) do
    invite = Invitation.create(player_id)
    invitations = state.invitations ++ [invite]
    new_state = %{invitations: invitations}
    {:reply, {:ok, invite.token}, new_state}
  end
end