import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Blog_view.css";
import { Link } from "react-router-dom";
import { GrCaretNext, GrCaretPrevious } from "react-icons/gr";

function BlogView() {
  const [blogs, setBlogs] = useState([]);
  const [sortOrder, setSortOrder] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);
  const totalPages = Math.ceil(blogs.length / postsPerPage);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          "https://blog-for-us.onrender.com/get/blog"
        );
        console.log("Fetched blogs:", response.data);
        const sortedBlogs = sortBlogs(response.data, sortOrder);
        setBlogs(sortedBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, [sortOrder]);

  const sortBlogs = (blogsToSort, order) => {
    console.log("Sorting blogs:", blogsToSort, "Order:", order);
    return blogsToSort.sort((a, b) => {
      const dateA = new Date(a.PublishedDateTime || a.createdAt);
      const dateB = new Date(b.PublishedDateTime || b.createdAt);
      console.log("Comparing dates:", dateA, dateB);
      return order === "latest" ? dateB - dateA : dateA - dateB;
    });
  };

  const handleSort = (order) => {
    console.log("Handling sort:", order);
    setSortOrder(order);
    setCurrentPage(1);
  };

  const truncateHTML = (html, maxLength) => {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    const text = tmp.textContent || tmp.innerText || "";
    if (text.length <= maxLength) return html;
    return text.substr(0, maxLength) + "...";
  };

  const formatDateTime = (dateTime) => {
    if (!dateTime) return "";
    const date = new Date(dateTime);
    return date.toLocaleString();
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogs.slice(indexOfFirstPost, indexOfLastPost);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <div className="btns">
        <button
          id="pr"
          onClick={prevPage}
          disabled={currentPage === 1}
          className={currentPage === 1 ? "disabled" : ""}
        >
          <GrCaretPrevious />
        </button>
        <button
          id="nxt"
          onClick={nextPage}
          disabled={currentPage === totalPages || totalPages === 0}
          className={
            currentPage === totalPages || totalPages === 0 ? "disabled" : ""
          }
        >
          <GrCaretNext />
        </button>
      </div>
      <select
        id="control"
        onChange={(e) => handleSort(e.target.value)}
        value={sortOrder}
      >
        <option
          className="opt"
          onClick={() => handleSort("latest")}
          value="latest"
        >
          Latest Posts
        </option>
        <option
          className="opt"
          onClick={() => handleSort("oldest")}
          value="oldest"
        >
          Oldest Posts
        </option>
      </select>
      {/* <select id="control">
        <option onClick={() => handleSort("latest")}>Latest Posts</option>
        <option onClick={() => handleSort("oldest")}>Oldest Posts</option>
      </select> */}
      <div className="data-list">
        {currentPosts.map((data, index) => (
          <div
            key={data._id}
            className={`data-row ${
              index % 2 === 0 ? "image-left" : "image-right"
            }`}
            id="box"
          >
            <div className="data-image">
              <img src={data.image.url} alt={data.Title} />
            </div>
            <div className="data-details">
              <h3>{data.Title}</h3>
              <p id="date">
                Published on:
                {formatDateTime(data.PublishedDateTime || data.createdAt)}
              </p>
              <div
                className="truncated-description"
                dangerouslySetInnerHTML={{
                  __html: truncateHTML(data.Description, 300),
                }}
              />
              <Link to={`/get/blog/${data._id}`} state={{ blogData: data }}>
                <button id="more">Learn more</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogView;
