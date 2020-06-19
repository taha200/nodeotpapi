import React, { Component } from 'react'
import "./pure.css"
// First way to import
import { CircleLoader } from 'react-spinners';
import { Modal, ModalHeader, ModalBody, ModalFooter, Carousel } from 'reactstrap';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import Loader from 'react-loader-spinner'
import Sidebar from './Sidebar'
import { connect } from 'react-redux';
import { setSessionsActions } from "../store/action/action";
import { url,headers } from './constants';

class Subjects  extends Component {
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
      renderPage:false,
      error:false,
      showSubjectModal:false,
      showSubjectUpdateModal:false,
      title:"",
      subjectID:""
    }
    this.handleDelete = this.handleDelete.bind(this)
    this.handleIncriment = this.handleIncriment.bind(this)
    this.handleDecriment = this.handleDecriment.bind(this)
    this.handleChange=this.handleChange.bind(this)
    this.deleteSubject=this.deleteSubject.bind(this)
    this.Check = this.Check.bind(this)
    this.createSubject=this.createSubject.bind(this)
    this.updateSubject=this.updateSubject.bind(this)
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
  deleteSubject(id){
    if(id!==null){
      fetch(url+'/api/deleteSubject'+id,{method:"DELETE",headers:headers})
      .then(res=>res.json())
      .then(data=>{
        if(data.message==='Success'){
          let updatedSubjects = this.state.customer.filter(customer=>{
            return customer._id!==id
          })
          this.setState({
            customer:updatedSubjects
          })
        }else{
          alert("Subject Not Found")
        }
      })
    }else{
      alert('Subject ID must not be null')
    }
  }
  createSubject(){
    const {title}=this.state
    if(title.length===0){
       alert("Title is required")
     }
     else{
       let data = {
         title
       }
       fetch(url+'/api/addSubject',{method:"POST",body:JSON.stringify(data),headers:headers})
       .then(res=>res.json())
       .then(data=>{
         if(data.message==='Success'){
           let subjects = this.state.customer
           subjects.push(data.doc)
           this.setState({
             title:"",
             customer:subjects,
             showSubjectModal:false
           })
 
         }else{
           alert('Error Adding Subject')
         }
       })
     }
  }
  updateSubject(){
    if(this.state.subjectID.length!=0){
      const {title} = this.state
      let data = {
        title,
        id:this.state.subjectID
      }
      let pattern = new RegExp("^[a-zA-Z ]*$")
      let matched = pattern.test(title)
      if(matched===true){
        fetch(url+'/api/updateSubject',{method:"PUT",body:JSON.stringify(data),headers:headers})
        .then(res=>res.json())
        .then(data=>{
          if(data.message==='Success'){
            let updatedSubjects = this.state.customer.map(customer=>{
              if(customer._id===data.doc._id){
                return data.doc
              }else{
                return customer
              }
            })
            this.setState({
              title:"",customer:updatedSubjects,showSubjectUpdateModal:false
            })
          }
          else{
            alert("Subject Update Failed")
          }
        }).catch(err=>alert('Subject Update Failed'))
        
      }
      else{
        alert("Title can not contain special character or number")

      }
    }
    else{
      alert("Invalid Session ID")
    }
  }
  async componentDidMount() {
    var user = JSON.parse(localStorage.getItem('userr'));
    let loginperson = user.Name
    let islogin = user.login

    if (islogin === 1) {
      this.setState({
        LoginName: loginperson
      })
    fetch(url+'/api/getSubjects',
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    }).then(res => res.json())
    .then(dat => {
      if(dat.message==='Success'){
        console.log(dat)
     this.setState({
      visible:false,
      renderPage:true,
      customer:dat.doc
  })
      }
      else{
        alert("failed to fetch subjects")
      }

    }).catch(() => {
     this.setState({
       visible:false,
       error:true
     })     
    })
    // var user = JSON.parse(localStorage.getItem('user'));
    // let loginperson = user.Name
    // let islogin = user.login

    // if (islogin === 1) {
    //   this.setState({
    //     LoginName: loginperson
    //   })
    //   this.fetchData()
    // }
    // else {
    //   alert("User Must Login First")
    //   this.props.history.push("/")
    // }
  }
  else {
    alert("User Must Login First")
    this.props.history.push("/")
  }
  }
  fatchData(){
    fetch("https://desolate-hamlet-64216.herokuapp.com/api/allCustomers"+this.state.pageNum,
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

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
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
          <div className="card-header">
                    <div className='row'>
                        <div className='col-md-4'>
                        <b style={{fontSize:20}}>SUBJECTS</b>
                        </div>
                        <div className='col-md-6'>
                        </div>
                        <div className='col-md-2'>
                          <button onClick={()=>this.setState({showSubjectModal:true})} className='btn btn-primary'>Add Subject</button>
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
                        <th></th>
                        <th></th>
                        <th></th>

                        <th></th>
                      </tr>
                    </thead>

                    {this.state.customer && <tbody >


                      {this.state.customer.length > 0 && this.state.customer.map((user, index) => {

                        return (
                          <tr key={index}>
                            <td>{count + index + 1}</td>
                         
                            <td>{user.title}</td>
                            <td></td>
                            <td></td>
                              <td><button onClick={()=>this.deleteSubject(user._id)} className='btn btn-danger'>Delete</button></td>
                              <td><button onClick={()=>{
                                this.setState({
                                  title:user.title,
                                  showSubjectUpdateModal:true,
                                  subjectID:user._id
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
  <Modal centered toggle={()=>this.setState({showSubjectModal:false})} isOpen={this.state.showSubjectModal} onClose={this.onCloseModal}>
    <br/>
    <br/>
    <div style={{padding:'10px'}}>
          <h2 style={{textAlign:"center"}}>Add Subject</h2>
          <br/>
              <input
              type='text'
              className='form-control'
              placeholder='Subject Title'
              name='title'
              onChange={this.handleChange}
              />
              
        <br/>
        <div className='row'>
            <div className='col-md-7'>

            </div>
            <div className='col-md-3'>
        <button className='btn btn-primary' onClick={this.createSubject} style={{width:100}}>Create</button>
            </div>
            <div className='col-md-2'>

            </div>
        </div>
    </div>
        <br/>
  </Modal>
        <Modal centered toggle={()=>this.setState({showSubjectUpdateModal:false})} isOpen={this.state.showSubjectUpdateModal} onClose={this.onCloseModal}>
    <br/>
    <br/>
          <h2 style={{textAlign:"center"}}>Update Session</h2>
          <br/>
              <input
              type='text'
              className='form-control'
              placeholder='Subject Title'
              name='title'
              value={this.state.title}
              onChange={this.handleChange}
              />
              
        <br/>
        <div className='row'>
            <div className='col-md-7'>

            </div>
            <div className='col-md-3'>
        <button className='btn btn-success' onClick={this.updateSubject} style={{width:100}}>Update</button>
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

export default connect(mapStateToProps,mapActionsToProps)(Subjects)