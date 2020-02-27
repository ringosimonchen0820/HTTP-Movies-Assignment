import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import MovieUpdate from './Movies/MovieUpdate'
import axios from 'axios'

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [items, setItems] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/movies')
      .then(res => setItems(res.data))
      .catch(error => console.log(error));
  }, []);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };
  
  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" component={MovieList} />
      <Route path='/update-movie/:id' render={props => {
        return  <MovieUpdate {...props} items={items} setItems={setItems}/>;
}}
      />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} />;
        }}
      />
    </>
  );
};

export default App;
