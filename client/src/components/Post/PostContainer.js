import { connect } from "react-redux";
import { fetchPost } from "../../actions/post_actions";
import { composeComment } from "../../actions/post_actions";
import Post from "./Post";

const mapStateToProps = (state) => {
  return {
    currentUser: state.session.user,
    post: state.posts.post,
    comment: state.posts.comment,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPost: (fetchId) => dispatch(fetchPost(fetchId)),
    composeComment: (postId, comment) =>
      dispatch(composeComment(postId, comment)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
