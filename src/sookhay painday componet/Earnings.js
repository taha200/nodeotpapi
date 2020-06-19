import React, { Component } from 'react'
import "./pure.css"
import { Link } from 'react-router-dom';
// First way to import
import { CircleLoader } from 'react-spinners';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Carousel } from 'reactstrap';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import { url,headers } from "./constants";
import Loader from 'react-loader-spinner'
import { setSessionsActions } from "../store/action/action";

import Sidebar from './Sidebar'
class Sessions  extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pages: 0,
      users: [],
      pageNum: 1,
      userview: {},
      count: 0,
      searchVal: "",
      loading: true,
      loading1: true,
      searching: false,
      modal: false,
      modelShippingData : [],
      modelActivity: [],
      modelActivityData: [],
      customer:[],
      visible:true,
      error:false,
      renderPage:false,
      showSessionModal:false,
      title:"",
      sessionID:"",
      classTime:0,
      showSessionUpdateModal:false,
      timeVal:"",
      oldSessionID:""
    }
 

    this.handleIncriment = this.handleIncriment.bind(this)
    this.handleDecriment = this.handleDecriment.bind(this)
    this.handleChange=this.handleChange.bind(this)
    this.createSession=this.createSession.bind(this)
    this.Check = this.Check.bind(this)
    this.updateSession=this.updateSession.bind(this)
    this.deleteSession=this.deleteSession.bind(this)
  }
  handleChange(e){
    this.setState({
      [e.target.name]:e.target.value
    })
  }
  updateSession(){
    if(this.state.oldSessionID.length>0){
      const {classTime,title,sessionID,oldSessionID} = this.state
      let data = {
        classTime,title,sessionID,oldSessionID
      }
      let pattern = new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$")
      let matched = pattern.test(sessionID)
      if(matched===true){
        fetch(url+'/api/updateSession',{method:"PUT",body:JSON.stringify(data),headers:headers})
        .then(res=>res.json())
        .then(data=>{
          if(data.message==='Success'){
            let updatedSessions = this.props.sessions.map(session=>{
              if(session._id===data.doc._id){
                return data.doc
              }else{
                return session
              }
            })
            this.props.setSessions(updatedSessions)
            this.setState({
              title:"",sessionID:"",classTime:0,timeVal:"",showSessionUpdateModal:false
            })
          }
          else{
            alert("Session Update Failed")
          }
        }).catch(err=>alert('Session Update Failed'))
        
      }
      else{
        alert("Session ID can not contain special character or space and must contain at least one character and one number")

      }
    }
    else{
      alert("Invalid Session ID")
    }
  }
  deleteSession(id){
    if(id!==null){
      fetch(url+'/api/deleteSession'+id,{method:"DELETE",headers:headers})
      .then(res=>res.json())
      .then(data=>{
        if(data.message==='Success'){
          let updatedSessions = this.props.sessions.filter(session=>{
            return session._id!==id
          })
          this.props.setSessions(updatedSessions)
        }else{
          alert("Session Not Found")
        }
      })
    }else{
      alert('Session ID must not be null')
    }
  }
  createSession(){
    const {title,sessionID,classTime}=this.state
   if(sessionID.length===0){
      alert("Session ID is required")
    }
    else if(title.length===0){
      alert('Title is required')
    }
    else{
      let data = {
        title,
        sessionID,
        classTime
      }
      fetch(url+'/api/addSession',{method:"POST",body:JSON.stringify(data),headers:headers})
      .then(res=>res.json())
      .then(data=>{
        if(data.message==='Success'){
          let sessions = this.props.sessions
          sessions.push(data.doc)
          this.props.setSessions(sessions)
          this.setState({
            title:"",
            sessionID:"",
            classTime:0,
            showSessionModal:false
          })

        }else{
          alert('Error Creating Session')
        }
      })
    }
  }
  Check = (e,uid) => {
   
        confirmAlert({
          title: 'Confirm Delete',
          message: 'Are you sure to do this.',
          buttons: [
            {
              label: 'Yes',
              onClick: () => {
               this.handleDelete(e,uid)
              }
            },
            {
              label: 'No',
              onClick: () => console.log("nothing happend")
            }
          ]
        });
      };


 

  
  async componentDidMount() {
    var user = JSON.parse(localStorage.getItem('userr'));
    let loginperson = user.Name
    let islogin = user.login

    if (islogin === 1) {
      this.setState({
        LoginName: loginperson
      })
    fetch("https://desolate-hamlet-64216.herokuapp.com/api/getAllEarnings"+this.state.pageNum,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    }).then(res => res.json())
    .then(dat => {
     console.log(dat)
     this.setState({
         customer:dat.docs,
         pages:dat.pages,
         visible:false,
         renderPage:true
     })

    }).catch(() => {
this.setState({
  visible:false,
  error:true
})     
    })
  }
  else {
    alert("User Must Login First")
    this.props.history.push("/")
  }
  }
  fatchData(){
    fetch("https://desolate-hamlet-64216.herokuapp.com/api/getAllEarnings"+this.state.pageNum,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    }).then(res => res.json())
    .then(dat => {
     console.log(dat)
     this.setState({
         customer:dat.docs
     })

    }).catch(() => {
      alert("User Not found")
     
    })
  }
  handleIncriment() {
    let Page = this.state.pageNum + 1
    if (Page <= this.state.pages) {
      this.setState({
        loading: true,
        pageNum: Page,
        count: this.state.count + 20
      }, () => {
        this.fatchData()
      })
    }

  }

  handleDecriment(e) {
    let CurrntPage = this.state.pageNum
    if (CurrntPage > 1) {
      let Page = this.state.pageNum - 1
      this.setState({
        loading: true,
        pageNum: Page,

        count: this.state.count - 8
      }, () => {
        this.fatchData()

      })
    }
  }
  handleLogout() {
    let user = {
      Name: "",
      login: 0
    }
    localStorage.setItem('user', JSON.stringify(user));
    this.props.history.push("/")
  }

  blockUser(e,uid){
    const data={
      firebaseUID:uid
    }
    fetch("https://desolate-hamlet-64216.herokuapp.com/api/blockUser",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
        }).then(res => res.json())
    .then(data => {
      this.fatchData()
    
    }).catch(() => {
      alert("User Not Deleted")
      this.fatchData()
    })
  }
  unblockUser(e,uid){
    const data={
      firebaseUID:uid
    }
    fetch("https://desolate-hamlet-64216.herokuapp.com/api/unblockUser",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
        }).then(res => res.json())
    .then(data => {
      this.fatchData()
    
    }).catch(() => {
      alert("User Not Deleted")
      this.fatchData()
    })
  }
