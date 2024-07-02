import React from "react";
import BlogForm from "./components/Blog_form";
import BlogDetails from "./components/Blog_view";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
import TopBar from "./components/top";
import BlogPost from "./components/blog_post";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <TopBar />
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<BlogDetails />} />
          <Route path="/details" element={<BlogForm />} />
          <Route path="get/blog/:id" element={<BlogPost />} />
          <Route path="get/upload" element={<BlogForm />} />
          {/* <Route
            path="/"
            element={<h1>Welcome to the Product Management System</h1>}
          /> */}
        </Routes>
      </BrowserRouter>
      {/* <ProductList /> */}
    </div>
  );
}

export default App;
