import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import ReactPaginate from "react-paginate";
import * as postActions from "../../actions/post_actions";

const UserPosts = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const dispatch = useDispatch();
  const { id } = useParams();
  const postsPerPage = 10;
  const pagesVisited = pageNumber * postsPerPage;

  const state = useSelector((state) => state);
  const posts = state.posts.user;
  const { loading } = state.posts;

  const { fetchUserPosts } = bindActionCreators(postActions, dispatch);

  useEffect(() => {
    fetchUserPosts(id);
  }, []);

  const displayPosts = Object.values(posts)
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

  const pageCount = Math.ceil(posts.length / postsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="main-container">
      {loading === true || posts === null ? (
        <div className="no-post-message">Loading...</div>
      ) : Object.values(posts).length === 0 ? (
        <div className="no-post-message">There are no posts...</div>
      ) : (
        <div className="cards">{displayPosts}</div>
      )}
      {Object.values(posts).length === 0 ? (
        ""
      ) : (
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
      )}
    </div>
  );
};

export default UserPosts;
