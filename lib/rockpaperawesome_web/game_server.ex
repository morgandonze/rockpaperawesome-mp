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

  def handle_call({:start_game, players}, _from, state) do
    game = Game.create(players)
    %{id: game_id} = game

    games = state.games
    new_state =
      state
      |> Map.put(:games, games ++ [game])
    {:reply, :ok, new_state}
    # {:reply, {:ok, {players, game_id}}, new_state}
  end

  # TODO create another call handler that will allow GameChannel to check whether a given user
  # has been put into a game.
end
