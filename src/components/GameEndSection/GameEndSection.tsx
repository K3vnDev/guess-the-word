import { useGameEndSection } from '../../hooks/useGameEndSection'
import { useStore } from '../../store/useStore'
import { RestartIcon } from '../icons'
import './gameEndSection.css'

export function GameEndSection() {
  const { text, winner, resetState } = useGameEndSection()
  const resetGame = useStore(s => s.resetGame)

  const handleClick = () => {
    resetState()
    resetGame()
  }

  return winner !== null ? (
    <section className='game-end-section'>
      <h3>{text.message}</h3>
      <button onClick={handleClick}>
        <RestartIcon m={text.button} />
      </button>
    </section>
  ) : (
    <></>
  )
}
