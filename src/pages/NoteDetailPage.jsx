import React, { useEffect, useState } from "react";
import "./NoteDetailPage.css"
import { BiSolidTrashAlt } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import FormatDate from "../components/FormatDate";
import Modal from "../components/Modal";
import { toast } from "react-toastify";

const NotePage = ({}) => {

  const [note, setNote] = useState({})
  const [open ,setOpen] = useState(false);
  const {slug} = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(import.meta.env.VITE_BACKEND_ENDPOINT_URL+`/notes/${slug}`)
    .then(res => {
      setNote(res.data);
    })
    .catch(err => {
      console.log(err.message);
    })
  },[])


  const deleteNote = () => {
    axios.delete(import.meta.env.VITE_BACKEND_ENDPOINT_URL+`/notes/${slug}/`)
    .then(res => {
      toast.success('Note deleted successfully')
      navigate('/');
    })
    .catch(err => {
      console.log(err.message);
    })
  }


  return (
    <>
    <div className="note-container">
    <h3 className="title">{note.title}</h3>
    <span className="d-flex justify-content-center">
    <p className="note-date font-12 text-muted me-5"> {FormatDate(note.created)}</p>
    <p className="note-date font-12 text-muted me-5">{FormatDate(note.updated)}</p>
    </span>
    <span className="button-group">
      <Link to={`/edit-note/${slug}`}>
        <button className="btn btn-primary"><FiEdit /><span>Edit</span></button>
      </Link>
      <button onClick={() => setOpen(true)} className="btn btn-danger"><BiSolidTrashAlt /><span>Delete</span></button>
    </span>
    <p className="description">
      {note.body}
    </p>



    

  </div>
  {
    open && <Modal deleteNote={deleteNote} handleIsOpen={() => setOpen(false)} />
  }
  </>
  );
};

export default NotePage;