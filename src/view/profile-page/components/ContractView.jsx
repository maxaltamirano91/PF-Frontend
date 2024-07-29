import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { getAllContracts, deleteContract } from '../../../redux/actions'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'

const ContractView = ({ searchQuery }) => {
	const dispatch = useDispatch()
	const token = useSelector((state) => state.auth.token)
	const { allContracts } = useSelector((state) => state.contract)
	const [showModal, setShowModal] = useState(false)
	const [selectedContract, setSelectedContract] = useState(null)

	useEffect(() => {
		dispatch(getAllContracts(token))
	}, [dispatch, token])

	const handleReject = (contractId) => {
		if (window.confirm('¿Estás seguro de que deseas rechazar este proyecto?')) {
			dispatch(deleteContract(contractId, token))
		}
	}

	const filteredContracts = allContracts.filter(
		(contract) =>
			contract.projectDescription
				.toLowerCase()
				.includes(searchQuery.toLowerCase()) ||
			contract.id.toString().includes(searchQuery)
	)

	return (
		<SectionStyled className="ListContracts">
			<div className="accordion accordion-flush" id="accordionFlushExample">
				{filteredContracts && filteredContracts.length > 0 ? (
					filteredContracts.map((contract, index) => (
						<div className="accordion-item" key={contract.id}>
							<h2 className="accordion-header">
								<span
									className="accordion-button collapsed item"
									type="button"
									data-bs-toggle="collapse"
									data-bs-target={`#flush-collapse${index}`}
									aria-expanded="false"
									aria-controls={`flush-collapse${index}`}
								>
									<div className="d-flex justify-content-between w-100 pe-5 flex-wrap">
										<div className="name">{contract.subject}</div>
									</div>
								</span>
							</h2>
							<div
								id={`flush-collapse${index}`}
								className="accordion-collapse collapse "
								data-bs-parent="#accordionFlushExample"
							>
								<div className="card-body card my-2 ">
									<div className="info">
										<p>Título proyecto: {contract.subject}</p>
										<p>Descripción: {contract.projectDescription}</p>
										<p>Presupuesto disponible: {contract.budget}</p>
										<p>Cronología: {contract.availableTime}</p>
									</div>
									<hr />
									<div className="actions d-flex justify-content-end gap-2">
										{/* <button
											type="button"
											className="btn btn-outline-primary mb-0"
											onClick={() => handleEdit(contract)}
										>
											Editar
										</button> */}
										<button
											type="button"
											className="btn btn-outline-danger mb-0"
											onClick={() => handleReject(contract.id)}
										>
											Rechazar
										</button>
									</div>
								</div>
							</div>
						</div>
					))
				) : (
					<p>No hay contratos disponibles</p>
				)}
			</div>
		</SectionStyled>
	)
}

export default ContractView

const SectionStyled = styled.section`
	span.item {
		&:hover {
			background-color: #a7abab39;
		}
	}
`
