import { connect } from "react-redux";
import { fetchPost } from "../../actions/post_actions";
import Post from "./Post";

const mapStateToProps = (state) => {
  return {
    currentUser: state.session.user,
    post: state.posts.post,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPost: (fetchId) => dispatch(fetchPost(fetchId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
