defmodule Memory.Game do

  def new do
    states = %{
      gameBoard: [],
      tempValue: nil,
      tempID: nil,
      isChecking: false,
      scores: 0,
    }

    values = ["A","A","B","B","C","C","D","D","E","E","F","F","G","G","H","H"]
    values = Enum.shuffle(values)
    tile = Enum.map(values, fn(v) -> %{value: v, isHidden: true, hasMatch: false} end)
    Map.put(states, :gameBoard, tile)
  end

  def client_view(game) do
    %{
      gameBoard: game[:gameBoard],
      tempValue: game[:tempValue],
      tempID: game[:tempID],
      scores: game[:scores],
    }
  end

  def flipFirst(game, id, value) do
    game
    |> Map.put(:tempValue, value)
    |> Map.put(:tempID, id)
    |> setState(id, false, false)
  end

  def matched(game, id) do
    game
    |> Map.put(:tempID, nil)
    |> Map.put(:tempValue, nil)
    |> Map.put(:scores, game[:scores]+1)
    |> setState(id, false, true)
  end

  def notMatched(game, id1, id2) do
    game
    |> setState(id1, true, false)
    |> setState(id2, true, false)
    |> Map.put(:tempID, nil)
    |> Map.put(:tempValue, nil)
  end

  def setState(game, id, isH, hasM) do
    curTile = Enum.at(game[:gameBoard], id)
    v = curTile[:value]
    newBoard = List.replace_at(game[:gameBoard], id, %{value: v,
    isHidden: isH, hasMatch: hasM})
    Map.put(game, :gameBoard, newBoard)
  end

  def restart(game) do
    new()
  end

end
