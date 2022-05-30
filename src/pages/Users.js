import React from "react";
import { FaSortDown, FaSortUp, FaMale, FaFemale } from "react-icons/fa";
import Faactive from "../components/Active/faactive"
import { MdEmail } from "react-icons/md";
import Fainactive from "../components/Inactive/fainactive";
import './User.css'
const Users = ({ sort, loading, sortPost, isAscSort, isAsccSort,sortPostbyname}) => {
  
  return (
        <>
      {loading ? (
        <i className="center fa-solid fa-spinner"></i>
      ) : (
        <div className="main_post">
        <div className="main_heading item">
          <div className="id" style={{ cursor: "pointer" }}
                onClick={() => sortPost(!isAscSort)}>   <div classNameName="sorting">Id {isAscSort ? <FaSortDown />  :  <FaSortUp />}</div></div>
              <div className="name top" style={{ cursor: "pointer" }}
                onClick={() => sortPostbyname(!isAsccSort)}>   <div classNameName="sorting">Name {isAsccSort ? <FaSortDown />  : <FaSortUp />}</div></div>
          <div className="email top"> Email</div>
          <div className="gender top"> Gender</div>
          <div className="status top">Status</div>
        </div>
      
         { sort.map((items) => (
            <div className="main_heading items" key={items.id}>
              <div className="id">{items.id}</div>
              <div className="name top">{items.name}</div>
              <div className="email top"><MdEmail/> {items.email}</div>
              <div className="gender top">{items.gender.includes('female') ? <FaFemale />: <FaMale />} {items.gender}</div>
              <div className="status top">{items.status.includes("inactive")? <Faactive/>:<Fainactive/>} </div>
            </div>
       
          ))
         }
       
        </div>   
      )  }
        
      </>
  );
};

export default Users;
