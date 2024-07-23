import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllProjects } from '../../redux/actions'
import Cards from '../../components/cards/Cards'

const HomePage = () => {
    const dispatch = useDispatch()
    const { allProjects } = useSelector((state) => state.projects)
    const [renderingCards, setRenderingCards] = useState(10)

    const handleScroll = () => {
        const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight
        if (bottom) {
            setRenderingCards((prevCount) => prevCount + 5)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        dispatch(getAllProjects(renderingCards))
    }, [dispatch, renderingCards])

    return (
        <div>
            <Cards projects={allProjects} />
        </div>
    )
}

export default HomePage
