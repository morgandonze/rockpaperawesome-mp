defmodule Rockpaperawesome.GameTest do
  use ExUnit.Case
  alias Rockpaperawesome.Game

  @rock     0
  @paper    1
  @scissors 2
  @mode     3

  @p1 'abcde'
  @p2 'fghij'

  test "create" do
    keys = MapSet.new([:id, :players, :turns, :scores, :mode])
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
      |> Game.make_move(@p1, @rock)

    assert game.turns == [%{p1: @rock}]
  end

  test "make_move in new game for player 2" do
    game =
      Game.create(@p1, @p2)
      |> Game.make_move(@p2, @rock)

    assert game.turns == [%{p2: @rock}]
  end

  test "make_move for p1 in new game after p2 has moved" do
    game =
      Game.create(@p1, @p2)
      |> Game.make_move(@p1, @paper)
      |> Game.make_move(@p2, @rock)

    assert game.turns == [%{p1: @paper, p2: @rock}]
  end

  test "make_move after first turn of the game" do
    game =
      Game.create(@p1, @p2)
      |> Game.make_move(@p1, @paper)
      |> Game.make_move(@p2, @rock)
      |> Game.make_move(@p1, @rock)

    assert game.turns == [%{p1: @rock}, %{p1: @paper, p2: @rock}]
  end

  test "result_parity" do
    assert Game.result_parity(@rock,    @rock) == 0
    assert Game.result_parity(@rock,   @paper) == 2
    assert Game.result_parity(@rock,@scissors) == 1

    assert Game.result_parity(@paper,    @rock) == 1
    assert Game.result_parity(@paper,   @paper) == 0
    assert Game.result_parity(@paper,@scissors) == 2

    assert Game.result_parity(@scissors,    @rock) == 2
    assert Game.result_parity(@scissors,   @paper) == 1
    assert Game.result_parity(@scissors,@scissors) == 0
  end
end
