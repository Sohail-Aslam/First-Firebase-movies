import './App.css'
import { useEffect, useState } from 'react'
import { Auth } from "./components/auth.jsx"
import { db, auth, storage } from "./config/firebase.js"
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore"
import { ref, uploadBytes } from 'firebase/storage'

function App() {
  const [movieList, setMovieList] = useState([]);

  const [newMovieTtle, setNewMovieTitle] = useState('');
  const [newDate, setNewDate] = useState(0);
  const [newMovieOscar, setNewMovieOscar] = useState(false);
  const [updateTitle, setUpdateTitle] = useState('');
  const [fileUpload, setFileUpload] = useState(null);


  const moviesCollection = collection(db, 'movies');

  const getMovieList = async () => {
    try {
      const data = await getDocs(moviesCollection);
      const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id, }));
      setMovieList(filteredData)
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    const getMovieList = async () => {
      try {
        const data = await getDocs(moviesCollection);
        const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id, }));
        setMovieList(filteredData)
      } catch (err) {
        alert(err);
      }
    }; getMovieList();
  }, [])

  const onSubmitmovie = async () => {
    try {
      await addDoc(moviesCollection, {
        title: newMovieTtle,
        date: newDate,
        receiveAnOscar: newMovieOscar,
        userId: auth?.currentUser?.uid,
      }
      );
    } catch (err) {
      alert(err);
    }
    getMovieList();
  }

  const onDeletemovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
  }

  const updateMovieTitle = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, { title: updateTitle });
  }

  const uploadFile = async () => {
    if (!fileUpload) return;
    const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef, fileUpload);
    } catch (err) {
      alert(err);
    }
  }
  getMovieList();

  return (
    <>
      <Auth />
      <div  className='section'>
        <input className='input'
          placeholder='Movie Name...'
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />

        <input className='input'
          placeholder='Release Date...' type='number'
          onChange={(e) => setNewDate(Number(e.target.value))}
        />

        <input className='input'
          type="checkbox" checked={newMovieOscar}
          onChange={(e) => setNewMovieOscar(e.target.checked)}
        />
        <label>Receive an Oscar</label>

        <button onClick={onSubmitmovie}>Submit</button>

      </div>


      <div className='section'>
        {movieList.map((movies) => (
          <div className='movie-card'>
            <h1 style={{ color: movies.receiveAnOscar ? "green" : "red" }}> {movies.title} </h1>
            <p> Date: {movies.date} </p>

            <button onClick={() => onDeletemovie(movies.id)}>Delete</button>

            <input className='input'
              type="text"
              onChange={(e) => setUpdateTitle(e.target.value)} placeholder='New title...' />

            <button onClick={() => updateMovieTitle(movies.id)}>Update Title</button>

          </div>
        ))}
      </div>

      <div  className='section'>
        <input
          type="file" onChange={(e) => setFileUpload(e.target.files[0])} />
        <button onClick={uploadFile}>Upload File</button>
      </div>
    </>
  );
}

export default App
