import React, { Component } from "react";

const Newsitem = (props) => {
  let { title, description, imgUrl, newsUrl, author, publishedAt, source } =
    props;
  return (
    <div>
      <div className="card">
        <img
          src={
            !imgUrl
              ? "https://cdn.britannica.com/06/200006-131-ABB681CF/Leonardo-da-Vinci-Italian-Renaissance-Florence-Engraving-1500.jpg?w=600&q=60"
              : imgUrl
          }
          style={{ height: "200px", wdith: "200px" }}
          className="card-img-top"
          alt="..."
        />

        <div className="card-body">
          <span class="badge badge-info">{source}</span>

          <h5 className="card-title">{title}</h5>

          <p className="card-text">{description}</p>
          <p class="card-text">
            <small class="text-muted">
              By {author ? author : "Unknown"} on {publishedAt}
            </small>
          </p>

          <a href={newsUrl} className="btn btn-sm btn-success">
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default Newsitem;
