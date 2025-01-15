import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditNotePage = () => {

  const navigate = useNavigate();
  const {slug} = useParams()
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");
  
  useEffect(() => {
    axios.get(import.meta.env.VITE_BACKEND_ENDPOINT_URL+`/notes/${slug}`)
    .then(res => {
      setTitle(res.data.title)
      setBody(res.data.body)
      setCategory(res.data.category)
    })
    .catch(err => {
      console.log(err.message);
    })
  },[])


  const handleSubmit = async(e) => {
    e.preventDefault()
    if(!title && !body && !category){
      return;
    }
    const newNote = {
      title: title,
      body: body,
      category: category
    }

    await axios.put(import.meta.env.VITE_BACKEND_ENDPOINT_URL+`/notes/${slug}/` , newNote)
    .then(res => {
      toast.success('Note updated successfully')

    })
    .catch(err => {
      console.log(err.message);
    })
    navigate(`/note/${slug}`)

  }

  return (
    <form onSubmit={handleSubmit}>
      <h5>Edit Note</h5>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Title
        </label>
        <input
          type="title"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="Enter note's title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">
          Content
        </label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows={4}
          placeholder="Enter note's content"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
      </div>

      <div className="mb-3">
      <label htmlFor="exampleFormControlTextarea1" className="form-label">
          Note's category
        </label>
      <select onChange={(e) => setCategory(e.target.value)} value={category} className="form-select" aria-label="Default select example" style={{height: "40px"}}>
          <option selected>Pick a category</option>
          <option value="BUSINESS">Business</option>
          <option value="PERSONAL">Personal</option>
          <option value="IMPORTANT">Important</option>
        </select>
      </div>

        


      <button className="btn btn-primary d-flex justify-content-center" style={{width:"100%"}}>Add Note</button>
    </form>
  );
}

export default EditNotePage