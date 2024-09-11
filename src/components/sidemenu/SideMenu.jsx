import React, { useEffect, useState } from "react";
import '../sidemenu/sidemenu.css'
import { BiSolidCategory } from "react-icons/bi";
import { getEventByCategory, getEventCategories } from "../services/EventService";
import { useNavigate } from "react-router-dom";

function SideMenu({ showMenu, setShowMenu }) {

  const navigate = useNavigate();

  const[event,setEvent] = useState()
  const[categories,setCategories] = useState()

  useEffect(()=>{
    apiCall();
    getCategories();
  },[])
  
  const apiCall = async(category) =>{
    let event = await getEventByCategory(category);
    setEvent(event)
    
    // console.log(event[0]?.category);
    category ? 
    navigate(`/${event[0]?.category}`) : ''
    
  }

  const getCategories = async() =>{
    let categories = await getEventCategories();
    setCategories(categories);
  }

  function handleCategory(e){
    console.log(e.target.innerText);
    apiCall(e.target.innerText)
  }

  return (
    <>
      {showMenu ? (
        <div id="side-menu-main-container">
          <div id="side-menu-container">
            <p><BiSolidCategory /> Categories</p>
            <ul>
              {categories?.length ?categories?.map((category,index)=>(
                 <li key={index} onClick={handleCategory}>{category}</li>
            )) : ''}
            </ul>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default SideMenu;
