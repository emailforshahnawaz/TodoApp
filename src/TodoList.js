import {useEffect, useState} from "react";
import React from "react";
import Listitem from "./Listitem";
import Paginationdiv from "./Paginationdiv";
import './App.css';
import update from "immutability-helper";
function TodoList() {
  const [arr,setarr]=useState([1]);
  const [newitem,setnewitem]=useState("");
  const [itemcount,setitemcount]=useState(0);
  const [paginationarray,setpgarray]=useState([1]);
  const [cmpntdidmountarray,setcmpnntdidmountarray]=useState([1]);
  //const cmpntdidmountarray=[1];
  
const newitemonchange=(event)=>{
  const newitemstate=event.target.value;
  setnewitem(newitemstate);
}
const newitemadd=()=>{
  fetch('http://localhost:9999/todo',
  {method:"post",body:JSON.stringify({task:newitem}),
headers:{
  "content-type":"application/json"
},credentials:"include"
}).then((res)=>{
  return res.json();
}).then((res)=>{const newitemelement=[...arr];
  newitemelement.push(res);
  console.log(arr.length);
  if(arr.length!==10)
  {
  setarr(newitemelement);
  setnewitem("");
  }
  if (arr.length===10){
    const temp=[cmpntdidmountarray[0]+1];
    console.log(cmpntdidmountarray," ",temp);
    setnewitem("");
    setcmpnntdidmountarray(temp);

  }
  
}).catch(e=>{}//console.log(e)
)
  
}
  const savecbfn=(newval,idx)=>{
    ////console.log(newval,idx,arr[idx]._id);
    fetch(`http://localhost:9999/todo/${arr[idx]._id}`,{
      method:'put',
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify({"task":newval}),credentials:"include"
    })
    .then(r=>r.json())
    .then( (res)=>
    {
      //console.log("new value that is to be saved is",typeof res)
      ////console.log("index of modified item is",idx)
      //console.log("type of arr",typeof arr," and value  is ", arr ,"and value after spread is ",[...arr])
      let a=[...arr];
      //update(arr,arr[idx].task:newval);
      //return [a,res];
      //a=arr;
      a[idx]=res;
      setarr(a);

      // let arrcopy=arr;
      // arr[idx].task=newval;
      // //console.log("array copy after ",arrcopy);
      // //console.log("response from put api",res);
      // ////console.log(typeof arrcopy,arrcopy);
      // return arr;
    }
      )
      // .then((a)=>{
      //   //console.log(a);
      //   a[0][idx]=a[1];
      //   //setarr(a[0]);
      // })
   
  }
  const deletecbfn=(index)=>{
      const arrcopy=[...arr];
      //console.log("before dlt arrcopy is ",arrcopy," index is",index," and og arr is ",arr);
      fetch(`http://localhost:9999/todo/${arr[index]._id}`,{
        method:"delete"
      }).then((res)=>{arrcopy.splice(index,1);
        ////console.log("after splice arrcopy is ",arrcopy," index is",index);
        //console.log("arr length is ",arr.length);
        //if (arr.length===1 ){
          const temp=[cmpntdidmountarray[0]+1];
          
          setcmpnntdidmountarray(temp);
      
        //}
     // setarr(arrcopy);

      })
  }
  const gotopage=(num)=>{

    fetch('http://localhost:9999/todo',{
      headers:{"pgnumber":num},
      credentials:"include"}).then((res)=>{     
      ////console.log(res.headers.get("COUNTS"));     
       return res.json();
    }).then((jsondata)=>{
            const sorteddata=jsondata.docs.sort((a,b)=>{return a.id-b.id})
      
      ////console.log(jsondata.counts);
     
      return sorteddata;
    })
    .then((newarr)=>{
      //console.log(newarr);
      setarr(newarr)
    })


  }
  useEffect(()=>{
    fetch('http://localhost:9999/todo',{
      headers:{"xcount":10},
      credentials:"include"}).then((res)=>{     
      //console.log(res.headers.get("COUNTS"),res);
        console.log("use effect part ran")
       return res.json();
    }).then((jsondata)=>{
      console.log(jsondata)
      if(jsondata.docs.length>0){
            const sorteddata=jsondata.docs.sort((a,b)=>{return a.id-b.id})
      
      
      //console.log("total item count from use effect ",jsondata.counts);
      if((jsondata.counts)>10){
        setitemcount(Number(jsondata.counts));
        const pagesize=Math.ceil(jsondata.counts/10);
        //console.log("page size is ",pagesize);
        const pgarrref=[]
        for (let i=1;i<=pagesize;i++){
            
            pgarrref.push(i);
        }
        
        //console.log("page  array ",pgarrref);
        setpgarray(pgarrref);
      }
      else{
        setpgarray([]);
      }
      return sorteddata;
    }
    })
    .then((newarr)=>{
      console.log("new arr ",newarr);
      setarr(newarr||[])
    })
  },cmpntdidmountarray)
  
  return (
    
    <div className="App">
      { console.log(arr)}
     {////console.log("value now at render ",paginationarray)
     }
      <textarea style={{resize:"none",marginLeft:"400px",width:"370px"}} value={newitem} onChange={newitemonchange} ></textarea>
      <button onClick={newitemadd} disabled={newitem.trim().length===0}>Add</button>
      <div className="todowraaper" style={{height:"300px"
      ,width:"400px",position:"relative",left:"400px" }}>
      {
      
        arr.map((item,index)=>(         
          <Listitem key={`${index}_${item._id}`} index={index}  deletecb={deletecbfn} value={item} savecallbkfn={savecbfn} />
        ))
      }
      {itemcount>0?<div style={{marginLeft:"200px",display:"flex",justifyContent:"flex-end"}}>
      {paginationarray.map((item,index)=>{
          return <Paginationdiv key={index} gotoo={gotopage} item={item} />
      })}
      </div>:""}
      </div>
    </div>
  );
}

export default TodoList;
