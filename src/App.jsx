import React, { useEffect, useState } from "react";
import HomePage from "./pages/HomePage";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AddNotes from "./pages/AddNotePage";
import NotePage from "./pages/NoteDetailPage";
import EditNotePage from "./pages/EditNotePage";
import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [searchText, setSearchText] = useState("");

  const handleFilterText = (val) => {
    setFilterText(val);
  };

  useEffect(() => {

    if(searchText.length < 3) return;
    axios.get(import.meta.env.VITE_BACKEND_ENDPOINT_URL+ `/notes-search/?search=${searchText}`)
    .then(res => {
      setNotes(res.data)
    })
    .catch(err => console.log(err.message))
  }, [searchText])

  const filteredNotes =
    filterText === "BUSINESS"
      ? notes.filter((note) => note.category == "BUSINESS")
      : filterText === "PERSONAL"
      ? notes.filter((note) => note.category == "PERSONAL")
      : filterText === "IMPORTANT"
      ? notes.filter((note) => note.category == "IMPORTANT")
      : notes; 

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_ENDPOINT_URL + "/notes")
      .then((res) => {
        setNotes(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout setSearchText={setSearchText} searchText={searchText} />}>
        <Route
          index
          element={
            <HomePage filterText={filterText} handleFilterText={handleFilterText} notes={filteredNotes} />
          }
        />
        <Route path="/add-note" element={<AddNotes />} />
        <Route path="/note/:slug" element={<NotePage />} />
        <Route path="/edit-note/:slug" element={<EditNotePage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
