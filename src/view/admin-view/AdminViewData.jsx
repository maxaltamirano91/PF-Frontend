import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	fetchMetaData,
	downloadExcel,
	fetchPdf,
	clearPdfUrl,
	clearExcelUrl,
} from '../../redux/actions'
import {
	CCard,
	CCardBody,
	CCardHeader,
	CCol,
	CRow,
	CWidgetStatsD,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
	cilArrowTop,
	cilStar,
	cilThumbUp,
	cibLinkedin,
	cibGithub,
	cilGem,
} from '@coreui/icons'
import { CChartLine } from '@coreui/react-chartjs'
import { Sheet, FileText } from 'lucide-react'
import styled from 'styled-components'

const AdminViewData = () => {
	const dispatch = useDispatch()
	const { metaData, loading, error, excelUrl, pdfUrl } = useSelector(
		(state) => state.data
	)

	useEffect(() => {
		dispatch(fetchMetaData())
	}, [dispatch])

	useEffect(() => {
		if (excelUrl) {
			const a = document.createElement('a')
			a.href = excelUrl
			a.download = 'datos.xlsx'
			document.body.appendChild(a)
			a.click()
			a.remove()
			dispatch(clearExcelUrl())
		}
	}, [excelUrl, dispatch])

	useEffect(() => {
		if (pdfUrl) {
			const a = document.createElement('a')
			a.href = pdfUrl
			a.download = 'reporte.pdf'
			document.body.appendChild(a)
			a.click()
			a.remove()
			dispatch(clearPdfUrl())
		}
	}, [pdfUrl, dispatch])

	const handleDownloadExcel = () => {
		dispatch(downloadExcel())
	}

	const handlefetchPdf = () => {
		dispatch(fetchPdf())
	}

	if (loading) return <div>Loading...</div>
	if (error) return <div>Error: {error}</div>

	return (
		<SectionStyled className="p-3">
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
						<CCardHeader>Ganancia por administrador</CCardHeader>
						<CCardBody>
							<h4>$ {metaData.roundedAveragePrice}</h4>
							<div className="position-absolute top-0 end-0 p-2">
								<Sheet
									size={28}
									color="#098500"
									strokeWidth={0.5}
									onClick={handleDownloadExcel}
									style={{ cursor: 'pointer', marginRight: '10px' }}
								/>
								<FileText
									size={28}
									color="#c62424"
									strokeWidth={1}
									onClick={handlefetchPdf}
									style={{ cursor: 'pointer' }}
								/>
							</div>
						</CCardBody>
					</CCard>
				</CCol>
			</CRow>

			<CRow className="mb-4">
				<CCol xs="12" sm="6" md="4" className="mb-4">
					<CCard>
						<CCardHeader>Administradores</CCardHeader>
						<CCardBody>
							<h4>{metaData.userAdmin}</h4>
						</CCardBody>
					</CCard>
				</CCol>
				<CCol xs="12" sm="6" md="4" className="mb-4">
					<CCard>
						<CCardHeader>Contratos</CCardHeader>
						<CCardBody>
							<h4>{metaData.contractCount}</h4>
						</CCardBody>
					</CCard>
				</CCol>
				<CCol xs="12" sm="6" md="4" className="mb-4">
					<CCard>
						<CCardHeader>Ganancias Totales</CCardHeader>
						<CCardBody>
							<h4>$ {metaData.roundedAverageTotal}</h4>
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
								className="my-4 text-black"
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
								className="my-4 text-black"
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
							<CIcon className="my-4 text-black" icon={cilStar} height={52} />
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
							{ title: 'Reviews', value: metaData.reviewCount },
							{
								title: ' % Porcentaje Reviews',
								value: metaData.reviewsPercentage,
							},
						]}
					/>
				</CCol>

				<CCol xs={12} sm={6} md={4} className="mb-4">
					<CWidgetStatsD
						className="h-100"
						icon={
							<CIcon
								className="my-4 text-black"
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
							<CIcon className="my-4 text-black" icon={cilGem} height={52} />
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
		</SectionStyled>
	)
}

const SectionStyled = styled.div`
	.position-relative {
		position: relative;
	}
`

export default AdminViewData
