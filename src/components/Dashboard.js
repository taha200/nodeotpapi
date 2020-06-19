import React, { Component } from 'react'
import './admin.css'
import { css } from '@emotion/core';
import { url,headers } from '../sookhay painday componet/constants';
import { connect } from 'react-redux';
import { setSessionsActions } from "../store/action/action";
import { Modal as Modall } from 'reactstrap';
import Sidebar from '../sookhay painday componet/Sidebar';
class Dashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading1: true,
      loading2: true,
      loading3: true,
      loading4: true,
      loading: true,
      adminName: "",
      SubEmail: "",
      subPasswrd: "",
      admins: [],
      LoginName: "",
      modal: false,
    
      users: 0,
      categories: 0,
      listings: 0,
      sales: 0,
      best:[],
      lastweekEarning:0,
      totalEarning:0 ,
      totalOrders:0,
      lastWeekOrders:0,
      customer:[],
      showSessionModal:false,
      session:"",
      firebaseUID:"jkbedfoioi23ojdoiwjeoi"

    }
    this.assignSession=this.assignSession.bind(this)

    // this.fetchAdminPass = this.fetchAdminPass.bind(this);
  }
 

  componentDidMount() {
  
   var user = JSON.parse(localStorage.getItem('userr'));
    let loginperson = user.Name
    let islogin = user.login

    if (islogin === 1) {
      this.setState({
        LoginName: loginperson
      })
      let data = {
        firebaseUID:"jkbedfoioi23ojdoiwjeoi"
      }
      fetch(url+'/api/helloAdmin',{ method: "POST",body:JSON.stringify(data),headers:headers})
      .then(res => res.json())
      .then(data=>{
        if(data.message === 'Success'){

          this.setState({
            lastweekEarning:data.doc.users,
            totalEarning:data.doc.lectures,
            totalOrders: data.doc.sessions,
            lastWeekOrders:data.doc.whatsapp,
            customer: data.doc.students
          })
        }else{
          alert("Failed to fetch analytics")
        }
      })
      // this.fetchAdminPass()
      fetch(url+'/api/getSessions')
      .then(res=>res.json())
      .then(data=>{
        if(data.message==='Success'){
          this.props.setSessions(data.doc)
        }
        else{
          alert('Faled to fetch sessions')
        }
      })
    }
    else {
      alert("User Must Login First")
      this.props.history.push("/")
    }

  }
  onCloseModal = () => {
    this.setState({ showSessionModal: false });
  };
  handleLogout() {
    let user = {
      Name: "",
      login: 0
    }
    localStorage.setItem('user', JSON.stringify(user));
    this.props.history.push("/")
  }
 
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
  render() {
    const style = {
      "margin": "auto",
      
      "width": "50%",
    }
     
const override = css`
display: block;
margin: 0 auto;
border-color: red;
`;
let count =0
    return (
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
                  <a className="nav-link dropdown-toggle"  id="navbardrop" data-toggle="dropdown">
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
              <div className="col-md-3">
                <div className="card">
                  <div className="card-header bg-warning">
                    <div className="row">
  
                      <div className="col-md-12" style={{ "color": "blue",alignItems:'center' }}>
                        <div className="text-center" style={{ "fontSize": "2em",color:'white' }}>
{this.state.lastweekEarning}
</div>
                        <div className="text-center" style={{color:'white'}}> Total Students
                         </div>
                         
                      </div>
                    </div>
                  </div>
                
                </div>
              </div>

              <div className="col-md-3">
                <div className="card">
                  <div className="card-header bg-success">
                    <div className="row">
  
                      <div className="col-md-12" style={{ "color": "blue",alignItems:'center' }}>
                        <div className="text-center" style={{ "fontSize": "2em" ,color:'white'}}>
           {this.state.totalEarning}
</div>
                        <div className="text-center" style={{color:'white'}}>Total Sessions
                         </div>
                         
                      </div>
                    </div>
                  </div>
                
                </div>
              </div>

              <div className="col-md-3">
                <div className="card">
                  <div className="card-header bg-primary">
                    <div className="row">
  
                      <div className="col-md-12" style={{ "color": "blue",alignItems:'center' }}>
                        <div className="text-center" style={{ "fontSize": "2em",color:'white' }}>
            {this.state.lastWeekOrders}
</div>
                        <div className="text-center" style={{color:'white'}}>Total Lectures
                         </div>
                         
                      </div>
                    </div>
                  </div>
                
                </div>
              </div>

              <div className="col-md-3">
                <div className="card">
                  <div className="card-header bg-info">
                    <div className="row">
  
                      <div className="col-md-12" style={{ "color": "blue",alignItems:'center' }}>
                        <div className="text-center" style={{ "fontSize": "2em" ,color:'white'}}>
           {this.state.totalOrders}
</div>
                        <div className="text-center" style={{color:'white'}}> WhatsApp Groups
                         </div>
                         
                      </div>
                    </div>
                  </div>
                
                </div>
              </div>
            </div>
          <br />
          <br />
            <div className='row'>
            <div className="col-md-12">
    <div className="card">
      <div className="card-header"><b>New Students</b></div>
      <div className="card-body">
        <div className="row">
          <br />


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
          {this.props.sessions!==[] && this.props.sessions.map((session)=>{
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
    )
  }
}

function mapStateToProps(state) {
  return ({
    sessions: state.rootReducer.sessions
  })
}
function mapActionsToProps(dispatch) {
  return ({
    setSessions:(sessions)=>{
      dispatch(setSessionsActions(sessions))
    }     
  })
}

export default connect(mapStateToProps,mapActionsToProps)(Dashboard)