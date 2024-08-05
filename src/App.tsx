import { GameBoard } from './components/GameBoard/GameBoard'
import { GameEndSection } from './components/GameEndSection/GameEndSection'
import { GithubAnchor } from './components/GithubAnchor/GithubAnchor'
import { WordNotFoundMsg } from './components/WordNotFoundMsg/WordNotFoundMsg'

function App() {
  return (
    <>
      <h1>ADIVINA LA PALABRA</h1>
      <GameBoard />
      <GameEndSection />
      <WordNotFoundMsg />
      <GithubAnchor />
    </>
  )
}

export default App
