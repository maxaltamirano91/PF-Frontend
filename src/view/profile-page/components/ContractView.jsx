import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { createCommission, getAllContracts, updateContractStatus } from '../../../redux/actions'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'

const ContractView = ({ searchQuery, activeContractTab, categories }) => {
	const dispatch = useDispatch()
	const token = useSelector((state) => state.auth.token)
	const { allContracts } = useSelector((state) => state.contract)
	const { loggedUser } = useSelector((state) => state.auth)
	const [filteredContracts, setFilteredContracts] = useState([])

	useEffect(() => {
		dispatch(getAllContracts(token))
	}, [dispatch, token])

	const handleReject = async (contractId) => {
		if (window.confirm('¿Estás seguro de que deseas rechazar este proyecto?')) {
			await dispatch(updateContractStatus(contractId, 'rejected', token))
			dispatch(getAllContracts(token))
		}
	}

	const handleAccept = async (contractId) => {
		if (window.confirm('¿Estás seguro de que deseas aceptar este proyecto?')) {
			await dispatch(updateContractStatus(contractId, 'accepted', token))
			dispatch(createCommission(contractId, token))
			dispatch(getAllContracts(token))
		}
	}

	useEffect(() => {
		const filtered = allContracts.filter(
			(contract) =>
				contract.receiverId === loggedUser.id &&
				(contract.projectDescription
					.toLowerCase()
					.includes(searchQuery.toLowerCase()) ||
					contract.id.toString().includes(searchQuery))
		)
		setFilteredContracts(filtered)
	}, [allContracts, searchQuery, loggedUser.id])

	return (
		<div>
			<SectionStyled className="container-fluid mt-2" id="dashboard" />
			<ul className="nav nav-tabs">
				<li className="nav-item">
					<a
						className={`nav-link ${
							activeContractTab === categories.contracts ? 'active' : ''
						}`}
						aria-current={
							activeContractTab === 'contracts' ? 'page' : undefined
						}
						onClick={() => handleTabClick(categories.contracts)}
					>
						Solicita usuario
					</a>
				</li>
			</ul>
			<div className="content-tab" id="content-tab">
				{activeContractTab === categories.contracts && (
					<SectionStyled className="ListContracts">
						<div
							className="accordion accordion-flush"
							id="accordionFlushExample"
						>
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
													<div className="name">
														{contract.sender?.userName}
														{contract.status === 'accepted' && (
															<span
																className="status"
																style={{ color: 'green', marginLeft: '10px' }}
															>
																ACEPTADO
															</span>
														)}
														{contract.status === 'rejected' && (
															<span
																className="status"
																style={{ color: 'red', marginLeft: '10px' }}
															>
																RECHAZADO
															</span>
														)}
													</div>
													<div className="name">{contract.sender?.email}</div>
												</div>
											</span>
										</h2>
										<div
											id={`flush-collapse${index}`}
											className="accordion-collapse collapse"
											data-bs-parent="#accordionFlushExample"
										>
											<div className="card-body card my-2">
												<div className="info">
													<p>Título proyecto: {contract.subject}</p>
													<p>Descripción: {contract.projectDescription}</p>
													<p>
														Presupuesto disponible: {contract.budget}{' '}
														{contract.currency}
													</p>
													<p>Cronología: {contract.availableTime}</p>
													{contract.status === 'accepted' && (
														<p>Estado: PROYECTO ACEPTADO</p>
													)}
												</div>
												<hr />

												{contract.status === 'pending' && (
													<div className="actions d-flex justify-content-end gap-2">
														<button
															type="button"
															className="btn btn-outline-success mb-0"
															onClick={() => handleAccept(contract.id)}
														>
															Aceptar
														</button>
														<button
															type="button"
															className="btn btn-outline-danger mb-0"
															onClick={() => handleReject(contract.id)}
														>
															Rechazar
														</button>
													</div>
												)}
											</div>
										</div>
									</div>
								))
							) : (
								<p>No hay contratos disponibles</p>
							)}
						</div>
					</SectionStyled>
				)}
			</div>
		</div>
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
