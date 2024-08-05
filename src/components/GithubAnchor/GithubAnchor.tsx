import { REPOSITORY_URL } from '../../consts.d'
import { GithubIcon } from '../icons'
import './githubAnchor.css'

export function GithubAnchor() {
  return (
    <a href={REPOSITORY_URL} className='github-anchor' target='_blank'>
      <GithubIcon />
    </a>
  )
}
