import { React } from 'react'
import '../index.css'

function Header () {
  return (
        <nav className="navbar navbar-expand-lg navbar-light">
        <a className="navbar-brand navbar-hed" href="https://vivrao9.github.io" target='_blank' rel='noreferrer'>Vivek Rao</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ml-auto">
            <a className="nav-item nav-link navbar-text" href="https://vivrao9.github.io#portfolio" target='_blank' rel='noreferrer'>Work</a>
            <a className="nav-item nav-link navbar-text" href="https://vivrao9.github.io/resume.html" target='_blank' rel='noreferrer'>Resume</a>
          </div>
        </div>
      </nav>
  )
}

export default Header
