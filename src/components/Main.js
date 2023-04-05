// Main.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import Data from "./Data";
import Pop from "./Pop";
import Information from "./Information";
import State from "./Status";
// import {ArrayContext} from 
 function Main() {

  
  

  
  
  const [data,setData] = useState([])
  
  useEffect(() => {
    axios.get("https://tan-bream-tam.cyclic.app/getData").then((response) => {
      setData(response.data.data);
      
        // console.log(response.data.data);
      for (let i = 0; i < response.data.data.length; i++) {
        Data[i] = response.data.data[i];   
        State[i] = response.data.data[i].status;
      }
       const countMap = State.reduce((map, item) => {
        map[item] = map[item] ? map[item] + 1 : 1;
        return map;
      }, {});
  
      const pieData = Object.keys(countMap).map(key => ({
        label: key,
        value: countMap[key],
      }));
  
  
      console.log(countMap);
      console.log(pieData);
      console.log(data);
      
    });

     // eslint-disable-next-line
  },[]);
  





  const Status = [];
  for (let i = 0; i < Data.length; i++) {
    Status[i] = Data[i].status;
    
  }

    const dataaa  = Data.map(dataa => 
    <Information
    key={dataa._id2}
    id={dataa._id}
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
      <Pop id="fixedbtn" namee="Add" name="Information" />
    </div>
  );
}

export default Main;
