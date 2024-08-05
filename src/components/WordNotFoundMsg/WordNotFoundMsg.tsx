import { useEffect, useState } from 'react'
import { WORD_NOT_FOUND_EVENT } from '../../consts.d'
import { useCooldown } from '../../hooks/useCooldown'
import './wordNotFoundMsg.css'

const animationTime = 1.3

export function WordNotFoundMsg() {
  const [display, setDisplay] = useState<'none' | 'block'>('none')
  const [animation, setAnimation] = useState('none')

  const [triggerAnimation] = useCooldown({
    action: () => {
      setAnimation(`wnf-slide-in ${animationTime}s ease both`)
      setDisplay('block')
    },
    reset: () => {
      setAnimation('none')
      setDisplay('none')
    },
    cooldown: animationTime * 1000
  })

  useEffect(() => {
    const handleWordNotFound = () => {
      triggerAnimation()
    }
    document.addEventListener(WORD_NOT_FOUND_EVENT, handleWordNotFound)
    return () => document.removeEventListener(WORD_NOT_FOUND_EVENT, handleWordNotFound)
  }, [])

  return (
    <span className='word-not-found' style={{ animation, display }}>
      Palabra no encontrada
    </span>
  )
}
