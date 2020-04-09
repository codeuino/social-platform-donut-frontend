import React from "react";
import { Button } from '@material-ui/core';
import "./posts.scss";

export default function Posts(props){
  return(
    <div className="posts">
      <h1>Pinned Posts</h1>
      <div className="categories">
        <Button variant="contained" className="btn active">All</Button>
        <span className="space"></span>
        <Button variant="contained" className="btn">Donuts</Button>
        <span className="space"></span>
        <Button variant="contained" className="btn">Events</Button>
        <span className="space"></span>
        <Button variant="contained" className="btn">Projects</Button>
        </div>
    </div>
  )
};