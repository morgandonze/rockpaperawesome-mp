defmodule Rockpaperawesome.Game do
  defmodule Turn do
    def create() do
      %{}
    end

    def complete?(turn) do
      Map.has_key?(turn, :p1) &&
        Map.has_key?(turn, :p2)
    end

    def p1_move(move, turn) do
      Map.put(turn, :p1, move)
    end

    def p2_move(move, turn) do
      Map.put(turn, :p2, move)
    end
  end

  alias Rockpaperawesome.Game.Turn

  @default_mode 3

  def create(p1, p2) do
    %{
      id: Ecto.UUID.generate,
      players: %{p1: p1, p2: p2},
      mode: 3,
      turns: [],
      scores: %{p1: 0, p2: 0},
    }
  end

  def player_in?(player_id, game) do
    players = game.players
    players.p1 == player_id || players.p2 == player_id
  end

  def make_move(game, player_id, move) do
    players = game.players

    {turn, prev_turns} = split_current_turn(game)
    new_turn = make_move(turn, player_id, players.p1, players.p2, move)

    game
    |> Map.put(:turns, [new_turn] ++ prev_turns)
    |> update_score()
  end
  def make_move(turn, player_id, player_id, _, move) do
    Turn.p1_move(move, turn)
  end
  def make_move(turn, player_id, _, player_id, move) do
    Turn.p2_move(move, turn)
  end

  def update_score(game) do
    {turn,_} = split_current_turn(game)
    update_score(game, turn, Turn.complete?(turn))
  end
  def update_score(game, turn, turn_complete) when turn_complete do
    result_parity(turn.p1, turn.p2, game.mode)
  end
  def update_score(game, _, turn_complete) do
    game
  end

  def result_parity(p1_move, p2_move, mode \\ @default_mode) do
    Integer.mod((p1_move - p2_move + mode), mode)
  end

  def score_diff(result, player) do
    max(0, ((result*2 - 3) * (player*2 - 3)))
  end

  def split_current_turn(%{turns: []}) do
    {Turn.create, []}
  end
  def split_current_turn(game) do
    [turn | prev_turns] = game.turns
    if Turn.complete?(turn) do
        {Turn.create, game.turns}
      else
        {turn, prev_turns}
    end
  end
end
