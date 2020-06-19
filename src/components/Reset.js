import React, { Component } from 'react'
import './reset.css';
import firebase from "firebase";
export default class Reset extends Component {
  constructor(props){
    super(props)
    this.state={
      email: ""
    }
    this.PasswordReset = this.PasswordReset.bind(this)
    this.handleEmail = this.handleEmail.bind(this)
  }

PasswordReset(){
    var auth = firebase.auth();
var emailAddress = this.state.email;

auth.sendPasswordResetEmail(emailAddress).then(()=>{
  alert("Check your Mail inbox")
  this.props.history.push("/")
}).catch((error)=>{
  // An error happened.\
  this.props.history.push("/Reset")
  alert(error)
});


  }
  handleEmail(e){
    this.setState({
      email: e.target.value
    })
  

  }
    render() {
        return (
            <div>
            <div className="form-gap"></div>
            <div className="container">
                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        <div className="panel panel-default">
                          <div className="panel-body">
                            <div className="text-center">
                              <h3><i  className="fa fa-lock fa-4x"></i></h3>
                              <h2 className="text-center">Forgot Password?</h2>
                              <p ><b>You can reset your password by email.</b></p>
                              <div className="panel-body">
                
                                <form id="register-form" role="form" autocomplete="off" onSubmit={(e)=>{
                                    e.preventDefault()
                                    this.PasswordReset()
                                }} className="form">
                
                                  <div className="form-group">
                                    <div className="input-group">
                                      <span className="input-group-addon"><i className="far fa-envelope"></i></span>
                                      <input id="email" name="email" onChange={this.handleEmail} placeholder="email address" className="form-control"  type="email"/>
                                    </div>
                                  </div>
                                  <div className="form-group">
                                    <input name="recover-submit" onClick={this.PasswordReset}  className="btn btn-lg btn-primary btn-block" value="Send Email" type="submit"/>
                                  </div>
                                  
                                  <input type="hidden" className="hide" name="token" id="token" value=""/> 
                                </form>
                
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                </div>
            </div>
            </div>
        )
    }
}
