import React, { useState, useEffect } from "react"; //useEffect
import { useLocation, useNavigate, useParams } from "react-router-dom"; //
import axios from "axios";
import "./blog_post.css";

function BlogPost() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [blogData, setBlogData] = useState(location.state?.blogData); //

  useEffect(() => {
    if (!blogData) {
      fetchBlogData();
    }
  }, []);

  const fetchBlogData = async () => {
    try {
      const response = await axios.get(
        `https://blog-for-us.onrender.com/get/blog/${id}`
      );
      setBlogData(response.data);
    } catch (error) {
      console.error("Error fetching blog data:", error);
      alert("Failed to fetch blog data");
    }
  };

  const formatDateTime = (dateTime) => {
    if (!dateTime) return "";
    const date = new Date(dateTime);
    return date.toLocaleString();
  };

  if (!blogData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="blog-post">
      <div className="blog-content-wrapper">
        <li className="image-container">
          {blogData.image && blogData.image.url && (
            <img src={blogData.image.url} alt={blogData.Title} />
          )}
        </li>
        <li id="det">
          <h2>{blogData.Title}</h2>
          {blogData.PublishedDateTime && (
            <p id="dateTime">
              Published on: {formatDateTime(blogData.PublishedDateTime)}
            </p>
          )}
          <hr />
          <h4>Description:</h4>
          <div id="descript">{blogData.Description}</div>
          <hr />
          <h4>Content:</h4>
          {/* <p>{blogData.Content}</p> */}
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{
              __html: blogData.Content,
            }}
          />
          <hr />
          <button onClick={() => navigate("/")}>Back to all blogs</button>
        </li>
      </div>
    </div>
  );
}

export default BlogPost;
