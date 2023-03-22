// Main.js
import React, { useEffect, useState } from "react";
import axios from "axios";
// import { setData } from "./Data";
import Data from "./Data";
import {Pop, Information} from "./Pop";
// import GridData from "./GridData";
function Main() {

  
  const [data,setData] = useState([])
  
  useEffect(() => {
    axios.get("http://127.0.0.1:2000/getData").then((response) => {
      setData(response.data.data);
      //   console.log(response.data.data);
      for (let i = 0; i < response.data.data.length; i++) {
        Data[i] = response.data.data[i];
        
      }
    });
    console.log(data);
    // eslint-disable-next-line
  },[]);

    const dataaa  = Data.map(dataa => 
    <Information
    id={dataa.id}
    name={dataa.name}
    age={dataa.age}
    address={dataa.address}
    department={dataa.department}
    status={dataa.status}
    class="btnn"
    />
    )
  return (
    <div className="body">
      <div className="grid-container">
        
        {dataaa}
        
      </div>
      <Pop id="fixedbtn" namee="Add" />
    </div>
  );
}

export default Main;
