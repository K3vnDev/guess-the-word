export type Board = Array<Array<string>>

export type ClassNames = Array<null | {
  letter: string
  class: string
}>

export type CellClassNames = string[] | null[]

export type Winner = null | boolean
