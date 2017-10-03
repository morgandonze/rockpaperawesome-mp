defmodule Rockpaperawesome.Game do
  def create([p1, p2]) do
    %{
      id: Ecto.UUID.generate,
      p1: p1,
      p2: p2,
      moves: [],
      scores: {0, 0},
    }
  end
end
