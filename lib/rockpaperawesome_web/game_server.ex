defmodule Rockpaperawesome.GameServer do
  @moduledoc """
  Starts, stops and stores games
  """
  use GenServer

  alias Rockpaperawesome.Game

  def start_link do
    GenServer.start_link(__MODULE__, :ok, name: __MODULE__)
  end

  def init(:ok) do
    {:ok, %{games: Map.new()}}
  end

  def start_game(players) do
    GenServer.call(__MODULE__, {:start_game, players})
  end

  def find_game_id(player_id) do
    GenServer.call(__MODULE__, {:find_game_id, player_id})
  end

  def get_game(game_id) do
    GenServer.call(__MODULE__, {:get_game, game_id})
  end

  def update_game(game, game_id) do
    GenServer.call(__MODULE__, {:update_game, game, game_id})
  end

  def handle_call({:start_game, [p1, p2]}, _from, state) do
    game = Game.create(p1, p2)
    new_games = Map.put(state.games, game.id, game)
    new_state =
      state
      |> Map.put(:games, new_games)
    {:reply, :ok, new_state}
  end

  def handle_call({:find_game_id, player_id}, _from, state) do
    game =
      Map.values(state.games)
      |> Enum.find(fn game -> Game.player_in?(player_id, game) end)

    case game do
      %{id: game_id} ->
        {:reply, {:ok, game_id}, state}
      _ ->
        {:reply, :ok, state}
    end
  end

  def handle_call({:get_game, game_id}, _from, state) do
    case Map.get(state.games, game_id) do
      nil ->
        {:reply, :ok, state}
      game ->
        {:reply, {:ok, game}, state}
    end
  end

  def handle_call({:update_game, game, game_id}, _from, state) do
    games = Map.put(state.games, game_id, game)
    new_state = Map.put(state, :games, games)
    {:reply, :ok, new_state}
  end
end
