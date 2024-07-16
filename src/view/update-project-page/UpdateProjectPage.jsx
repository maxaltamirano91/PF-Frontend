import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { fetchTechnologies } from '../../redux/actions'


const UpdateProjectPage = () => {

    const dispatch = useDispatch()
    const { technologies } = useSelector((state) => state.technologies)
    console.log(technologies)
    
    useEffect(() => {
        dispatch(fetchTechnologies(localStorage))
    }, [])

    const [input, setInput] = useState({
        title: "\n",
        description: "\n",
        technology: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        tags: "\n",
        image: "\n"
    })

    const change = event => {
        const {name, value} = event.target;
        setInput({
            ...input,
            [name] : value
        })
    }

    const change2 = event => {
        const {name, value, checked} = event.target;
        checked ? input.technology[name] = value : input.technology[name] = ""
        console.log(name, value)
        console.log(input.technology[name])
    }
    console.log(input)

    return(
    <div style={{width:"50%"}} className="mx-auto mt-5">
        <form action="">
            <div className="align-items-center">
                <label htmlFor="" style={{color:"white", fontSize:"20px"}}>Título:</label><br />
                <input type="text" key="title" id='title' name='title' style={{backgroundColor:"#212529", border:"1pt solid #656768", width:"100%", fontSize:"21px"}} className='mb-3' onChange={change} value={input.title} required/> <br />
            </div>
            <div>
                <label htmlFor="" style={{color:"white", fontSize:"20px"}}>Descripción de proyecto:</label><br />            
                <input type="text" key="description" id='description' name='description' style={{backgroundColor:"#212529", border:"1pt solid #656768", width:"100%", fontSize:"21px"}} className='mb-3' onChange={change} value={input.description} required/> <br />
            </div>
            <div>
                <label htmlFor="" style={{color:"white", fontSize:"20px"}}>Tecnologías:</label><br />
                <ul>
                    {technologies.map((value, index)=>(
                        <li key={index} style={{display:"inline-block", margin:"9px"}}>
                            <input key={value} id={value} name={index} type="checkbox" value={value.name} onChange={change2}/>
                            <label style={{fontSize:"20px", fontWeight:"bold"}} className='.custom-checkbox'>{value.name}</label>
                        </li>
                    ))}
                </ul>            
            </div>
            <div>
                <label htmlFor="" style={{color:"white", fontSize:"20px"}}>Tags:</label><br />
                <input type="text" key="tags" id='tags' name='tags' style={{backgroundColor:"#212529", border:"1pt solid #656768", width:"100%", fontSize:"21px"}} className='mb-3' onChange={change} value={input.tags} required/> <br />
            </div>
            <div>
                <label htmlFor="" style={{color:"white", fontSize:"20px"}}>Imagen representativa:</label><br />            
                <input type="text" key="image" id='image' name='image' style={{backgroundColor:"#212529", border:"1pt solid #656768", width:"100%", fontSize:"21px"}} className='mb-3' onChange={change} value={input.image} required/> 
            </div>
        </form>
    </div>
    )
}

export default UpdateProjectPage;