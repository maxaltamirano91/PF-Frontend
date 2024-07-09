import React from 'react';
import Card from '../components/Cards';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

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
    
    <div className="d-flex flex-column min-vh-100">
      <NavBar />  
      <div className="container flex-grow-1">
      <div className="row">
        {cardsData.map((card, index) => (
          <div key={index} className="col-md-4">
            <Card image={card.image} title={card.title} />
          </div>
        ))}
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