onSearchUser(e){
  e.preventDefault()
   const data={
   name:this.state.searchVal
 }
  fetch("https://desolate-hamlet-64216.herokuapp.com/api/searchUsers",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body:JSON.stringify(data)
  }).then(res => res.json())
  .then(dat => {
    if(dat.length>0){
     console.log(dat)
       this.setState({
         customer:dat,
         searchVal:''
       })
      }
      else{
        alert("User Not found")
        this.setState({
          searchVal:''
        })
}
  }).catch(() => {
    alert("User Not found")
   
  })
}

  render() {
    const { count } = this.state;
    const style = {
      "margin": "auto",
      "width": "50%"
    }
    return (
      <div>
      {this.state.visible && <div className="d-flex justify-content-center" style={{marginTop:'20%',marginLeft:'2%'}}>
      <Loader
type="Rings"
color="white"
height="100"
width="100"
/>
</div>}
{this.state.renderPage && 
  <div>
        {/* navigation */}
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
                  <a className="nav-link dropdown-toggle" id="navbardrop" data-toggle="dropdown">
                    {this.state.LoginName}
                  </a>
                  <div className="dropdown-menu">

                    <button onClick={this.handleLogout.bind(this)} className="dropdown-item" > <i className="fas fa-sign-out-alt"></i> Logout</button>

                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <br />
        <div className="container-fluid row">
          <Sidebar/>
         <br />
          <div className="col-md-9">
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <div className='row'>
                        <div className='col-md-4'>
                        <b style={{fontSize:20}}>SESSIONS</b>
                        </div>
                        <div className='col-md-6'>
                        </div>
                        <div className='col-md-2'>
                          <button onClick={()=>this.setState({showSessionModal:true})} className='btn btn-primary'>Add Session</button>
                        </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <br />


                      <div style={{ "color": "black", "backgroundColor": "white", "border": "1", "overflow": 'scroll', }} className="table-responsive">

                        
                      
                <div><table className="table table-hover">
                          <thead>
                            <tr>
                              <th>S.No</th>
                              <th>Title</th>
                              <th>Class Time</th>
                              <th>Session ID</th>
                              <th>Lectures</th>
                              <th></th>
                              <th></th>
                            </tr>
                          </thead>

                          {this.props.sessions && <tbody >


                            {this.props.sessions.length > 0 && this.props.sessions.map((user, index) => {
                              let time = ''
                              if(user.classTime>12){
                                time = user.classTime-12
                                time+=' p.m'
                              }
                              else{
                                time=user.classTime
                                time+=' a.m'
                              }
                              return (
                                <tr key={index}>
                                  <td>{count + index + 1}</td>
                                  <td>{user.title}</td>
                                  <td>{time}</td>
                                  <td>{user.sessionID}</td>
                              <td>{user.lectures.length}</td> 
                              <td><button onClick={()=>this.deleteSession(user._id)} className='btn btn-danger'>Delete</button></td>
                              <td><button onClick={()=>{
                                let time = user.classTime
                                time+=':00'
                                this.setState({
                                  title:user.title,
                                  sessionID:user.sessionID,
                                  timeVal:time,
                                  classTime:user.classTime,
                                  oldSessionID:user.sessionID,
                                  showSessionUpdateModal:true
                                })
                              }} className='btn btn-info'>Update</button></td>
                                </tr>
                              )
                            }
                            )}
                          </tbody>}
                        </table> </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
        <div>

        </div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>
          <h2 style={{"textAlign": "center", "fontFamily": "Times"}}> <b>User Information</b></h2>
          </ModalHeader>

          <ModalBody style={{ "fontFamily": "monospace" }}>
            {this.state.loading1 &&
              <div className='sweet-loading'>
                <CircleLoader
                  css={style}
                  sizeUnit={"px"}
                  size={100}
                  color={'#2fbb9f'}
                  loading={this.state.loading1}
                />
              </div>}
            {this.state.loading1 === false && <div >
              <h2 style={{"textAlign": "center", "fontFamily": "Allerta"}}>Shipping Info</h2>
              <h3>Tittle : {this.state.modelShippingData.title}</h3>       
              <h4>Domestic Service : {this.state.modelShippingData.domesticService}</h4>       
              <h4>International Service : {this.state.modelShippingData.internationalService}</h4>       
              <p>Description : {this.state.modelShippingData.description}</p>

              <hr/>

              <h2 style={{"textAlign": "center", "fontFamily": "Allerta"}}>Activity Info</h2>    
              <h4>On Sale Items : {this.state.modelActivityData.onSale.length}</h4>       
              <h4>Total Orders : {this.state.modelActivityData.Orders.length}</h4>       
             <h4> Favorites : {this.state.modelActivityData.Favorites.length}</h4>
            </div>}
          </ModalBody>
          <ModalFooter>

          </ModalFooter>

        </Modal>
        <Modal centered toggle={()=>this.setState({showSessionModal:false})} isOpen={this.state.showSessionModal} onClose={this.onCloseModal}>
    <br/>
    <br/>
          <h2 style={{textAlign:"center"}}>Add Session ID</h2>
          <br/>
          <div style={{padding:"10px"}}>
              <input
              type='text'
              className='form-control'
              placeholder='Session Title'
              name='title'
              onChange={this.handleChange}
              />
              <br/>
              <input
              type='text'
              className='form-control'
              placeholder='Session ID'
              name='sessionID'
              onChange={this.handleChange}
              />
              <br/>
              <p>Class Time:</p>

              <input
              type='time'
              placeholder='Class Time'
              className='form-control'
              onBlur={(e)=>{
                const time = e.target.value.split(':')
                this.setState({
                  classTime:time[0]
                })
              }}

              />
          <br/>
          <div className='row'>
              <div className='col-md-7'>

              </div>
              <div className='col-md-3'>
          <button className='btn btn-primary' onClick={this.createSession} style={{width:100}}>Create</button>
              </div>
              <div className='col-md-2'>

              </div>
          </div>
        </div>
        <br/>
        </Modal>
        <Modal centered toggle={()=>this.setState({showSessionUpdateModal:false})} isOpen={this.state.showSessionUpdateModal} onClose={this.onCloseModal}>
    <br/>
    <br/>
          <h2 style={{textAlign:"center"}}>Update Session</h2>
          <br/>
              <input
              type='text'
              className='form-control'
              placeholder='Session Title'
              name='title'
              value={this.state.title}
              onChange={this.handleChange}
              />
              <br/>
              <input
              type='text'
              className='form-control'
              placeholder='Session ID'
              value={this.state.sessionID}
              name='sessionID'
              onChange={this.handleChange}
              />
              <br/>
              <p>Class Time:</p>

              <input
              type='time'
              placeholder='Class Time'
              value={this.state.timeVal}
              className='form-control'
              onChange={(e)=>{
                this.setState({
                  timeVal:e.target.value
                })
              }}
              onBlur={(e)=>{
                const time = e.target.value.split(':')
                this.setState({
                  classTime:time[0]
                })
              }}

              />
        <br/>
        <div className='row'>
            <div className='col-md-7'>

            </div>
            <div className='col-md-3'>
        <button className='btn btn-success' onClick={this.updateSession} style={{width:100}}>Update</button>
            </div>
            <div className='col-md-2'>

            </div>
        </div>
        <br/>
        </Modal>
      </div>
}
{this.state.error && <p className="d-flex justify-content-center" style={{marginTop:'20%',marginLeft:'2%'}} >Reload Page Internet Connection Is Slow</p>}
</div>
    
    )
  }
}

function mapStateToProps(state) {
  return ({
    sessions:state.rootReducer.sessions
  })
}
function mapActionsToProps(dispatch) {
  return ({
    setSessions:(sessions)=>{
      dispatch(setSessionsActions(sessions))
    }    
  })
}

export default connect(mapStateToProps,mapActionsToProps)(Sessions)