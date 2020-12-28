import React, { useState } from "react";
export default function Listitem(props){
    const [editmode,seteditmode]=useState(false);
    const [editedtext,setedittext]=useState(props.value.task);
    
    const changeeditmode=()=>{
        seteditmode(true);
    }
    const listitemediting=(event)=>{
        const temp=event.target.value;
        setedittext(temp);
    }
    const listitemsaveedit=()=>{
        seteditmode(false);
        props.savecallbkfn(editedtext,props.index);
        
    }
const listitemdltfn=()=> {
    props.deletecb(props.index)
}
    return (
        
        <div>
           
           {editmode?<><textarea onChange={listitemediting} value={editedtext}></textarea>
           <button onClick={listitemsaveedit} >save</button>
            </>:<div style={{marginBottom:"5px",display:"flex",height:"30px",borderRadius:"2px",border:"1px solid black"}} ><div style={{width:"350px",textAlign:"left"}}>{props.value.task}</div>
            <button onClick={changeeditmode} >Edit</button>
           <button onClick={listitemdltfn}>Delete</button></div> }          
           </div>
    )
}