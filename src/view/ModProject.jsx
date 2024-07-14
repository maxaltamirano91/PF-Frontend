import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import '../App.css';
import { fetchTechnologies, filterTechnologies, getAllProjects } from '../redux/actions'


const ModProject = () => {

    const dispatch = useDispatch()
    const { technologies } = useSelector((state) => state.technologies)
    console.log(technologies)
    
    useEffect(() => {
        dispatch(fetchTechnologies(localStorage))
    }, [])


    return(
    <div style={{width:"50%"}} class="mx-auto mt-5">
        <form action="">
            <div class="align-items-center">
                <label htmlFor="" style={{color:"white", fontSize:"20px"}}>Título:</label><br />
                <input type="text" key="title" id='title' name='title' style={{backgroundColor:"#212529", border:"1pt solid #656768", width:"100%", fontSize:"21px"}} class='mb-3'/> <br />
            </div>
            <div>
                <label htmlFor="" style={{color:"white", fontSize:"20px"}}>Descripción de proyecto:</label><br />            
                <input type="text" key="description" id='description' name='description' style={{backgroundColor:"#212529", border:"1pt solid #656768", width:"100%", fontSize:"21px"}} class='mb-3' /> <br />
            </div>
            <div>
                <label htmlFor="" style={{color:"white", fontSize:"20px"}}>Tecnologías:</label><br />
                <ul>
                    {technologies.map((value, index)=>(
                        <li key={index} style={{display:"inline-block", margin:"9px"}}>
                            <input key={value} id={value} name={index} type="checkbox" value={value.name}/>
                            <label style={{fontSize:"20px", fontWeight:"bold"}} class='.custom-checkbox'>{value.name}</label>
                        </li>
                    ))}
                </ul>            
            </div>
            <div>
                <label htmlFor="" style={{color:"white", fontSize:"20px"}}>Tags:</label><br />
                <input type="text" key="tags" id='tags' name='tags' style={{backgroundColor:"#212529", border:"1pt solid #656768", width:"100%", fontSize:"21px"}} class='mb-3' /> <br />
            </div>
            <div>
                <label htmlFor="" style={{color:"white", fontSize:"20px"}}>Imagen representativa:</label><br />            
                <input type="text" key="image" id='image' name='image' style={{backgroundColor:"#212529", border:"1pt solid #656768", width:"100%", fontSize:"21px"}} class='mb-3' /> 
            </div>
        </form>
    </div>
    )
}

export default ModProject;