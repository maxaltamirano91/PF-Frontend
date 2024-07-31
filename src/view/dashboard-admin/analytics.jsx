import React from 'react'

import { FileText } from 'lucide-react'
import { Sheet } from 'lucide-react'

import {
	CCard,
	CCardBody,
	CCardHeader,
	CCol,
	CRow,
	CDropdown,
	CDropdownToggle,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilArrowTop, cilOptions, cilStar, cilGem } from '@coreui/icons'
import { CChartLine } from '@coreui/react-chartjs'
import { CWidgetStatsD } from '@coreui/react'
import { cibGithub, cibLinkedin } from '@coreui/icons'
import { cilThumbUp } from '@coreui/icons'

import { useEffect, useState } from 'react'

import axios from 'axios'

// Componente Widget
const Widget = ({ color, value, title, chart }) => {
	return (
		<CCard className={`mb-4 bg-${color}`}>
			<CCardHeader>
				{title}
				<CDropdown alignment="end">
					<CDropdownToggle color="transparent" caret={false} className="p-0">
						<CIcon icon={cilOptions} className="text-white" />
					</CDropdownToggle>
				</CDropdown>
			</CCardHeader>
			<CCardBody>
				<div className="d-flex justify-content-between align-items-center">
					<div className="text-white">
						<h4>{value}</h4>
					</div>
					{chart}
				</div>
			</CCardBody>
		</CCard>
	)
}

