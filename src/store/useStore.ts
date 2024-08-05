import { create } from 'zustand'
import { INITIAL_BOARD, LETTERS, NUMBER_OF_ROWS, WORDS } from '../consts.d'
import { dispatchWordNotFound } from '../services/dispatchWordNotFound'
import { getRandomWord } from '../services/getRandomWord'
import type { Board, ClassNames, Winner } from '../types.d'

interface Store {
  word: string

  board: Board

  currentRowIndex: number
  goToNextRow: () => void

  currentCellIndex: number
  setCurrentCellIndex: (newValue: number) => void

  setCurrentCellContent: (newValue: string) => void
  removeCurrentCellContent: () => void

  moveCellIndexRight: () => void
  moveCellIndexLeft: () => void

  boardClassNames: string[][] | null
  generateBoardClassNames: () => void

  resetGame: () => void

  winner: Winner
  setWinner: (newValue: Winner) => void
}

export const useStore = create<Store>()(set => ({
  word: getRandomWord(),

  board: INITIAL_BOARD,

  boardClassNames: null,
  generateBoardClassNames: () =>
    set(({ word, board, boardClassNames, currentRowIndex }) => {
      const generateRowClassNames = (): string[] => {
        const classNames: ClassNames = Array(5).fill(null)
        const rowContent = board[currentRowIndex]

        for (let i = 0; i < 5; i++) {
          const lowerCasedCellLetter = rowContent[i].toLowerCase()
          if (word.charAt(i) === lowerCasedCellLetter) {
            classNames[i] = { letter: lowerCasedCellLetter, class: 'green' }
          }
        }
        for (let i = 0; i < 5; i++) {
          const lowerCasedCellLetter = rowContent[i].toLowerCase()
          if (word.charAt(i) !== lowerCasedCellLetter && word.includes(lowerCasedCellLetter)) {
            let letterOnWordCount = 0
            let letterOnArrayCount = 0

            for (let j = 0; j < 5; j++) {
              if (word.charAt(j) === lowerCasedCellLetter) letterOnWordCount++
              if (classNames[j]?.letter === lowerCasedCellLetter) letterOnArrayCount++
            }
            if (letterOnWordCount > letterOnArrayCount) {
              classNames[i] = { letter: lowerCasedCellLetter, class: 'yellow' }
            }
          }
        }
        return classNames.map(c => c?.class ?? 'gray')
      }

      const newBoardClassNames = boardClassNames ? [...boardClassNames] : []
      newBoardClassNames.push(generateRowClassNames())
      return { boardClassNames: newBoardClassNames }
    }),

  currentRowIndex: 0,
  goToNextRow: () =>
    set(
      ({
        currentRowIndex,
        currentCellIndex,
        setCurrentCellIndex,
        generateBoardClassNames,
        board
      }) => {
        let currentRowWord = ''
        for (const cellContent of board[currentRowIndex]) {
          currentRowWord += cellContent.toLowerCase()
        }
        if (!WORDS.includes(currentRowWord)) {
          if (currentCellIndex !== -1) dispatchWordNotFound(currentRowIndex)
          return {}
        }
        generateBoardClassNames()

        if (currentRowIndex < NUMBER_OF_ROWS - 1) {
          setCurrentCellIndex(0)
          return { currentRowIndex: currentRowIndex + 1 }
        }
        setCurrentCellIndex(-1)
        return {}
      }
    ),

  currentCellIndex: 0,
  setCurrentCellIndex: newValue =>
    set(({ currentCellIndex }) => {
      return currentCellIndex !== -1 ? { currentCellIndex: newValue } : {}
    }),

  setCurrentCellContent: newValue =>
    set(({ board, currentRowIndex, currentCellIndex, moveCellIndexRight, winner, resetGame }) => {
      const newBoard = [...board]
      const newRow = [...board[currentRowIndex]]

      if (winner !== null) {
        if (newValue.toUpperCase() === 'R') resetGame()
        return {}
      }

      if (!LETTERS.includes(newValue.toLowerCase())) return {}

      const upperCasedValue = newValue.toUpperCase()
      newRow.splice(currentCellIndex, 1, upperCasedValue)
      newBoard.splice(currentRowIndex, 1, newRow)

      moveCellIndexRight()

      return { board: newBoard }
    }),

  removeCurrentCellContent: () =>
    set(({ board, currentRowIndex, currentCellIndex, moveCellIndexLeft }) => {
      const newBoard = [...board]
      const newRow = [...board[currentRowIndex]]

      if (currentCellIndex === -1) return {}

      const deleteElement = (cellIndex: number) => {
        newRow.splice(cellIndex, 1, '')
        newBoard.splice(currentRowIndex, 1, newRow)
      }

      const elementToRemove = newBoard[currentRowIndex][currentCellIndex]

      if (elementToRemove) {
        deleteElement(currentCellIndex)
        return { board: newBoard }
      }
      if (currentCellIndex > 0) {
        deleteElement(currentCellIndex - 1)
        moveCellIndexLeft()
      }
      return { board: newBoard }
    }),

  moveCellIndexRight: () =>
    set(({ currentCellIndex }) => {
      return currentCellIndex < 4 && currentCellIndex !== -1
        ? { currentCellIndex: currentCellIndex + 1 }
        : {}
    }),
  moveCellIndexLeft: () =>
    set(({ currentCellIndex }) => {
      return currentCellIndex > 0 ? { currentCellIndex: currentCellIndex - 1 } : {}
    }),

  resetGame: () =>
    set(() => {
      return {
        board: INITIAL_BOARD,
        currentRowIndex: 0,
        currentCellIndex: 0,
        boardClassNames: null,
        word: getRandomWord(),
        winner: null
      }
    }),

  winner: null,
  setWinner: newValue => set(() => ({ winner: newValue }))
}))
