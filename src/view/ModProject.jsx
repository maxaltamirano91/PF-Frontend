import React from 'react';


const ModProject = () => {
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
                <input type="text" key="technologies" id='technologies' name='technologies' style={{backgroundColor:"#212529", border:"1pt solid #656768", width:"100%", fontSize:"21px"}} class='mb-3' /> <br />
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