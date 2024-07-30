import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllContracts } from '../../redux/actions'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import PendingContractView from '../admin-view/contract-tab/PendingContractView'
import AcceptContractView from '../admin-view/contract-tab/AcceptContractView'
import RejectContractView from '../admin-view/contract-tab/RejectContractView'
import styled from 'styled-components'

const AdminViewContracts = ({ searchQuery }) => {
	const dispatch = useDispatch()
	const token = useSelector((state) => state.auth.token)
	const contracts = useSelector((state) => state.contract.allContracts)

	useEffect(() => {
		dispatch(getAllContracts(token))
	}, [dispatch, token])

	const filteredContracts = contracts.filter(
		(contract) =>
			contract.receiver?.userName
				.toLowerCase()
				.includes(searchQuery.toLowerCase()) ||
			contract.id?.toString().includes(searchQuery)
	)

	const pendingContracts = filteredContracts.filter(
		(contract) => contract.status === 'pending'
	)
	const acceptedContracts = filteredContracts.filter(
		(contract) => contract.status === 'accepted'
	)
	const rejectedContracts = filteredContracts.filter(
		(contract) => contract.status === 'rejected'
	)

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
