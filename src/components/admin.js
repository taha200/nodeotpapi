import React, { Component } from 'react'
import "./admin.css";
import firebase from "firebase";
import { connect } from 'react-redux';
class Admin extends Component {
constructor(props){
  super(props)
  this.state = {
    Email: "",
    pw: "", 
    Uid:'' 
  };
  this.ForgetPass = this.ForgetPass.bind(this);
  this.handleChange = this.handleChange.bind(this);
  this.handleLogin = this.handleLogin.bind(this)
}
componentDidMount(){
  let user = {
    Name: "",
    login: 0
  }
  localStorage.setItem('userr', JSON.stringify(user));
  var fireRef = firebase.database().ref().child('admin')
  fireRef.once('value',(dataSnap)=>{
  this.setState({
    Uid:dataSnap.val()
  })
  })
}
handleChange(e) {
  this.setState({
    [e.target.name]: e.target.value
  });

}
handleLogin(e) {
  e.preventDefault()
  let emal = this.state.Email
  firebase.auth().signInWithEmailAndPassword(this.state.Email, this.state.pw).then((data) => {
   let user={
     Name : emal,
     login: 1
   }
   console.log(data.user.uid)
   console.log(this.state.Uid)
    localStorage.setItem('userr', JSON.stringify(user));
    if(data.user.uid===this.state.Uid)
    this.props.history.push("/Dashboard")
    else{
      alert('You are not a admin')
    }
  }).catch(err => {
   alert(err)
  })

}
ForgetPass(){
  this.props.history.push("/Reset")
}
  render() {
    return (
      <div className="loginform">
         <div id="login">
      
        <div className="container">
            <div  id="login-row" className="row justify-content-center align-items-center">
                <div id="login-column" className="col-md-6">
                    <div  style={{"borderRadius": 25}} id="login-box" className="col-md-12">
                        <form id="login-form" className="form" action="" method="post">
                            <h3 className="text-center text-info">Admin Login</h3>
                            <div className="form-group">
                                <label  className="text-info">Email:</label><br/>
                                <input type="email" value={this.state.Email}
                                onChange={this.handleChange}
                                name="Email"
            
                                autoFocus={true} id="username" className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="text-info">Password:</label><br/>
                                <input type="password" value={this.state.pw}
                                onChange={this.handleChange}
                                name="pw" id="password" className="form-control"/>
                            </div>
                            <div className="form-group">
                            <button onClick={this.handleLogin} className="btn btn-info btn-md"> <i className="fa fa-sign-in" aria-hidden="true"></i> Login</button> <button style={{"float": "right"}} onClick={this.ForgetPass} className="btn btn-outline-danger"> <i class="fas fa-wrench"></i>  Forget Password</button>
                             
                            </div>
                           
                           
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return ({

  })
}
function mapActionsToProps(dispatch) {
  return ({
      
  })
}
export default connect(mapStateToProps,mapActionsToProps)(Admin)
