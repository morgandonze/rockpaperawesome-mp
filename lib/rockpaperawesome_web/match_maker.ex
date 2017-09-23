defmodule Rockpaperawesome.MatchMaker do
  use GenServer

  def start_link do
    GenServer.start_link(__MODULE__, :ok, name: __MODULE__)
  end

  def init(:ok) do
    {:ok, %{}}
  end

  def check do
    GenServer.call(__MODULE__, {:check, ''})
  end

  # def check do
  #   GenServer.call(__MODULE__, {:check})
  # end

  def handle_call(_, _from, state) do
    {:reply, :ok, %{}}
  end
end
