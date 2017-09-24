defmodule Rockpaperawesome.MatchMaker do
  use GenServer

  def start_link do
    GenServer.start_link(__MODULE__, :ok, name: __MODULE__)
  end

  def init(:ok) do
    {:ok, %{queue: [], games: []}}
  end

  def check do
    GenServer.call(__MODULE__, {:check, ''})
  end

  def add_player_to_queue(player_id) do
    GenServer.call(__MODULE__, {:add_player, player_id})
    GenServer.call(__MODULE__, {:check_for_new_games})
  end

  def handle_call({:add_player, player_id}, _from, state) do
    if Enum.member?(state.queue, player_id) do
      IO.inspect state
      {:reply, :ok, state}
    else
      queue = state.queue ++ [player_id]
      new_state = Map.put(state, :queue, queue)
      IO.inspect new_state
      {:reply, :ok, new_state}
    end
  end

  def handle_call({:check_for_new_games}, _from, state) do
    if length(state.queue) > 1 do
      {two, rest} = Enum.split(state.queue, 2)
      games = state.games
      new_games = games ++ [two]
      new_state =
        state
        |> Map.put(:queue, rest)
        |> Map.put(:games, new_games)
      {:reply, :ok, new_state}
    else
      {:reply, :ok, state}
    end
  end
end
