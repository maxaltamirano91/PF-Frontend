import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllProjects } from '../../redux/actions'
import Cards from '../../components/cards/Cards'
import styles from './LandingPage.module.css'

const LandingPage = () => {
  const dispatch = useDispatch()
  const { allProjects } = useSelector((state) => state.projects)
  const [renderingCards, setRenderingCards] = useState(5)
  const [displayPagination, setDisplayPagination] = useState(true)
  const projectsSectionRef = useRef(null)

  const handlePagination = () => {
    if (allProjects.length >= renderingCards) {
      setRenderingCards((prevCount) => prevCount + 5)
    } else {
      setDisplayPagination(false)
    }
  }

  const handleScroll = () => {
    const { current } = projectsSectionRef
    if (current && window.innerHeight + window.scrollY >= current.offsetTop + current.clientHeight) {
      handlePagination()
    }
  }

  useEffect(() => {
    dispatch(getAllProjects(renderingCards))
  }, [dispatch, renderingCards])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  const handleScrollToProjects = () => {
    if (projectsSectionRef.current) {
      projectsSectionRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div>
      <div className={styles['hero-section']}>
        <img
          src="https://i.ibb.co/z2Pg2h5/modern-gradient-background-picjumbo-com.jpg"
          alt="Hero"
          className={styles['hero-image']}
        />
        <div className={styles['hero-text']}>
          <h1>{"The World's best Devs"}</h1>
          <h1>are on ForDevs</h1>
          <button className="btn btn-primary" onClick={handleScrollToProjects}>
            Descubre más
          </button>
        </div>
      </div>

      <div className={styles['middle-section']}>
        <img
          src="https://i.ibb.co/jvfSdrk/beautiful-colorful-abstract-lines-on-black-background-picjumbo-com-1.jpg"
          alt="Middle"
          className={styles['middle-image']}
        />
        <div className={styles['middle-text']}>
          <h1>Descubre más proyectos</h1>
		  <h3>Encuentra el recurso perfecto para tu próximo proyecto</h3>
        </div>
      </div>

      <div ref={projectsSectionRef} className={styles['projects-section']}>
        <Cards projects={allProjects} />
        {displayPagination && (
          <div className={styles['pagination-container']}>
            <button className="btn btn-primary" onClick={handlePagination}>
              Cargar más proyectos
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default LandingPage
