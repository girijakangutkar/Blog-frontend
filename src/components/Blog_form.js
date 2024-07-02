import React, { useState, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Blog_form.css";
import "./quill-custom.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import Quill from "quill";
const Font = Quill.import("formats/font");
Font.whitelist = [
  "Arial",
  "Helvetica",
  "Times-New-Roman",
  "Courier",
  "Verdana",
  "Georgia",
  "Palatino",
  "Trebuchet-MS",
  "Bookman-Old-Style",
  "Comic-San-Ms",
  "Monospace",
  "Impact",
];
Quill.register(Font, true);

function BlogForm() {
  const [blog, setBlog] = useState({
    Title: "",
    Description: "",
    Content: "",
  });
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const handleQuillChange = (value, field) => {
    setBlog({ ...blog, [field]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("image", image);
    for (let key in blog) {
      formData.append(key, blog[key]);
    }

    try {
      const response = await axios.post(
        "https://blog-for-us.onrender.com/get/upload/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      console.error("Error uploading blog:", error);
      setIsLoading(false);
      alert("Failed to upload blog");
    }
  };
  const modules = useMemo(
    () => ({
      toolbar: [
        [
          {
            font: [
              "Arial",
              "Helvetica",
              "Times-New-Roman",
              "Courier",
              "Verdana",
              "Georgia",
              "Palatino",
              "Trebuchet-MS",
              "Bookman-Old-Style",
              "Comic-San-Ms",
              "Monospace",
              "Impact",
            ],
          },
        ],
        [{ size: ["small", false, "large", "huge"] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ script: "sub" }, { script: "super" }],
        [{ align: [] }],
        [{ indent: "-1" }, { indent: "+1" }],
        ["blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link"],
        ["clean"],
      ],
    }),
    []
  );

  const formats = [
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "script",
    "align",
    "list",
    "indent",
    "blockquote",
    "code-block",
    "link",
  ];

  return (
    <>
      <div id="fm">
        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "flex",
              marginBottom: "20px",
              flexDirection: "row",
              gap: "2px",
            }}
          >
            <li id="text">
              <p>Title: </p>
              <input
                type="text"
                name="Title"
                value={blog.Title}
                onChange={handleChange}
                placeholder="Title"
                required
              />
              <br />
              <p>Description: </p>
              <textarea
                name="Description"
                value={blog.Description}
                onChange={handleChange}
                placeholder="Description"
                required
              />
              <br />
              <p>Image: </p>
              <input type="file" onChange={handleImageChange} required />
              <br />
            </li>
            <li id="det">
              <p>Content: </p>
              <ReactQuill
                value={blog.Content}
                onChange={(value) => handleQuillChange(value, "Content")}
                modules={modules}
                formats={formats}
                placeholder="Content"
                theme="snow"
                id="Content"
              />
              <br />
            </li>
          </div>
          <button id="submit" type="submit" disabled={isLoading}>
            {isLoading ? "Uploading..." : "Upload Blog"}
          </button>
        </form>
      </div>
      {isLoading && (
        <div className="overlay">
          <div className="loading-spinner"></div>
          <p>Please wait...</p>
        </div>
      )}
    </>
  );
}

export default BlogForm;
