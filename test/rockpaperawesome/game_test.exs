defmodule Rockpaperawesome.GameTest do
  use ExUnit.Case
  alias Rockpaperawesome.Game

  @p1 'abcde'
  @p2 'fghij'

  test "create" do
    keys = MapSet.new([:id, :players, :turns, :scores])
    game_keys =
      Map.keys(Game.create(@p1, @p2))
      |> MapSet.new
    assert game_keys == keys
  end

  test "player_in?" do
    game =
      Game.create(@p1, @p2)

    assert Game.player_in?(@p1, game)
    assert Game.player_in?(@p2, game)
    refute Game.player_in?('zebra', game)
  end

  test "make_move in new game for player 1" do
    game =
      Game.create(@p1, @p2)
      |> Game.make_move(@p1, 'rock')

    assert game.turns == [%{p1: 'rock'}]
  end

  test "make_move in new game for player 2" do
    game =
      Game.create(@p1, @p2)
      |> Game.make_move(@p2, 'rock')

    assert game.turns == [%{p2: 'rock'}]
  end
end
