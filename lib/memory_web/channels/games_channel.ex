defmodule MemoryWeb.GamesChannel do
  use MemoryWeb, :channel
  alias Memory.Game
  alias Memory.BackupAgent

  def join("games:" <> name, payload, socket) do
    if authorized?(payload) do
      game = BackupAgent.get(name) || Game.new()
      BackupAgent.put(name, game)
      socket = socket
      |> assign(:game, game)
      |> assign(:name, name)
      {:ok, %{"join" => name, "game"=> Game.client_view(game)}, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  def handle_in("flipFirst", %{"curID" => id, "curValue" => value}, socket) do
    name = socket.assigns[:name]
    game = Game.flipFirst(socket.assigns[:game], id, value)
    socket = assign(socket, :game, game)
    BackupAgent.put(name,game)
    {:reply, {:ok, %{ "game" => Game.client_view(game)}}, socket}
  end

  def handle_in("matched", %{"curID" => id}, socket) do
    name = socket.assigns[:name]
    game = Game.matched(socket.assigns[:game], id)
    socket = assign(socket, :game, game)
    BackupAgent.put(name,game)
    {:reply, {:ok, %{ "game" => Game.client_view(game)}}, socket}
  end

  def handle_in("notMached", %{"curID" => id1, "tempID" => id2}, socket) do
    name = socket.assigns[:name]
    game = Game.notMatched(socket.assigns[:game], id1, id2)
    socket = assign(socket, :game, game)
    BackupAgent.put(name,game)
    {:reply, {:ok, %{ "game" => Game.client_view(game)}}, socket}
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
