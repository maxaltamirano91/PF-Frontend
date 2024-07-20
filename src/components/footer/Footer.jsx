const Footer = () => {
  const githubLinks = [
    { name: 'Aldana Delgado', url: 'https://github.com/AldanaDelgado' },
    { name: 'Gaston Ibarra', url: 'https://github.com/gastonibarra233' },
    { name: 'Luis Diaz', url: 'https://github.com/LuisDiazR-Dev' },
    { name: 'Maximiliano Altamirano', url: 'https://github.com/maxaltamirano91' },
    { name: 'Miguel Linares', url: 'https://github.com/MiguelLinares01' },
    { name: 'Maria Sol', url: 'https://github.com/mikaiha888' },
    { name: 'Ivan Bell', url: 'https://github.com/Navixvi' },
];

return (
  <div style={{position:"relative", minHeight: "25vh"}}>
    <footer className="bg-dark text-white pt-1 w-100 mt-auto" style={{position:"absolute", bottom:"0"}}>
    <div className="container">
        <div className="row">
        <div className="col-md-14">
            <h5>GitHub Links</h5>
            <ul className="list-inline">
            {githubLinks.sort((a, b) => a.name.localeCompare(b.name)).map((link) => (
                <li key={link.name} className="list-inline-item mx-2">
                    {link.name}
                </li>
            ))}
            </ul>
        </div>
        </div>
        <div className="row mt-4">
        <div className="col text-center">
            <p>&copy; 2024 Your Company Name. All Rights Reserved.</p>
        </div>
        </div>
    </div>
    </footer>
    </div>
);
};

export default Footer;



