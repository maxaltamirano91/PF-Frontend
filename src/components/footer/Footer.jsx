import styles from './Footer.module.css'

const Footer = () => {
	const githubUsers = [
		{ name: 'Aldana Delgado', url: 'https://github.com/AldanaDelgado' },
		{ name: 'Gaston Ibarra', url: 'https://github.com/gastonibarra233' },
		{ name: 'Luis Diaz', url: 'https://github.com/LuisDiazR-Dev' },
		{ name: 'Max Altamirano', url: 'https://github.com/maxaltamirano91' },
		{ name: 'Miguel Linares', url: 'https://github.com/MiguelLinares01' },
		{ name: 'Maria Sol Iha', url: 'https://github.com/mikaiha888' },
		{ name: 'Ivan Bell', url: 'https://github.com/Navixvi' },
	]

	return (
		<footer className={styles.footer}>
			{githubUsers.map((user, index) => (
				<a
					key={index}
					href={user.url}
					target="_blank"
					rel="noopener noreferrer"
					className={styles.link}
				>
					{user.name}
				</a>
			))}
		</footer>
	)
}

export default Footer
