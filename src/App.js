import React, { useState, useEffect } from "react";
import Users from "./pages/Users";
import Pagination from "./components/Pagination/Pagination";
import axios from "axios";
import "./App.css";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(6);
  const [query, setQuery] = useState("");
  const [isAscSort, setIsAscSort] = useState(true);
  const [isAsccSort, setIsAsccSort] = useState(true);
  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  useEffect(() => {
    let searchedParam = "";

    if (isNaN(Number(query))) {
      searchedParam = `name=${query}`;

      if (query.includes("@")) {
        searchedParam = `email=${query}`;
      }
    } else {
      searchedParam = `id=${query}`;
    }

    const fetchPosts = async () => {
      setLoading(true);
      const {
        data: { data },
      } = await axios.get(
        query
          ? `${process.env.REACT_APP_BASE_URL}?${searchedParam}`
          : process.env.REACT_APP_BASE_URL
      );
      setPosts(data);
      setLoading(false);
    };

    fetchPosts();
  }, [query]);

  const pages = [];
  for (let i = 1; i <= Math.ceil(posts.length / postPerPage); i++) {
    pages.push(i);
  }
  // Get current posts
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const handleNextbtn = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setCurrentPage(currentPage - 1);
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const sortPost = (toggle) => {
    setIsAscSort(toggle);

    if (toggle) {
      posts.sort((a, b) => a.id - b.id);
    } else {
      posts.sort((a, b) => b.id - a.id);
    }
  };
  const sortPostbyname = (toggle) => {
    setIsAsccSort(toggle);

    if (toggle) {
      posts.sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() );
    } else {
      posts.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase());
    }
  };

  return (
    <div className="container mt-5">
      <div className="inputsearch">
        <span style={{ fontSize: '30px' }}>  Users </span>  <input
          className="input"
          type={"search"}
          placeholder=" Search For Id  Name or Email "
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        ></input>
      </div>
      <Users
        sortPost={sortPost}
        isAscSort={isAscSort}
        isAsccSort={isAsccSort}
        loading={loading}
        sort={currentPosts}
        sortPostbyname={sortPostbyname}
      />
      <Pagination
        count={10}
        postPerPage={postPerPage}
        totalPosts={posts.length}
        paginate={paginate}
        handleNextbtn={handleNextbtn}
        handlePrevbtn={handlePrevbtn}
        currentPage={currentPage}
        pages={pages}
      />
    </div>
  );
};

export default App;
