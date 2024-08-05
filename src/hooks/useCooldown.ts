import { useEffect, useRef, useState } from 'react'

interface Params {
  action: () => void
  reset?: () => void
  cooldown: number
}
type ReturnType = [() => void, boolean]

export function useCooldown({ action, reset, cooldown }: Params) {
  const [waiting, setWaiting] = useState(false)
  const timeout = useRef<number>()

  useEffect(() => () => clearTimeout(timeout.current), [])

  const triggerAction = () => {
    if (timeout.current) return

    action()
    setWaiting(true)

    timeout.current = setTimeout(() => {
      if (reset) reset()
      clearTimeout(timeout.current)
      timeout.current = undefined
      setWaiting(false)
    }, cooldown)
  }

  return [triggerAction, waiting] as ReturnType
}
