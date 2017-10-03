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

  def handle_call({:start_game, players}, _from, state) do
    game = Game.create(players)

    games = state.games
    new_state =
      state
      |> Map.put(:games, games ++ [game])
    {:reply, :ok, new_state}
  end

  def handle_call({:find_game_id, player_id}, _from, state) do
    filter_fn =
      fn game, player_id ->
        Game.player_in?(game, player_id)
      end

    case Enum.filter(state.games,
         fn game -> filter_fn.(game, player_id) end) do
      [] ->
        {:reply, :ok, state}
      [game] ->
        {:reply, {:ok, game}, state}
      x ->
        {:reply, :ok, state}
    end
  end

  # TODO create another call handler that will allow GameChannel to check whether a given user
  # has been put into a game.
end
