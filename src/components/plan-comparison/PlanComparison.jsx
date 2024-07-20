import { Link } from 'react-router-dom';

const PlanComparison = (loggedUser) => {
  return (
        <div className="container py-5">
          <h2 className="text-center mb-5">Comparación de Planes</h2>
          <div className="row gx-5">
            <div className="col-md-6 mb-4">
              <div className="card h-100">
                <div className="card-body d-flex flex-column p-5">
                  <h5 className="card-title mb-5 text-center">ForDevs</h5>
                  <div className="card-text flex-grow-1">
                    <ul className="list-unstyled mb-4">
                      <li className="mb-3">Publica tus proyectos</li>
                      <li className="mb-3">Ofrece servicios autónomos</li>
                      <li className="mb-3">Envía propuestas a clientes</li>
                      <li className="mb-3">Vende tus recursos</li>
                      <li className="mb-3">Márcate como disponible para trabajar</li>
                      <li className="mb-3">Accede a nuestra bolsa de trabajo autónomo y a tiempo completo</li>
                      <li className="mb-3">Realiza transacciones en ForDevs con tarifas de plataforma del 15 al 30%</li>
                      <li className="mb-3">-</li>
                      <li className="mb-3">-</li>
                      <li className="mb-3">-</li>
                      <li className="mb-3">-</li>
                      <li className="mb-3">-</li>
                    </ul>
                  </div>
                  <Link to="/register" className="btn btn-primary mt-5">
                    Probar versión gratuita
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <div className="card h-100">
                <div className="card-body d-flex flex-column p-5">
                  <h5 className="card-title mb-5 text-center">ForDevs Pro</h5>
                  <div className="card-text flex-grow-1">
                    <ul className="list-unstyled mb-4">
                      <li className="mb-3">Publica tus proyectos</li>
                      <li className="mb-3">Ofrece servicios como freelance</li>
                      <li className="mb-3">Envía propuestas a clientes</li>
                      <li className="mb-3">Vende tus recursos</li>
                      <li className="mb-3">Marca tu disponibilidad para trabajar</li>
                      <li className="mb-3">0% de tarifa de la plataforma ForDevs</li>
                      <li className="mb-3">Proyectos protegidos por el seguro de calidad ForDevs</li>
                      <li className="mb-3">Ganancias transferidas automáticamente</li>
                      <li className="mb-3">Cuota de inscripción 20% más barata</li>
                      <li className="mb-3">Tienes acceso a la bolsa de trabajo freelance</li>
                      <li className="mb-3">Accede a la bolsa de trabajo de tiempo completo</li>
                      <li className="mb-3">Realiza transacciones en ForDevs</li>
                    </ul>
                  </div>
                  {loggedUser ? (
                    <Link to="/subscription" className="btn btn-primary mt-5">
                      Probar versión Pro
                    </Link>
                  ) : (
                    <Link to="/register" className="btn btn-primary mt-auto">
                      Probar versión Pro
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>  
  )
}

export default PlanComparison;
