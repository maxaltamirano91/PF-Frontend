import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser, uploadImage } from '../../redux/actions'
import { updateUserValidationSchema } from './validations'
import Form from './Form'

const UpdateUserForm = ({ profileData }) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { token } = useSelector((state) => state.auth)
	const { imageUrl } = useSelector((state) => state.projects)
	const [imageProfile, setImageProfile] = useState(profileData.image || '')
	const [tempImage, setTempImage] = useState('')

	const initialValues = {
		userName: profileData.userName || '',
		currentPassword: '',
		newPassword: '',
		confirmPassword: '',
		bio: profileData.bio || '',
		image: profileData.image || '',
		aboutMe: profileData.aboutMe || '',
		links: profileData.links || [{ name: '', url: '', userId: profileData.id }],
	}

	const fields = [
		{ name: 'userName', type: 'text', label: 'Nombre de usuario' },
		{ name: 'currentPassword', type: 'password', label: 'Contraseña actual' },
		{ name: 'newPassword', type: 'password', label: 'Nueva contraseña' },
		{
			name: 'confirmPassword',
			type: 'password',
			label: 'Repite la contraseña',
		},
		{ name: 'bio', type: 'text', label: 'Bio' },
	]

	const socialPlatforms = [
		{ name: 'GitHub', value: 'github' },
		{ name: 'LinkedIn', value: 'linkedin' },
		{ name: 'YouTube', value: 'youtube' },
		{ name: 'Facebook', value: 'facebook' },
		{ name: 'Twitter', value: 'twitter' },
		{ name: 'Google', value: 'google' },
	]

	const handleUploadImage = async (e) => {
		const file = e.target.files[0]
		if (file) {
			setTempImage(URL.createObjectURL(file))
			dispatch(uploadImage(file))
		}
	}

	const handleSubmit = async (userData, { setSubmitting }) => {
		dispatch(updateUser(userData, token))
		setSubmitting(false)
		navigate('/myprofile')
	}

	useEffect(() => {
		if (imageUrl) {
			setImageProfile(imageUrl)
		}
	}, [imageUrl])

	return (
		<Form
			title="Editar usuario"
			initialValues={initialValues}
			validationSchema={updateUserValidationSchema}
			onSubmit={handleSubmit}
			fields={fields}
			maxWidth="1400px"
		>
			{(formik) => (
				<div>
					<div key="aboutMe">
						<label htmlFor="aboutMe" className="form-label">
							Sobre mí
						</label>
						<textarea
							id="aboutMe"
							name="aboutMe"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.aboutMe}
							className={`form-control ${
								formik.touched.aboutMe && formik.errors.aboutMe
									? 'is-invalid'
									: ''
							}`}
						/>
						{formik.touched.aboutMe && formik.errors.aboutMe ? (
							<div className="invalid-feedback">{formik.errors.aboutMe}</div>
						) : null}
					</div>

					{formik?.values?.links?.map((link, index) => (
						<div key={index}>
							<div>
								<label htmlFor={`link-name-${index}`}>
									Select Social Platform:
								</label>
								<select
									id={`link-name-${index}`}
									name={`links[${index}].name`}
									value={link?.name}
									onChange={formik.handleChange}
								>
									<option value="" disabled>
										Select a platform
									</option>
									{socialPlatforms.map((platform) => (
										<option key={platform.value} value={platform.value}>
											{platform.name}
										</option>
									))}
								</select>
							</div>
							<div>
								<label htmlFor={`link-url-${index}`}>Enter URL:</label>
								<input
									type="url"
									className=""
									id={`link-url-${index}`}
									name={`links[${index}].url`}
									value={link.url}
									onChange={formik.handleChange}
									placeholder="https://example.com"
								/>
							</div>
							<button
								type="button"
								className="btn"
								onClick={() =>
									formik.setFieldValue('links', [
										...formik.values.links,
										{ name: '', url: '' },
									])
								}
							>
								Add Link
							</button>
							<button
								type="button"
								className="btn"
								onClick={() =>
									formik.setFieldValue(
										'links',
										formik.values?.links?.filter((_, i) => i !== index)
									)
								}
							>
								Remove
							</button>
						</div>
					))}
					<div className="form-group">
						<input
							type="file"
							id="image"
							name="image"
							onChange={handleUploadImage}
						/>
						{tempImage && <img src={tempImage} alt="Preview" width="100" />}
						{imageProfile && !tempImage && (
							<img src={imageProfile} alt="Previous" width="100" />
						)}
					</div>
					<button type="submit" className="m-0 btn btn-primary">
						Update
					</button>
				</div>
			)}
		</Form>
	)
}

export default UpdateUserForm
