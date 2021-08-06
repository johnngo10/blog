import { connect } from "react-redux";
import { logout } from "../actions/session_actions";

import Header from "./Header";

const mapStateToProps = (state) => ({
  loggedIn: state.session.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Header);
