defmodule Rockpaperawesome.GameTest do
  use ExUnit.Case
  alias Rockpaperawesome.Game

  @rock     0
  @paper    1
  @scissors 2
  # @mode     3

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

    assert game.turns == [[@rock, nil]]
  end

  test "make_move in new game for player 2" do
    game =
      Game.create(@p1, @p2)
      |> Game.make_move(@p2, @rock)

    assert game.turns == [[nil,@rock]]
  end

  test "make_move for p1 in new game after p2 has moved" do
    game =
      Game.create(@p1, @p2)
      |> Game.make_move(@p1, @paper)
      |> Game.make_move(@p2, @rock)

    assert game.turns == [[@paper, @rock]]
  end

  test "make_move after first turn of the game" do
    game =
      Game.create(@p1, @p2)
      |> Game.make_move(@p1, @paper)
      |> Game.make_move(@p2, @rock)
      |> Game.make_move(@p1, @rock)

    assert game.turns == [[@rock, nil], [@paper, @rock]]
  end

  test "update_score p1 win" do
    scores =
      Game.create(@p1, @p2)
      |> Game.make_move(@p1, @paper)
      |> Game.make_move(@p2, @rock)
      |> fn game -> Game.update_score(game).scores end.()
    assert scores == [1, 0]
  end

  test "update_score p2 win" do
    scores =
      Game.create(@p1, @p2)
      |> Game.make_move(@p1, @paper)
      |> Game.make_move(@p2, @scissors)
      |> fn game -> Game.update_score(game).scores end.()
    assert scores == [0, 1]
  end

  test "update_score tie" do
    scores =
      Game.create(@p1, @p2)
      |> Game.make_move(@p1, @paper)
      |> Game.make_move(@p2, @paper)
      |> fn game -> Game.update_score(game).scores end.()
    assert scores == [0,0]
  end

  test "update_score previous score" do
    scores =
      Game.create(@p1, @p2)
      |> Map.put(:scores, [3, 7])
      |> Game.make_move(@p1, @scissors)
      |> Game.make_move(@p2, @paper)
      |> fn game -> Game.update_score(game).scores end.()
    assert scores == [4, 7]
  end
end
