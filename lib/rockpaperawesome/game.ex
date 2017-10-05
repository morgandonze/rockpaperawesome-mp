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

  def create(p1, p2, mode \\ @default_mode) do
    %{
      id: Ecto.UUID.generate,
      players: %{p1: p1, p2: p2},
      mode: mode,
      turns: [],
      scores: %{p1: 0, p2: 0},
    }
  end

  def player_in?(player_id, game) do
    players = game.players
    players.p1 == player_id || players.p2 == player_id
  end

  def make_move(game, player_id, move) when is_bitstring(move) do
    make_move(game, player_id, String.to_integer(move))
  end
  def make_move(game, player_id, move) do
    players = game.players

    {turn, prev_turns} = split_current_turn(game)
    new_turn = make_move(turn, player_id, players.p1, players.p2, move)

    Map.put(game, :turns, [new_turn] ++ prev_turns)
  end
  def make_move(turn, player_id, player_id, _, move) do
    Turn.p1_move(move, turn)
  end
  def make_move(turn, player_id, _, player_id, move) do
    Turn.p2_move(move, turn)
  end

  def update_score(%{turns: [turn|_]}=game) do
    update_score(game, turn, Turn.complete?(turn))
  end
  def update_score(%{scores: scores}=game, turn, turn_complete) when turn_complete do
    result = result_parity(turn.p1, turn.p2, game.mode)
    new_scores = %{
      p1: scores.p1 + score_diff_for_player(result, 1),
      p2: scores.p2 + score_diff_for_player(result, 2)
    }
    Map.put(game, :scores, new_scores)
  end
  def update_score(game, _, _) do
    game
  end

  defp result_parity(p1_move, p2_move, mode) do
    Integer.mod((p1_move - p2_move + mode), mode)
  end

  defp score_diff_for_player(result, player) when result == player do
    1
  end
  defp score_diff_for_player(_result, _player) do
    0
  end

  defp split_current_turn(%{turns: []}) do
    {Turn.create, []}
  end
  defp split_current_turn(game) do
    [turn | prev_turns] = game.turns
    if Turn.complete?(turn) do
        {Turn.create, game.turns}
      else
        {turn, prev_turns}
    end
  end
end
