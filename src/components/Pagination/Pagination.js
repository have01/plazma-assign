import React from 'react';
import './pagination.css'
import { FcPrevious, FcNext } from "react-icons/fc";


const Pagination = ({ postPerPage, totalPosts, paginate, handlePrevbtn, handleNextbtn, currentPage, pages }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav style={{ display: 'flex', justifyContent: 'center' }}>
      <ul  className='pagination'>

        <FcPrevious size={30}
          style={{ color: "#171717" }} 
         onClick={handlePrevbtn} 
          disabled={currentPage === pages[0] ? true : false} />
        {pageNumbers.map(number => (

          <li key={number} className='page-item' >


            <div className='round_icons' >    < a style={{ borderRadius: '50%', margin: '5px', color: 'black' }} onClick={() => paginate(number)} href='!#' className='page-link'>
              {number}
            </a></div>     

          </li>

        ))}
        <  FcNext size={30} style={{ color: "#171717" }} 
          onClick={handleNextbtn}
          disabled={currentPage === pages[pages.length - 1] ? true : false}
        />
      </ul>

    

  
    </nav>
  );
};

export default Pagination;
