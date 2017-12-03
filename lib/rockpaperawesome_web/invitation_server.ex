defmodule Rockpaperawesome.InvitationServer do
  use GenServer
  alias Rockpaperawesome.{Invitation, GameServer}

  def start_link do
    GenServer.start_link(__MODULE__, :ok, name: __MODULE__)
  end

  def init(:ok) do
    {:ok, %{invitations: Map.new()}}
  end

  def create_invitation(player_id) do
    GenServer.call(__MODULE__, {:create_invitation, player_id})
  end

  def handle_call({:create_invitation, player_id}, _from, state) do
    invite = Invitation.create(player_id)
    invitations = Map.put(state.invitations, invite.token, invite)
    new_state = %{invitations: invitations}
    {:reply, {:ok, invite.token}, new_state}
  end

  def accept_invite(token, player_id) do
    GenServer.call(__MODULE__, {:accept_invite, token, player_id})
  end

  def handle_call({:accept_invite, token, player_id}, from, state) do
    case find_invite(token, state) do
      {:ok, invite} ->
        new_invite = Map.put(invite, :accepting_player, player_id)
        new_state = Map.put(state, invite.token, new_invite)
        {:ok, game_id} = GameServer.start_game(Invitation.players(invite))
        {:reply, {:ok, player_id, game_id}, new_state}
      _other ->
        {:reply, :ok, state}
    end
  end

  def find_invite(token, state) do
    case get_in(state, [:invitations, token]) do
      nil -> {:error, :not_found}
      invite -> {:ok, invite}
    end
  end
end