import styled from 'styled-components'
import { useState, useEffect } from 'react'
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux'
import {
	fetchTechnologies,
	filterTechnologies,
	getAllProjects,
} from '../../redux/actions'

const Filter = () => {
	const dispatch = useDispatch()
	const { technologies } = useSelector((state) => state.technologies)
	const { token } = useSelector((state) => state.auth)
	const [selectedOptions, setSelectedOptions] = useState([])
	const [search, setSearch] = useState('')
	const pagination = 5

	const options = technologies.map((tech) => ({
		value: tech.name,
		label: tech.name,
		key: tech.name,
	}))

	const handleInputChange = (select) => {
		setSelectedOptions(select)
	}

	const handleSubmit = () => {
		const selectedTechnologies = selectedOptions.map((option) => option.value)
		dispatch(filterTechnologies(selectedTechnologies))
		dispatch(getAllProjects(pagination, search, selectedTechnologies))
	}

	useEffect(() => {
		dispatch(fetchTechnologies(token))
	}, [dispatch, token])
	return (
		<SectionStyled className="var">
			<link
				rel="stylesheet"
				href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css"
				integrity="sha512-YWzhKL2whUzgiheMoBFwW8CKV4qpHQAEuvilg9FAn5VJUDwKZZxkJNuGM4XkWuk94WCrrwslk8yWNGmY1EduTA=="
				crossOrigin="anonymous"
				referrerPolicy="no-referrer"
			/>

			<header className="header">
				<section
					className="search-box"
					// style={{ width: '450px' }}
				>
					<div className="search">
						<input
							type="search"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							placeholder="Search..."
						/>
					</div>
					<div className="selects">
						<Select
							options={options}
							onChange={handleInputChange}
							value={selectedOptions}
							isMulti={true}
						/>
					</div>
					<div className="btn">
						<button className="btn btn-light" onClick={handleSubmit}>
							Apply
						</button>
					</div>
				</section>
			</header>
		</SectionStyled>
	)
}

export default Filter

// ? Styles
const SectionStyled = styled.section`
	display: flex;
	align-items: center;
	justify-content: space-around;

	border-bottom: 1px solid #fafafa48;
	border-radius: 20px;
	margin: 12px auto;
	/* height: 58px; */
	font-weight: 600;

	.search-box {
		display: flex;
		/* justify-content: space-around; */

		/* width: 50%; */
		/* justify-content: center; */
		align-items: center;

		/* align-items: center; */
	}

	.header {
		/* justify-content: space-around; */

		/* background-color: wheat; */
	}
	.selects {
		/* border: 1px solid red; */
	}

	.type-list {
		margin-top: 10px;
	}
`
