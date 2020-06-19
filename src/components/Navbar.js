import React, { Component } from 'react'

export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-md bg-dark navbar-dark">
            <div className="container-fluid">
             <h3 style={{"color": "white"}}><b>Admin Panel</b></h3>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="collapsibleNavbar">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
              
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle"  id="navbardrop" data-toggle="dropdown">
                      {this.props.LoginName}
                    </a>
                    <div className="dropdown-menu">
  
                    <button onClick={this.props.handleLogout()} className="dropdown-item" > <i className="fas fa-sign-out-alt"></i> Logout</button>
  
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        )
    }
}
