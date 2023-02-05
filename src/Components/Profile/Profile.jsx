import React from "react";
import "./Profile.css";
import image from "./img.jpg";
export const Profile = ({
  details: { firstName, lastName, email, uniqueID },
  handleDelete,
}) => {
  return (
    <div className="card">
      <img src={image} alt="" />
      <h1>{firstName + " " + lastName}</h1>
      <p className="title">{email}</p>
      <p>
        <button
          onClick={() => {
            handleDelete(uniqueID);
          }}
        >
          DELETE
        </button>
      </p>
    </div>
  );
};
