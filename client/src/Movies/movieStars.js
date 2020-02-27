import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import { useParams } from 'react-router-dom';


 const MovieStars = (props) => {

      console.log('this is movieStars', props)
    return (
       <div>
          {props.item.map(star =>
          <input
            type="text"
            name="stars"
            placeholder={star}
            onChange={props.handleStars}
            value={props.item.stars}
          />
          )}
      </div>
  
    );
}

export default MovieStars