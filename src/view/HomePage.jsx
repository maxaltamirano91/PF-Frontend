import React from 'react';
import Card from '../components/Cards';
import NavBar from '../components/NavBar';

const HomePage = () => {
  const cardsData = [
    {
      image: 'https://th.bing.com/th/id/OIP.qrxHxEMtpnEStOjhlGNSxAHaD4?rs=1&pid=ImgDetMain',
      title: 'Proyecto-Individual Drivers Henry'
    },
    {
      image: 'https://th.bing.com/th/id/OIP.qrxHxEMtpnEStOjhlGNSxAHaD4?rs=1&pid=ImgDetMain',
      title: 'PI DOGS Henry'
    },
    {
      image: 'https://th.bing.com/th/id/OIP.qrxHxEMtpnEStOjhlGNSxAHaD4?rs=1&pid=ImgDetMain',
      title: 'PI Pokemon Henry'
    },
    {
      image: 'https://th.bing.com/th/id/OIP.qrxHxEMtpnEStOjhlGNSxAHaD4?rs=1&pid=ImgDetMain',
      title: 'Proyecto-Individual Drivers Henry'
    },
    {
      image: 'https://th.bing.com/th/id/OIP.qrxHxEMtpnEStOjhlGNSxAHaD4?rs=1&pid=ImgDetMain',
      title: 'PI DOGS Henry'
    },
    {
      image: 'https://th.bing.com/th/id/OIP.qrxHxEMtpnEStOjhlGNSxAHaD4?rs=1&pid=ImgDetMain',
      title: 'PI Pokemon Henry'
    },
    {
      image: 'https://th.bing.com/th/id/OIP.qrxHxEMtpnEStOjhlGNSxAHaD4?rs=1&pid=ImgDetMain',
      title: 'Proyecto-Individual Drivers Henry'
    },
    {
      image: 'https://th.bing.com/th/id/OIP.qrxHxEMtpnEStOjhlGNSxAHaD4?rs=1&pid=ImgDetMain',
      title: 'PI DOGS Henry'
    },
    {
      image: 'https://th.bing.com/th/id/OIP.qrxHxEMtpnEStOjhlGNSxAHaD4?rs=1&pid=ImgDetMain',
      title: 'PI Pokemon Henry'
    },
    {
      image: 'https://th.bing.com/th/id/OIP.qrxHxEMtpnEStOjhlGNSxAHaD4?rs=1&pid=ImgDetMain',
      title: 'Proyecto-Individual Drivers Henry'
    },
    {
      image: 'https://th.bing.com/th/id/OIP.qrxHxEMtpnEStOjhlGNSxAHaD4?rs=1&pid=ImgDetMain',
      title: 'PI DOGS Henry'
    },
    {
      image: 'https://th.bing.com/th/id/OIP.qrxHxEMtpnEStOjhlGNSxAHaD4?rs=1&pid=ImgDetMain',
      title: 'PI Pokemon Henry'
    },
    {
      image: 'https://th.bing.com/th/id/OIP.qrxHxEMtpnEStOjhlGNSxAHaD4?rs=1&pid=ImgDetMain',
      title: 'Proyecto-Individual Drivers Henry'
    },
    {
      image: 'https://th.bing.com/th/id/OIP.qrxHxEMtpnEStOjhlGNSxAHaD4?rs=1&pid=ImgDetMain',
      title: 'PI DOGS Henry'
    },
    {
      image: 'https://th.bing.com/th/id/OIP.qrxHxEMtpnEStOjhlGNSxAHaD4?rs=1&pid=ImgDetMain',
      title: 'PI Pokemon Henry'
    },
    {
      image: 'https://th.bing.com/th/id/OIP.qrxHxEMtpnEStOjhlGNSxAHaD4?rs=1&pid=ImgDetMain',
      title: 'Proyecto-Individual Drivers Henry'
    },
    {
      image: 'https://th.bing.com/th/id/OIP.qrxHxEMtpnEStOjhlGNSxAHaD4?rs=1&pid=ImgDetMain',
      title: 'PI DOGS Henry'
    },
    {
      image: 'https://th.bing.com/th/id/OIP.qrxHxEMtpnEStOjhlGNSxAHaD4?rs=1&pid=ImgDetMain',
      title: 'PI Pokemon Henry'
    }
    
  ];

  return (
    
    <div className="container">
      <div className="row">
        {cardsData.map((card, index) => (
          <div key={index} className="col-md-4">
            <NavBar>  </NavBar> 
            <Card image={card.image} title={card.title} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
