import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllContracts, createCommission } from '../../redux/actions'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import PendingContractView from '../admin-view/contract-tab/PendingContractView'
import AcceptContractView from '../admin-view/contract-tab/AcceptContractView'
import RejectContractView from '../admin-view/contract-tab/RejectContractView'
import styled from 'styled-components'

// Función para calcular la comisión
const calculateCommission = (planName, budget) => {
	let rate = 0
	switch (planName.toLowerCase()) {
		case 'premium':
			rate = 0.05 // 5% para Premium
			break
		case 'free':
			rate = 0.25 // 25% para Free
			break
		default:
			throw new Error(`Unknown plan: ${planName}`)
	}
	const amount = budget * rate
	return { rate, amount }
}

const AdminViewContracts = ({ searchQuery }) => {
	const dispatch = useDispatch()
	const token = useSelector((state) => state.auth.token)
	const { allUsers } = useSelector((state) => state.users)

	useEffect(() => {
		dispatch(getAllContracts(token))
	}, [dispatch, token])

	useEffect(() => {
		// Filtrar los contratos aceptados y calcular la comisión si es necesario
		allUsers.forEach((user) => {
			user.receivedContracts.forEach((contract) => {
				if (contract.status === 'accepted') {
					if (
						user.role === 'user' &&
						['free', 'premium'].includes(user.planName.toLowerCase())
					) {
						const { rate, amount } = calculateCommission(
							user.planName,
							contract.budget
						)
						const commissionData = {
							contractId: contract.id,
							rate,
							amount,
						}
						dispatch(createCommission(commissionData, token))
					}
				}
			})
		})
	}, [allUsers, dispatch, token])

	const filteredUsers = allUsers.filter(
		(user) =>
			user.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
			user.receivedContracts.some((contract) =>
				contract.id.toString().includes(searchQuery)
			)
	)

	const pendingContracts = []
	const acceptedContracts = []
	const rejectedContracts = []

	filteredUsers.forEach((user) => {
		user.receivedContracts.forEach((contract) => {
			if (contract.status === 'pending') {
				pendingContracts.push(contract)
			} else if (contract.status === 'accepted') {
				acceptedContracts.push(contract)
			} else if (contract.status === 'rejected') {
				rejectedContracts.push(contract)
			}
		})
	})

	return (
		<SectionStyled>
			<ul className="nav nav-tabs" id="myTab" role="tablist">
				<li className="nav-item" role="presentation">
					<button
						className="nav-link active"
						id="pending-tab"
						data-bs-toggle="tab"
						data-bs-target="#pending"
						type="button"
						role="tab"
						aria-controls="pending"
						aria-selected="true"
					>
						Pending
					</button>
				</li>
				<li className="nav-item" role="presentation">
					<button
						className="nav-link"
						id="rejected-tab"
						data-bs-toggle="tab"
						data-bs-target="#rejected"
						type="button"
						role="tab"
						aria-controls="rejected"
						aria-selected="false"
					>
						Rejected
					</button>
				</li>
				<li className="nav-item" role="presentation">
					<button
						className="nav-link"
						id="accepted-tab"
						data-bs-toggle="tab"
						data-bs-target="#accepted"
						type="button"
						role="tab"
						aria-controls="accepted"
						aria-selected="false"
					>
						Accepted
					</button>
				</li>
			</ul>
			<div className="tab-content" id="myTabContent">
				<div
					className="tab-pane fade show active"
					id="pending"
					role="tabpanel"
					aria-labelledby="pending-tab"
				>
					<PendingContractView
						contracts={pendingContracts}
						searchQuery={searchQuery}
					/>
				</div>
				<div
					className="tab-pane fade"
					id="accepted"
					role="tabpanel"
					aria-labelledby="accepted-tab"
				>
					<AcceptContractView
						contracts={acceptedContracts}
						searchQuery={searchQuery}
					/>
				</div>
				<div
					className="tab-pane fade"
					id="rejected"
					role="tabpanel"
					aria-labelledby="rejected-tab"
				>
					<RejectContractView
						contracts={rejectedContracts}
						searchQuery={searchQuery}
					/>
				</div>
			</div>
		</SectionStyled>
	)
}

export default AdminViewContracts

const SectionStyled = styled.section`
	span.item {
		&:hover {
			background-color: #a7abab39;
		}
	}
`
