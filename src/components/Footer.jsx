import React from 'react';

const Footer = () => {
  const githubLinks = [
    { name: 'Aldana Delgado', url: 'https://github.com/AldanaDelgado' },
    { name: 'Gaston Ibarra', url: 'https://github.com/gastonibarra233' },
    { name: 'Luis Diaz', url: 'https://github.com/LuisDiazR-Dev' },
    { name: 'Maximiliano Altamirano', url: 'https://github.com/maxaltamirano91' },
    { name: 'Miguel Linares', url: 'https://github.com/MiguelLinares01' },
    { name: 'Maria Sol ', url: 'https://github.com/mikaiha888' },
    { name: 'Ivan Bell', url: 'https://github.com/Navixvi' },
  ];

  return (
    <footer className="bg-dark text-white py-1 " style={{position:"absolute", width:"100%", bottom:"0"}}>
      <div className="container">
        <div className="row">
          <div className="col-md-12  text-center">
            <h5>Contáctanos</h5>
            <ul className="list-inline">
              {githubLinks.map((link) => (
                <li key={link.name} className="list-inline-item mx-2">
                  <a href={link.url} className="text-white" target="_blank" rel="noopener noreferrer">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col text-center">
            <p>&copy; 2024 ForDevs. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
