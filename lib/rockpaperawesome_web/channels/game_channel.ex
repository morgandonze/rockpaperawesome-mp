defmodule Rockpaperawesome.GameChannel do
  use RockpaperawesomeWeb, :channel
  alias Rockpaperawesome.{Presence, MatchMaker, GameServer}

  def join("game:*", _, socket) do
    send(self(), :after_join)
    {:ok, socket}
  end

  def handle_info(:after_join, socket) do
    {:noreply, socket}
  end

  # Handles moves made by players (e.g. rock, paper, or scissors)
  def handle_in("throw", hand, socket) do
    {:noreply, socket}
  end
end
