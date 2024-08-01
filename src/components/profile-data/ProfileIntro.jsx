import { useState } from 'react'
import styles from './ProfileData.module.css'
import { Link } from 'react-router-dom'
import { Pencil } from 'lucide-react'
import ReactModal from 'react-modal'
import CreateProjectForm from '../../view/create-project-page/CreateProjectPage'

ReactModal.setAppElement('#root')

const ProfileIntro = ({ theme, profileData, isCurrentUser }) => {
	const [modalIsOpen, setModalIsOpen] = useState(false)

	return (
		<div className={styles.dataContainer}>
			<div className={styles.imgContainer}>
				<img
					className={styles.imgContent}
					src={profileData?.image}
					alt={profileData?.userName}
				/>
			</div>
			<h2 className={theme === 'light'}>{profileData?.userName}</h2>
			<div>
				<div className={styles.infoContainer}>
					<p className={theme === 'light' ? 'text-secondary' : 'text-light'}>{profileData?.email}</p>
					<p className={theme === 'light' ? 'text-secondary' : 'text-light'}>{profileData?.bio}</p>
				</div>
				{isCurrentUser && (
					<div className={styles.dataButtons}>
						<div className={styles.buttonContainer}>
							<button
								className={`${styles.linkButton} btn btn-primary`}
								onClick={() => setModalIsOpen(true)}
							>
								<span className={styles.buttons}>Crear proyecto</span>
							</button>
						</div>
						<div className={styles.buttonContainer}>
							<Link
								className={`${styles.linkButton} ${styles.editButton} btn ${
									theme === 'light' ? 'btn-outline-light' : 'btn-outline-secondary'
								}`}
								to="/modUser"
							>
								<span className={theme === 'light' ? 'text-dark' : 'text-white'}>
									<Pencil
										fill={theme === 'light' ? '#21252' : '#fff'}
										size={16}
									/>{' '}
									Editar perfil
								</span>
							</Link>
						</div>
					</div>
				)}
			</div>

			<ReactModal
				isOpen={modalIsOpen}
				onRequestClose={() => setModalIsOpen(false)}
				contentLabel="Crear Proyecto"
				className={styles.modalContent}
				overlayClassName={styles.modalOverlay}
			>
				<CreateProjectForm closeModal={() => setModalIsOpen(false)} />
			</ReactModal>
		</div>
	)
}

export default ProfileIntro
