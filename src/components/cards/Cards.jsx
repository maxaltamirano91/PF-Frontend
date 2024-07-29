import styles from './Cards.module.css'
import Card from '../card/Card'

const Cards = ({ projects, toggleLike }) => {
	return (
		<div className={styles.cards}>
			{projects?.length ? (
				projects.map((project) => (
					<div key={project.id} className={styles.card}>
						{project.user && <Card project={project} toggleLike={toggleLike} />}
					</div>
				))
			) : (
				<p>No se encontraron los proyectos</p>
			)}
		</div>
	)
}

export default Cards
