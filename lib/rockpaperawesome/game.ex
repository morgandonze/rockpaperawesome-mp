defmodule Rockpaperawesome.Game do
  defmodule Turn do
    def create() do
      [nil, nil]
    end

    def complete?(turn) do
      Enum.all?(
        turn,
        fn x -> !is_nil(x) end
      )
    end

    def move(turn, player, move) do
      List.replace_at(turn, player - 1, move)
    end

    def p1(turn) do
      Enum.at turn, 0
    end

    def p2(turn) do
      Enum.at turn, 1
    end
  end

  alias Rockpaperawesome.Game
  alias Rockpaperawesome.Game.Turn

  @default_mode 3
  @moves ["rock", "paper", "scissocs"]

  def create(p1, p2, mode \\ @default_mode) do
    %{
      id: Ecto.UUID.generate,
      players: [p1, p2],
      mode: mode,
      turns: [],
      scores: [0, 0],
    }
  end

  def player_number(game, player_id) do
    case Enum.find_index(game.players, &(&1 == player_id)) do
      nil -> nil
      i -> i + 1
    end
  end

  def player_in?(player_id, game) do
    Enum.member?(game.players, player_id)
  end

  def make_move(game, player_id, move) when is_bitstring(move) do
    int_move =
      @moves
      |> Enum.find_index(fn(m) -> m == move end)
      |> (fn(i) -> i + 1 end).()
    
    make_move(game, player_id, int_move)
  end
  def make_move(game, player_id, move) do
    {turn, prev_turns} = split_current_turn(game)
    new_turn =
      Turn.move(
        turn,
        Game.player_number(game, player_id),
        move)
    Map.put(game, :turns, [new_turn] ++ prev_turns)
  end

  def update_score(%{turns: [turn|_]}=game) do
    update_score(game, turn, Turn.complete?(turn))
  end
  def update_score(%{scores: scores}=game, turn, turn_complete) when turn_complete do
    result = result_parity(Turn.p1(turn), Turn.p2(turn), game.mode)
    new_scores = [
      Enum.at(scores,0) + score_diff_for_player(result, 1),
      Enum.at(scores,1) + score_diff_for_player(result, 2)
    ]
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
