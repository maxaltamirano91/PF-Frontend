// cards.jsx
import styled from 'styled-components'

// ? components
import Card from './Card'

const Cards = () => {
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
		<CardsDiv  style={{backgroundColor:"white", display:"flex", flexWrap:"wrap"}}>
			{cardsData.map((data) => (
				<Card
					key={data.id}
					id={data.id}
					image={data.image}
					title={data.title}
				/>
			))}
		</CardsDiv>
	)
}

export default Cards

// ? Styles
const CardsDiv = styled.section`
	display: flex;
	justify-content: center;
	/* align-items: start; */
	/* flex-wrap: wrap; */
	background-color: black;
	background-image: url('/assets/images/background.jpg'); // Asegúrate de que la ruta sea correcta
	background-size: cover;
	background-position: center;
`
