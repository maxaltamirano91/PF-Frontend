import React from "react"
import { useNavigate} from "react-router-dom"
import "./Admin-bar.module.css"


const AdminBar = () =>{

    var data;
    const navigate = useNavigate()
    const adminViewU = () => {
        const currentUrl = window.location.href;
        data = "Users"
        currentUrl === "http://localhost:5173/adminView/Users" ? null : navigate(`/adminView/${data}`)
    }
    const adminViewP = () => {
        const currentUrl = window.location.href;
        data = "Projects"
        currentUrl === "http://localhost:5173/adminView/Projects" ? null : navigate(`/adminView/${data}`)
    }
    const adminViewT = () => {
        const currentUrl = window.location.href;
        data = "Technologies"
        currentUrl === "http://localhost:5173/adminView/Technologies" ? null : navigate(`/adminView/${data}`)
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
