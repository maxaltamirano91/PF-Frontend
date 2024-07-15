import { Link } from 'react-router-dom';
import img404 from '../../assets/images/404.gif'; 

const NotFoundPage = () => {
  return (
    <div className='container text-center my-5'> 
      <h1 className='display-1'>Oops!</h1>
      <img src={img404} alt="404 Not Found" className='img-fluid my-4' width={400} height={300} />
      <div className='my-4'>
        <h3>La página que estás buscando no existe. Inténtalo de nuevo</h3>
      </div>
      <Link to='/home'>
        <button className='btn btn-primary'>Volver</button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
