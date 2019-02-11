defmodule Memory.Game do

  def new do
    states = %{
      gameBoard: [],
      tempValue: nil,
      tempID: nil,
      isChecking: false,
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
    }
  end

  # def guess(game, id) do
  #   gameBoard = game[:gameBoard]
  #   tile = Enum.at(gameBoard, id)
  #   v = tile[:value]
  #   if game[:tempValue] == nil do
  #     |> Map.put(:tempID, id)
  #     |> Map.put(:tempValue, v)
  #     |> setState(id, false, false)
  #   end
  # end

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

end
