import { useNavigate} from "react-router-dom"
import "./Admin-bar.module.css"
import { FRONT_URL_BASE_FULL } from "../../../auth0-config";


const AdminBar = () =>{
    let data;
    const navigate = useNavigate()
    const adminViewU = () => {
        const currentUrl = window.location.href;
        data = "Users"
        currentUrl === `${FRONT_URL_BASE_FULL}/dashboard/Users` ? null : navigate(`/dashboard/${data}`)
    }
    const adminViewP = () => {
        const currentUrl = window.location.href;
        data = "Projects"
        currentUrl === `${FRONT_URL_BASE_FULL}/dashboard/Projects` ? null : navigate(`/dashboard/${data}`)
    }
    const adminViewT = () => {
        const currentUrl = window.location.href;
        data = "Technologies"
        currentUrl === `${FRONT_URL_BASE_FULL}/dashboard/Technologies` ? null : navigate(`/dashboard/${data}`)
    }
    

    return(
        <div style={{padding:"5px 20px"}}>
            <button className='text-body' style={{margin:"0px 5px", textDecoration:"none"}} onClick={adminViewU}>Usuarios</button>
            <button className='text-body' style={{margin:"0px 5px", textDecoration:"none"}} onClick={adminViewP}>Proyectos</button>
            <button className='text-body' style={{margin:"0px 5px", textDecoration:"none"}} onClick={adminViewT}>Tecnologías</button>
        </div>
    )
}

export default AdminBar;
