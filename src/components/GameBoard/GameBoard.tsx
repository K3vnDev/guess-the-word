import './gameBoard.css'
import { useBoard } from '../../hooks/useBoard'
import { useStore } from '../../store/useStore'
import { Row } from '../Row/Row'

export function GameBoard() {
  const board = useStore(s => s.board)
  useBoard()

  return (
    <div className='game-board'>
      {board.map((row, index) => (
        <Row index={index} content={row} key={index} />
      ))}
    </div>
  )
}
