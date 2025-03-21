import React from 'react';

const Newsitem = (props) => {
  let { title, description, imageUrl, newsUrl, author, date, source } = props;
  const fallbackImage = 'https://picsum.photos/200/300/?blur';

  return (
    <div className="my-3">
      <div className="card">
        <span
          className="position-absolute top-0 translate-middle badge rounded-pill bg-danger"
          style={{ left: '90%', transform: 'translateX(-50%)', zIndex: 1 }}
        >
          {source}
        </span>

        <img
          src={imageUrl}
          className="card-img-top"
          alt="News"
          onError={(e) => (e.target.src = fallbackImage)} // Fallback image logic
        />
        <div className="card-body">
          <h5 className="card-title">{title}... </h5>
          <p className="card-text">{description}...</p>
          <p className="card-text">
            <small className="text-muted">
              By {author ? author : 'Unknown'} on {new Date(date).toGMTString()}
            </small>
          </p>
          <a
            href={newsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm btn-dark"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};
export default Newsitem;
