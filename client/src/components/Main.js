import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import ReactPaginate from "react-paginate";
import * as postActions from "../actions/post_actions";

const Main = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const dispatch = useDispatch();
  const postsPerPage = 10;
  const pagesVisited = pageNumber * postsPerPage;

  const state = useSelector((state) => state);
  const { newPosts, all } = state.posts;

  const { fetchPosts } = bindActionCreators(postActions, dispatch);

  useEffect(() => {
    fetchPosts();
  }, [newPosts]);

  const displayPosts = Object.values(all)
    .slice(pagesVisited, pagesVisited + postsPerPage)
    .map((value, index) => {
      return (
        <div className="card-container" key={index}>
          <Link to={`/post/${value._id}`} className="card-link">
            <p className="card-title">{value.title}</p>
            <p className="card-author">Author: {value.author.username}</p>
            <p className="card-date">
              {moment(value.date).format("MMMM Do YYYY")}
            </p>
          </Link>
        </div>
      );
    });

  const pageCount = Math.ceil(all.length / postsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="main-container">
      {Object.values(all).length === 0 ? (
        <div className="no-post-message">There are no Posts</div>
      ) : (
        <div className="cards">{displayPosts}</div>
      )}
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"pagination-btn"}
        previousLinkClassName={"previous-btn"}
        nextLinkClassName={"next-btn"}
        disabledClassName={"pagination-disabled"}
        activeClassName={"pagination-active"}
      />
    </div>
  );
};

export default Main;