// Componente Dashboard
const Dashboard = () => {
	const [metaData, setMetaData] = useState(null)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get('http://localhost:3001/metadata/data')
				setMetaData(response.data)
				console.log(metaData)
			} catch (error) {
				console.error('There was a problem with the fetch operation:', error)
			}
		}
		fetchData()
	}, [])

	if (!metaData) {
		return <div>Loading...</div>
	}

	return (
		<div className="p-3">
			<CRow className="mb-4">
				<CCol xs="12" sm="6" md="4" className="mb-4">
					<CCard>
						<CCardHeader>Usuarios</CCardHeader>
						<CCardBody>
							<h4>{metaData.userCount}</h4>
						</CCardBody>
					</CCard>
				</CCol>
				<CCol xs="12" sm="6" md="4" className="mb-4">
					<CCard>
						<CCardHeader>Proyectos</CCardHeader>
						<CCardBody>
							<h4>{metaData.projectsCount}</h4>
						</CCardBody>
					</CCard>
				</CCol>
				<CCol xs="12" sm="6" md="4" className="mb-4 position-relative">
					<CCard>
						<CCardHeader>Ganancias</CCardHeader>
						<CCardBody>
							<h4>$ {metaData.roundedAveragePrice}</h4>
							<div className="position-absolute top-0 end-0 p-2">
								<Sheet size={28} color="#098500" strokeWidth={0.5} />
								<FileText size={28} color="#c62424" strokeWidth={1} />
							</div>
						</CCardBody>
					</CCard>
				</CCol>
			</CRow>

			<CRow>
				<CCol xs={12} sm={6} md={4} className="mb-4">
					<CWidgetStatsD
						className="h-100"
						icon={
							<CIcon
								className="my-4 text-white"
								icon={cilArrowTop}
								height={52}
							/>
						}
						chart={
							<CChartLine
								className="position-absolute w-100 h-100"
								data={{
									labels: [
										'Lunes',
										'Martes',
										'Miércoles',
										'Jueves',
										'Viernes',
										'Sábado',
										'Domingo',
									],
									datasets: [
										{
											backgroundColor: 'rgba(10, 102, 194, 0.30)',
											borderColor: '#015c19',
											pointBackgroundColor: '#029c2a',
											borderWidth: 1,
											data: [65, 59, 84, 84, 51, 55, 40],
										},
									],
								}}
								options={{
									elements: {
										line: { tension: 0.4 },
										point: { radius: 4, hitRadius: 10, hoverRadius: 4 },
									},
									maintainAspectRatio: false,
									plugins: { legend: { display: false } },
									scales: {
										x: { display: false },
										y: { min: 30, max: 89, display: false },
									},
								}}
							/>
						}
						style={{ '--cui-card-cap-bg': '#28a745' }}
						values={[
							{ title: 'Ganancias', value: metaData.roundedAveragePrice },
						]}
					/>
				</CCol>

				<CCol xs={12} sm={6} md={4} className="mb-4">
					<CWidgetStatsD
						className="h-100"
						icon={
							<CIcon
								className="my-4 text-white"
								icon={cilThumbUp}
								height={52}
							/>
						}
						chart={
							<CChartLine
								className="position-absolute w-100 h-100"
								data={{
									labels: [
										'Lunes',
										'Martes',
										'Miércoles',
										'Jueves',
										'Viernes',
										'Sábado',
										'Domingo',
									],
									datasets: [
										{
											backgroundColor: 'rgba(10, 102, 194, 0.30)',
											borderColor: '#0a66c6',
											pointHoverBackgroundColor: '#fff',
											borderWidth: 2,
											data: [65, 59, 84, 84, 51, 55, 40],
											fill: true,
										},
									],
								}}
								options={{
									elements: {
										line: { tension: 0.4 },
										point: {
											radius: 0,
											hitRadius: 10,
											hoverRadius: 4,
											hoverBorderWidth: 3,
										},
									},
									maintainAspectRatio: false,
									plugins: { legend: { display: false } },
									scales: { x: { display: false }, y: { display: false } },
								}}
							/>
						}
						style={{ '--cui-card-cap-bg': '#3b5998' }}
						values={[
							{ title: 'Likes', value: metaData.likeCount },
							{
								title: ' % Porcentaje Likes',
								value: metaData.likesPercentage,
							},
						]}
					/>
				</CCol>

				<CCol xs={12} sm={6} md={4} className="mb-4">
					<CWidgetStatsD
						className="h-100"
						icon={
							<CIcon className="my-4 text-white" icon={cilStar} height={52} />
						}
						chart={
							<CChartLine
								className="position-absolute w-100 h-100"
								data={{
									labels: [
										'Lunes',
										'Martes',
										'Miércoles',
										'Jueves',
										'Viernes',
										'Sábado',
										'Domingo',
									],
									datasets: [
										{
											backgroundColor: 'rgba(255, 204, 0, 0.4)',
											borderColor: '#eee300',
											pointHoverBackgroundColor: '#fff',
											borderWidth: 2,
											data: [65, 59, 84, 84, 51, 55, 40],
											fill: true,
										},
									],
								}}
								options={{
									elements: {
										line: { tension: 0.4 },
										point: {
											radius: 0,
											hitRadius: 10,
											hoverRadius: 4,
											hoverBorderWidth: 3,
										},
									},
									maintainAspectRatio: false,
									plugins: { legend: { display: false } },
									scales: { x: { display: false }, y: { display: false } },
								}}
							/>
						}
						style={{ '--cui-card-cap-bg': '#3b5998' }}
						values={[
							{ title: 'Reviews', value: metaData.reviewsPercentage },
							{
								title: ' % Porcentaje Reviews',
								value: metaData.revi,
							},
						]}
					/>
				</CCol>

				<CCol xs={12} sm={6} md={4} className="mb-4">
					<CWidgetStatsD
						className="h-100"
						icon={
							<CIcon
								className="my-4 text-white"
								icon={cibLinkedin}
								height={52}
							/>
						}
						chart={
							<CChartLine
								className="position-absolute w-100 h-100"
								data={{
									labels: [
										'Lunes',
										'Martes',
										'Miércoles',
										'Jueves',
										'Viernes',
										'Sábado',
										'Domingo',
									],
									datasets: [
										{
											backgroundColor: 'rgba(10, 102, 194, 0.30)',
											borderColor: '#0a66c6',
											pointHoverBackgroundColor: '#fff',
											borderWidth: 2,
											data: [65, 59, 84, 84, 51, 55, 40],
											fill: true,
										},
									],
								}}
								options={{
									elements: {
										line: { tension: 0.4 },
										point: {
											radius: 0,
											hitRadius: 10,
											hoverRadius: 4,
											hoverBorderWidth: 3,
										},
									},
									maintainAspectRatio: false,
									plugins: { legend: { display: false } },
									scales: { x: { display: false }, y: { display: false } },
								}}
							/>
						}
						style={{ '--cui-card-cap-bg': '#3b5998' }}
						values={[
							{ title: 'Perfiles con Linkedin', value: metaData.linkedInCount },
							{
								title: ' % Porcentaje Usuarios con LinkedInd',
								value: metaData.linkedInPercentage,
							},
						]}
					/>
				</CCol>

				<CCol xs={12} sm={6} md={4} className="mb-4">
					<CWidgetStatsD
						className="h-100"
						icon={
							<CIcon className="my-4 text-white" icon={cibGithub} height={52} />
						}
						chart={
							<CChartLine
								className="position-absolute w-100 h-100"
								data={{
									labels: [
										'Lunes',
										'Martes',
										'Miércoles',
										'Jueves',
										'Viernes',
										'Sábado',
										'Domingo',
									],
									datasets: [
										{
											backgroundColor: 'rgba(255,255,255,.1)',
											borderColor: 'rgba(45,186,78)',
											pointHoverBackgroundColor: '#fff',
											borderWidth: 2,
											data: [1, 13, 9, 17, 34, 41, 38],
											fill: true,
										},
									],
								}}
								options={{
									elements: {
										line: { tension: 0.4 },
										point: {
											radius: 0,
											hitRadius: 10,
											hoverRadius: 4,
											hoverBorderWidth: 3,
										},
									},
									maintainAspectRatio: false,
									plugins: { legend: { display: false } },
									scales: { x: { display: false }, y: { display: false } },
								}}
							/>
						}
						style={{ '--cui-card-cap-bg': '#1da1f2' }}
						values={[
							{ title: 'Perfiles con GitHub', value: metaData.githubCount },
							{
								title: ' % Porcentaje Usuarios con GitHub',
								value: metaData.githubPercentage,
							},
						]}
					/>
				</CCol>

				<CCol xs={12} sm={6} md={4} className="mb-4">
					<CWidgetStatsD
						className="h-100"
						icon={
							<CIcon className="my-4 text-white" icon={cilGem} height={52} />
						}
						chart={
							<CChartLine
								className="position-absolute w-100 h-100"
								data={{
									labels: [
										'Lunes',
										'Martes',
										'Miércoles',
										'Jueves',
										'Viernes',
										'Sábado',
										'Domingo',
									],
									datasets: [
										{
											backgroundColor: 'rgba(10, 102, 194, 0.30)',
											borderColor: '#0a66c6',
											pointHoverBackgroundColor: '#fff',
											borderWidth: 2,
											data: [65, 59, 84, 84, 51, 55, 40],
											fill: true,
										},
									],
								}}
								options={{
									elements: {
										line: { tension: 0.4 },
										point: {
											radius: 0,
											hitRadius: 10,
											hoverRadius: 4,
											hoverBorderWidth: 3,
										},
									},
									maintainAspectRatio: false,
									plugins: { legend: { display: false } },
									scales: { x: { display: false }, y: { display: false } },
								}}
							/>
						}
						style={{ '--cui-card-cap-bg': '#3b5998' }}
						values={[
							{ title: 'User Premium', value: metaData.userPremium },
							{
								title: ' User Free',
								value: metaData.userFree,
							},
						]}
					/>
				</CCol>
			</CRow>
		</div>
	)
}

export default Dashboard
