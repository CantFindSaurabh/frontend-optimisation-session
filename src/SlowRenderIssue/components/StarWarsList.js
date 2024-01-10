// StarWarsList.js
import React, { useState } from "react";
import { useStarWars } from "../modules/Module.js";
import "./StarWarsList.css";
import { loremIpsum } from "lorem-ipsum";

const RowCells = ({ post, isRowContentVisible = true }) => {
  return (
    <>
      {" "}
      <td>{isRowContentVisible ? post.title : "-"}</td>
      <td>
        {isRowContentVisible
          ? loremIpsum({
              count: 1,
              units: "sentences",
              sentenceLowerBound: 4,
              sentenceUpperBound: 8,
            })
          : "-"}
      </td>
      <td>
        {isRowContentVisible
          ? loremIpsum({
              count: 1,
              units: "sentences",
              sentenceLowerBound: 4,
              sentenceUpperBound: 8,
            })
          : "-"}
      </td>
      <td>{isRowContentVisible ? <img src={post.thumbnailUrl}></img> : "-"}</td>
      <td>
        {isRowContentVisible ? <img src={post.thumbnailUrl}></img> : null}
      </td>
    </>
  );
};

const Row = ({ post }) => {
  return (
    <tr key={post.id}>
      <RowCells post={post}></RowCells>
    </tr>
  );
};

const StarWarsList = () => {
  const posts = useStarWars();
  console.log({ posts });

  const [toggleRender, setToggleRender] = useState(false);

  const handleReRender = () => {
    // Logic for triggering a re-render (e.g., changing state)
    // This could be a more complex logic based on your requirements
    console.log("Re-render button clicked!");
    setToggleRender((prev) => !prev);
  };

  return (
    <div className="container">
      <h1>Posts</h1>
      <button onClick={handleReRender}>Re-Render List</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>title</th>
            <th>Comment</th>
            <th>Image</th>
            <th>thumbnail</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <Row post={post} key={post.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StarWarsList;
