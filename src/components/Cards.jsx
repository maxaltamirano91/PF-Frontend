import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';
import { getAllProjects } from '../redux/actions';
import React, { useEffect, useState } from 'react';

// ? components
import Card from './Card'

const Cards = () => {

	const dispatch = useDispatch();

	useEffect(()=>{
		dispatch(getAllProjects());
	}, [dispatch])
	const allP = useSelector(state => state.project.getAllProjects?.data)
	// // const allP = useSelector(state => state.project.getAllProjects.data)
	var non = false
  	Array.isArray(allP) ? non = true : null
	console.log("LOOOOOS PROYECTOOOOS", allP)

	const cardsData = [
		{
			id: 1,
			image:
				'https://th.bing.com/th/id/OIP.qrxHxEMtpnEStOjhlGNSxAHaD4?rs=1&pid=ImgDetMain',
			title: 'Proyecto-Individual Drivers Henry',
		},
		{
			id: 2,
			image:
				'https://th.bing.com/th/id/OIP.qrxHxEMtpnEStOjhlGNSxAHaD4?rs=1&pid=ImgDetMain',
			title: 'PI DOGS Henry',
		},
		{
			id: 3,
			image:
				'https://th.bing.com/th/id/OIP.qrxHxEMtpnEStOjhlGNSxAHaD4?rs=1&pid=ImgDetMain',
			title: 'PI Pokemon Henry',
		},
		{
			id: 4,
			image:
				'https://th.bing.com/th/id/OIP.qrxHxEMtpnEStOjhlGNSxAHaD4?rs=1&pid=ImgDetMain',
			title: 'PI Pokemon Henry',
		},
		{
			id: 5,
			image:
				'https://th.bing.com/th/id/OIP.qrxHxEMtpnEStOjhlGNSxAHaD4?rs=1&pid=ImgDetMain',
			title: 'PI Pokemon Henry',
		},
		{
			id: 6,
			image:
				'https://th.bing.com/th/id/OIP.qrxHxEMtpnEStOjhlGNSxAHaD4?rs=1&pid=ImgDetMain',
			title: 'PI Pokemon Henry',
		},
	]

	return (
		<CardsDiv className="container-fluid ">
			{non ? allP.map((data) => (
				<Card
					key={data.id}
					id={data.id}
					image={data.image}
					title={data.title}
					description={data.description}
				/>
			)) : null}
		</CardsDiv>
	)
}

export default Cards

// ? Styles
const CardsDiv = styled.section`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
	gap: 20px;
	margin: 50px 0;
	padding: 10px;
	@media (max-width: 992px) {
		grid-template-columns: 1fr; /* Una columna por fila para pantallas menores a 992px */
	}
`
