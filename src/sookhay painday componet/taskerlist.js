import React, { Component } from 'react'
import "./pure.css"
import { Link } from 'react-router-dom';
// First way to import
import { CircleLoader } from 'react-spinners';
import { connect } from 'react-redux';
import { setSessionsActions } from "../store/action/action";
import { Modal as Modall, ModalHeader, ModalBody, ModalFooter,Input} from 'reactstrap';

import Modal from 'react-responsive-modal';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import { url,headers } from "./constants";
import Sidebar from './Sidebar'
import Loader from 'react-loader-spinner'
class Students  extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pages: 1,
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
      renderPage:false,
      visible:true,
      showSessionModal:false,
      session:this.props.sessions.length>0?this.props.sessions[0]:"",
      firebaseUID:""
    }
 
    
   
    this.handleDelete = this.handleDelete.bind(this)
    this.handleIncriment = this.handleIncriment.bind(this)
    this.handleDecriment = this.handleDecriment.bind(this)
    this.Check = this.Check.bind(this)
    this.assignSession=this.assignSession.bind(this)
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
    
    fetch(url+"/api/allUsers"+this.state.pageNum,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    }).then(res => res.json())
    .then(dat => {
     console.log(dat)
     this.setState({
      visible:false,
      renderPage:true, 
     })
     if(dat.message==='Success'){
       this.setState({
         customer:dat.doc.data
       })
     }
     console.log(this.props.sessions)

    }).catch(() => {
      // alert("User Not found")
     
    })
   
  }
    // var user = JSON.parse(localStorage.getItem('user'));
    // let loginperson = user.Name
    // let islogin = user.login

    // if (islogin === 1) {
    //   this.setState({
    //     LoginName: loginperson
    //   })
    //   this.fetchData()
    // }
    else {
      alert("User Must Login First")
      this.props.history.push("/")
    }

  }
  fatchData(){
    fetch("https://desolate-hamlet-64216.herokuapp.com/api/allTaskers"+this.state.pageNum,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
     
    }).then(res => res.json())
    .then(dat => {
     
        this.setState({
            customer:dat.data
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
        count: this.state.count + 8
      }, () => {
      
        this.fatchData()
        console.log(this.state.customer)
      })
    }

  }
  handleChange(e) {
    this.setState({
      searchVal: e.target.value
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


  async handleDelete(e, uid) {
console.log(uid)
   
    let data = {
      firebaseUID: uid
    }

    fetch("https://desolate-hamlet-64216.herokuapp.com/api/deleteUser",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
          }).then(res => res.json())
      .then(data => {
          console.log(data.doc)
        const cust=this.state.customer.filter(user=>{
            console.log(user)
              return user.firebaseUID !== data.doc.firebaseUID
        
          })
         this.setState({
             customer:cust
         })
      }).catch(() => {
        alert("User Not Deleted")
        this.fatchData()
      })
  }


  handleLogout() {
    let user = {
      Name: "",
      login: 0
    }
    localStorage.setItem('user', JSON.stringify(user));
    this.props.history.push("/")
  }
  onCloseModal = () => {
    this.setState({ showSessionModal: false });
  };
  assignSession(){
      if(this.state.session!==''){
        if(this.state.firebaseUID!==''){
          let data = {
            sessionID:this.state.session,
            firebaseUID:this.state.firebaseUID
          }
          fetch(url+'/api/assignSession',{method:"PUT",body:JSON.stringify(data),headers:headers})
          .then(res=>res.json())
          .then(data=>{
            if(data.message==='Success'){
              let user = data.doc
              let updatedUsers = this.state.customer.map((customer)=>{
                if(customer._id===user._id){
                  return user
                }
                else{
                  return customer
                }
              })
              this.setState({
                customer:updatedUsers,
                showSessionModal:false
              })
            }else{
              alert("Can't Assign Session ID")
            }
          }).catch(err=>alert("Can't Assign Session ID"))
        }
        else{
          alert("User not found")
        }
      }else{
        alert("You must select a session")
      }
  }
  getOrders(id){
    fetch("http://localhost:5000/api/getOrdersByTasker"+id,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
     
    }).then(res => res.json())
    .then(dat => {
    console.log(dat)
    }).catch(() => {
      alert("User Not found")
     
    })
  }

  render() {
    const { count } = this.state;
    const style = {
      "margin": "auto",
      "width": "50%",


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
      <div className="card-header"><b>All Students</b></div>
      <div className="card-body">
        <div className="row">


          <div className="card-body">
            <form className="card">
              <div className="input-group">
                <input type="search"  value={this.state.searchVal} onChange={(e)=>this.handleChange(e)} className="form-control" placeholder="Search User Name" />
                {this.state.searching === true && <div className="input-group-btn">
                  <button style={{ "margin": 5 }} className="btn btn-default"><i className="fas fa-times"></i></button>
                </div>}
                <div className="input-group-btn">
                  <button className="btn btn-danger" onClick={(e)=>this.onSearchUser(e)}><i className="fa fa-search"></i> Search </button>
            
                </div>
              </div>
            </form>
          </div>
          <br />

          <div className="container">
            {this.state.searching === false && <div className="row">
              <div className="col-sm">
                <button style={{ "float": "left", "marginRight": 20 }} onClick={this.handleDecriment} type="button" className="btn btn-primary"> <i className="fa fa-angle-double-left" aria-hidden="true">  Previous </i> </button>
              </div>
              <div className="col-sm">
                <p style={{ "textAlign": "center" }}>   Page : {this.state.pageNum} / {this.state.pages} </p>
              </div>
              <div className="col-sm">
                <button style={{ "float": "right" }} onClick={this.handleIncriment} type="button" className="btn btn-primary"> Next <i className="fa fa-angle-double-right" aria-hidden="true"></i></button>
              </div>





            </div>
            }
          </div>


          <div style={{ "color": "black", "backgroundColor": "white", "border": "1", "overflow": 'scroll', }} className="table-responsive">

            
          
    <div><table className="table table-hover">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Gender</th>
                  <th>Verified</th>
                  <th>Session ID</th>
                  <th></th>
                </tr>
              </thead>

              {this.state.customer && <tbody >


                {this.state.customer.length > 0 && this.state.customer.map((user, index) => {

                  return (
                    <tr key={index}>
                      <td>{count + index + 1}</td>
                   
                      <td>{user.fName +" " +user.lName}</td>
                      <td>{user.email}</td>
                      <td>{user.gender===true?"Male":"Female"}</td>
                      <td>{user.isVerified===true?"Yes":"No"}</td>
                        <td>{user.isVerified===true?user.sessionID:" - "}</td>


                      <td >
                      {user.isVerified===false ?                       <button className="btn btn-success"   style={{ "margin": 10 }} onClick={()=>{
                        this.setState({showSessionModal:true,firebaseUID:user.firebaseUID})
                      }} > Assign Session </button>:<button disabled className="btn btn-success disabled"  style={{ "margin": 10 }} > Assign Session </button>}

                        <button style={{ "margin": 5, "fontSize": 30 }} onClick={() => this.Check(index, user.firebaseUID)} className="btn btn-link" type="submit"> <i className="fas fa-trash"></i></button>

                      </td>
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
  <Modall isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
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

  </Modall>
  
  <Modall centered toggle={()=>this.setState({showSessionModal:false})} isOpen={this.state.showSessionModal} onClose={this.onCloseModal}>
    <br/>
    <br/>
          <h2 style={{textAlign:"center"}}>Asssign Session ID</h2>
          <br/>
          <h4>Select Session ID</h4>
          <select onChange={e=>{
            this.setState({
              session:e.target.value
            })
          }} type="select" name="select" id="exampleSelect">
          {this.props.sessions.length>0 && this.props.sessions.map((session)=>{
            return <option value={session.sessionID}>
                    {session.sessionID}
                  </option>
          })}
        </select>

        <br/>
        <div className='row'>
            <div className='col-md-7'>

            </div>
            <div className='col-md-3'>
        <button className='btn btn-success btn-sm pull-right' onClick={this.assignSession} style={{width:100}}>Assign</button>
            </div>
            <div className='col-md-2'>

            </div>
        </div>
        <br/>
        </Modall>
</div>

}
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

export default connect(mapStateToProps,mapActionsToProps)(Students)