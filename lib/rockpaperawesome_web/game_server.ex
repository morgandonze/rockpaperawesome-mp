defmodule Rockpaperawesome.GameServer do
  use GenServer

  alias Rockpaperawesome.Game

  def start_link do
    GenServer.start_link(__MODULE__, :ok, name: __MODULE__)
  end

  def init(:ok) do
    {:ok, %{games: []}}
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

  def handle_call({:start_game, [p1, p2]}, _from, state) do
    game = Game.create(p1, p2)

    games = state.games
    new_state =
      state
      |> Map.put(:games, games ++ [game])
    {:reply, :ok, new_state}
  end

  def handle_call({:find_game_id, player_id}, _from, state) do
    matching_games =
      Enum.filter( state.games, &(game_filter(&1, player_id)) )

    case matching_games do
      [%{id: game_id}] ->
        {:reply, {:ok, game_id}, state}
      _ ->
        {:reply, :ok, state}
    end
  end

  def game_filter(game, player_id) do
    Game.player_in?(player_id, game)
  end

  def handle_call({:get_game, game_id}, _from, state) do
    games =
      Enum.filter( state.games, &(&1.id == game_id) )

    case games do
      [game] ->
        {:reply, {:ok, game}, state}
      _ ->
        {:reply, :ok, state}
    end
  end
end
