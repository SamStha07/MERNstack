import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Payments from "./Payments";

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return (
          <div class="preloader-wrapper small active">
            <div class="spinner-layer spinner-green-only">
              <div class="circle-clipper left">
                <div class="circle"></div>
              </div>
              <div class="gap-patch">
                <div class="circle"></div>
              </div>
              <div class="circle-clipper right">
                <div class="circle"></div>
              </div>
            </div>
          </div>
        );
      case false:
        return (
          <li>
            <a href="/auth/google">Login With Google</a>
          </li>
        );
      default:
        return (
          <>
            <li>
              <Payments />
            </li>
            <li>
              <a href="/api/logout">Logout</a>
            </li>
          </>
        );
    }
  }
  render() {
    // console.log(this.props);
    return (
      <nav>
        <div className="nav-wrapper">
          <Link
            to={this.props.auth ? "/surveys" : "/"}
            className="left brand-logo"
          >
            Sam
          </Link>
          <ul id="nav-mobile" className="right">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  // console.log(state);
  return { auth: state.auth };
}

export default connect(mapStateToProps)(Header);
