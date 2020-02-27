import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import { useParams } from 'react-router-dom';
import MovieStars from "./movieStars";

const initialItem = {
    title:'',
    director: '',
    metascore:'',
   stars: []
}

 const MovieUpdate = (props) => {
  const [item, setItem] = useState(initialItem)
    const { id } = useParams();

  const handleChange = e => {
      e.persist()
    setItem({...item,[e.target.name]: e.target.value});
  };

const handleStars = e => {
    setItem({
        ...item,
        stars: [e.target.value]
    })
}

  useEffect(() => {
      console.log('useEffect props', props.items)
    const itemToUpdate = props.items.find(thing => `${thing.id}` === id);
console.log('this is itemtoUpdate', itemToUpdate)


    if (itemToUpdate) {
      setItem(itemToUpdate);
    }
    console.log('this is item state after',itemToUpdate)
  }, [props.items, id]);

  const handleSubmit = e => {
    e.preventDefault();
    // make a PUT request to edit the item
    axios
      .put(`http://localhost:5000/api/movies/${id}`, item)
      .then(res => {
        // res.data is the FULL array with the updated item
        // That's not always the case. Sometimes you need to build your
        // own updated array
        console.log('this is res from put',res)
        props.history.push(`/movies/${id}`);
      })
      .catch(err => console.log(err));
  };
  
      console.log(props.items)
    return (
       <div>
        <h2>Update Item</h2>
  
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            onChange={handleChange}
            placeholder="Title"
            value={item.title}
          />
          <div className="baseline" />
  
          <input
            type="text"
            name="director"
            onChange={handleChange}
            placeholder="Director"
            value={item.director}
          />
          <div className="baseline" />
  
          <input
            type="number"
            name="metascore"
            onChange={handleChange}
            placeholder="Metascore"
            value={item.metascore}
          />
          <div className="baseline" />
  
         <MovieStars item={item.stars} handleStars={handleStars}/>

          <div className="baseline" />
  
          <button className="md-button form-button">Update</button>
        </form>
      </div>
  
    );
}

export default MovieUpdate