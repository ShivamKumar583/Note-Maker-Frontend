import React, { useState } from "react";
import "./AddNotePage.css"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AddNotes = () => {

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");

  const navigate = useNavigate()
  const newNote = {
    title: title,
    body: body,
    category: category
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    // console.log('Submitted')
    if(!title && !body && !category){
      return;
    }
    
    await axios.post(import.meta.env.VITE_BACKEND_ENDPOINT_URL+ '/notes/' , newNote)
    .then(res => {
      toast.success('A new note added successfully')

    })
    .catch(err => {
      console.log(err.message);
    })
    navigate('/')

  }

  return (
    <form onSubmit={handleSubmit}>
      <h5>Add New Note</h5>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Title
        </label>
        <input
        value={title}
          type="title"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="Enter note's title"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">
          Content
        </label>
        <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
          className="form-control"
          id="exampleFormControlTextarea1"
          rows={4}
          placeholder="Enter note's content"
        ></textarea>
      </div>

      <div className="mb-3">
      <label htmlFor="exampleFormControlTextarea1" className="form-label">
          Note's category
        </label>
      <select value={category} onChange={(e) => setCategory(e.target.value)} className="form-select" aria-label="Default select example" style={{height: "40px"}}>
          <option selected>Pick a category</option>
          <option value="BUSINESS">Business</option>
          <option value="PERSONAL">Personal</option>
          <option value="IMPORTANT">Important</option>
        </select>
      </div>

        


      <button className="btn btn-primary d-flex justify-content-center" style={{width:"100%"}}>Add Note</button>
    </form>
  );
};

export default AddNotes;
 