import React, { Component } from 'react'
import "./pure.css"
import { Link } from 'react-router-dom';
// First way to import
import { CircleLoader } from 'react-spinners';
import { Modal, ModalHeader, ModalBody, ModalFooter, Carousel } from 'reactstrap';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import Loader from 'react-loader-spinner'


export default class TaskerCity  extends Component {
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
      cities:[],
      cityVal:'lahore',
      ci:[],
      Nodata:false,
      renderWithdata:false,
      visible:true,
      renderPage:false,
      error:false
    }
 
    
    this.handleIncriment = this.handleIncriment.bind(this)
    this.handleDecriment = this.handleDecriment.bind(this)
 
  }

  

  fetchCityAndCityTasker(){
    const data={
      city:this.state.cityVal,
      page:this.state.pageNum
    }
    console.log(data)
    fetch("https://desolate-hamlet-64216.herokuapp.com/api/getTaskersByCity",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(res => res.json())

    .then(dat => {
      console.log(dat)
      var cit = dat.cities.map(obj=>{
        return obj.city
      })
      if(dat.data.length===0){
        this.setState({
          renderWithdata:false,
          Nodata:true,
          cities:cit,
          visible:false,
          renderPage:true
        
        })
      }
      else{
        this.setState({
          Nodata:false,
          renderWithdata:true,
          customer:dat.data,
          pageNum:dat.pages,
          cities:cit,
          ci:dat.cities,
          visible:false,
          renderPage:true
        })
      }
    
  
    console.log(this.state.ci)
    }).catch((err) => {
     this.setState({
       visible:false,
       error:true
     })
    })
  }
  async componentDidMount() {
    var user = JSON.parse(localStorage.getItem('user'));
    let loginperson = user.Name
    let islogin = user.login

    if (islogin === 1) {
      this.setState({
        LoginName: loginperson
      })
   this.fetchCityAndCityTasker()
    }
     else {
      alert("User Must Login First")
      this.props.history.push("/")
    }
    // fetch("http://localhost:5000/api/getAllcities",
    // {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    // }).then(res => res.json())
    // .then(dat => {
    //  var cit= dat.map((obj)=>{
    //       return obj.city
    //   })
    //  this.setState({
    //     cities:cit
    //  })

    // }).catch(() => {
    //   alert("User Not found")
     
    
    // var user = JSON.parse(localStorage.getItem('user'));
    // let loginperson = user.Name
    // let islogin = user.login

    // if (islogin === 1) {
    //   this.setState({
    //     LoginName: loginperson
    //   })
    //   this.fetchData()
    // }
   

  }
  
  handleIncriment() {
    let Page = this.state.pageNum + 1
    if (Page <= this.state.pages) {
      this.setState({
        loading: true,
        pageNum: Page,
        count: this.state.count + 8
      }, () => {
        this.fetchCityAndCityTasker()
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
        this.fetchCityAndCityTasker()

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
  

  
  handleDecriment(e) {
    let CurrntPage = this.state.pageNum
    if (CurrntPage > 1) {
      let Page = this.state.pageNum - 1
      this.setState({
        loading: true,
        pageNum: Page,

        count: this.state.count - 20
      }, () => {
        this.fetchCityAndCityTasker()

      })
    }
  }

  

  
 
  handleChange(e) {
    this.setState({
     cityVal: e.target.value
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

 
  deleteCity=(e,id,index)=>{
    const ob={
      _id:id
    }
    fetch("https://desolate-hamlet-64216.herokuapp.com/api/deleteCity",
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(ob)
        }).then(res => res.json())
    .then(dat=> {
      console.log(dat)
      var arrae=this.state.ci.filter(obj=>{
          return obj.city!==dat.doc.city
      })
      var arrbae=this.state.cities.filter((city)=>{
                 return city!==dat.doc.city
      })
      //  var arrae=this.state.ci.splice(index,1)
       this.setState({
         ci:arrae,
         cities:arrbae
      })
    }).catch(() => {
      alert("No Deletion")
    })
  }
  toggle=()=>{
    this.setState({
      modal:false
    })
  }
  searchCity(e){
    this.setState({
      cityVal:e.value
    })
    setTimeout(()=>
    this.fetchCityAndCityTasker()
    ,1000)
   
  }
  onAddCity(e){ 
    e.preventDefault()
    if(this.state.cityVal.length>0){
    let data = {
      city:this.state.cityVal.toLowerCase()
    }
       var arr=this.state.cities.filter(cit => {
               return cit ===this.state.cityVal.toLowerCase() 
       })
       if(arr.length===0){
        fetch("https://desolate-hamlet-64216.herokuapp.com/api/addCity",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
            }).then(res => res.json())
        .then(dat=> {
           console.log(dat)
          var arra= this.state.ci
          var arrb= this.state.cities
          arra.push({
            _id:dat.doc._id,
            city:this.state.cityVal
          })
        arrb.push(this.state.cityVal)
  this.setState({
     ci:arra,
     cities:arrb,
    cityVal:''
  })
        }).catch(() => {
          alert("no add")
        })
       }
       else{
         alert('already inserted')
       }
    }
   
    else{
      alert('No City Entered')
    }
  }
   
  render() {
    const options = this.state.cities
    const defaultOption = options[0]
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
    <h3 style={{"color": "white"}}><b>Admin Panel Sookhay Painday</b></h3>
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
  <div style={{"paddingBottom": 50}} className="col-md-3 ">
  <ul className="navbar-nav">
  <li className="nav-item">
    <Link to="/Dashboard"><li className="list-group-item bg-light"><i className="fa fa-tachometer"></i> <b> Dashboard </b></li></Link>
  </li>
  <li className="nav-item">
    <a href="#new1" data-toggle="collapse">
      <li className="list-group-item bg-light "><i className="fa fa-list" aria-hidden="true"></i> <b>Menu</b>  <i style={{"float": "right"}}  className="fas fa-sort-down"></i> </li></a>
    <ul className="collapse"  id="new1" style={{ "listStyle": "none" ,  "fontFamily" :"Comic Sans MS" ,"backgroundColor" : "white" , "color" : "black"  }}>
      <Link to="/TaskerList" className="nav-item">
        <li className=" bg-light">
          <div className="col-md-1"></div> <i className="fa fa-users" aria-hidden="true"></i> Tasker List
    </li>
      </Link>


     
      <Link to="/Earnings" className="nav-item">
        <li className=" bg-light">
          <div className="col-md-1"></div> <i className="fa fa-list-ol" aria-hidden="true"></i>Earnings
</li>
      </Link>
      <Link to="/TaskerCity" className="nav-item">
        <li className=" bg-light">
          <div className="col-md-1"></div> <i className="fa fa-folder" aria-hidden="true"></i>Search By City
</li>
      </Link>
      <Link to="/CustomerList" className="nav-item">
      <li className=" bg-light">
        <div className="col-md-1"></div> <i className="fa fa-bug" aria-hidden="true"></i>Customer List
</li>
    </Link>
    <button className="btn btn-success" onClick={()=>this.setState({
      modal:true
    })}  style={{ "margin": 10 }}> Add a City </button>


    </ul>
  </li>
  {/* <li className="nav-item">
    <a href="#new2" data-toggle="collapse">
      <li className="list-group-item bg-light "><i className="fa fa-list" aria-hidden="true"></i> <b> Mi Consignacion </b> <i style={{"float": "right"}}  className="fas fa-sort-down"></i> </li></a>
    <ul className="collapse" id="new2" style={{ "list-style": "none" ,  "fontFamily" :"Comic Sans MS" ,"backgroundColor" : "white" , "color" : "black"  }}>
      <Link to="/MiUsers" className="nav-item">
        <li className=" bg-light">
          <div className="col-md-1"></div> <i className="fa fa-users" aria-hidden="true"></i> Detalles de usuario
    </li>
      </Link>


      <Link to="/MiSales" className="nav-item">
        <li className=" bg-light">
          <div className="col-md-1"></div> <i className="fa fa-credit-card-alt" aria-hidden="true"></i>  Detalles de venta
    </li>
      </Link>
      <Link to="/MiListings" className="nav-item">
        <li className=" bg-light">
          <div className="col-md-1"></div> <i className="fa fa-list-ol" aria-hidden="true"></i> Listado
</li>
      </Link>
      <Link to="/MiCategory" className="nav-item">
        <li className=" bg-light">
          <div className="col-md-1"></div> <i className="fa fa-folder" aria-hidden="true"></i> Las categorías
</li>
      </Link>
      <Link to="/MiReports" className="nav-item">
      <li className=" bg-light">
        <div className="col-md-1"></div> <i className="fa fa-bug" aria-hidden="true"></i> Informes
</li>
    </Link>
    <Link to="/MiListingReports" className="nav-item">
      <li className=" bg-light">
        <div className="col-md-1"></div> <i className="fas fa-flag" aria-hidden="true"></i>  Listado de informes
</li>
    </Link>

    </ul>
  </li>
  */}


</ul> </div>
    <br />
    <div className="col-md-9">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header"><b>Tasker Search By City</b>   {this.state.Nodata && <p style={{color:'red',fontWeight:'bolder'}}>No Tasker in this city</p>}
</div>
            <div className="card-body">
              <div className="row">


                <div className="card-body">
                 
                   < Dropdown  onChange={(e)=>this.searchCity(e)}  options={this.state.cities} value={this.state.cityVal} placeholder="Select an option" />                     
                   
                </div>
                <br />
           {this.state.pageNum !== 1 ?
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
          </div>:
          <div></div> 
          }
              <br />
{this.state.renderWithdata  &&  
<div style={{ "color": "black", "backgroundColor": "white", "border": "1", "overflow": 'scroll', }} className="table-responsive">

                 
<div><table className="table table-hover">
   <thead>
     <tr>
       <th>S.No</th>
     
       <th>Name</th>
       <th>CNIC No.</th>
       <th>City</th>
       <th>Phone No.</th>    
       <th>Image</th>                         
        <th></th>
     </tr>
   </thead>

   {this.state.customer && <tbody >

     {this.state.customer.length > 0 && this.state.customer.map((user, index) => {

       return (
         <tr key={index}>
           <td>{count + index + 1}</td>
           <td>{user.fName}</td>
           <td>{user.nic}</td>
           <td>{user.city}</td>
           <td>{user.mobile}</td>
           <td><img src={user.profilePic}  style={{width:50,height:50}}></img></td>



        
         </tr>
       )
     }
     )}

   </tbody>}
 </table> </div>
</div>
}
               
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
    <h2 style={{"textAlign": "center", "fontFamily": "Times"}}> <b>Add & Delete City</b></h2>
    </ModalHeader>

    <ModalBody>
    
      <ul >
           {this.state.ci.length > 0 && this.state.ci.map((obj,index)=>{
            return <div style={{display:'flex',justifyContent:'space-around',marginBottom:10}}><li style={{fontSize:20}}>{obj.city}</li><button className="btn btn-danger" onClick={(e)=>this.deleteCity(e,obj._id,index)}> DEL </button>
            </div>
           })}

           </ul>
    </ModalBody>
    <ModalFooter>
    <div className="card-body">
                  <form className="card">
                    <div className="input-group">
                      <input type="search"  value={this.state.cityVal} onChange={(e)=>this.handleChange(e)} className="form-control" placeholder="Add City" />
                      {this.state.searching === true && <div className="input-group-btn">
                        <button style={{ "margin": 5 }} className="btn btn-default"><i className="fas fa-times"></i></button>
                      </div>}
                      <div className="input-group-btn">
                        <button className="btn btn-success" onClick={(e)=>this.onAddCity(e)}> Add </button>
                  
                      </div>
                    </div>
                  </form>
                </div>
    </ModalFooter>

  </Modal>

</div>

}
{this.state.error && <p className="d-flex justify-content-center" style={{marginTop:'20%',marginLeft:'2%'}} >Reload Page Internet Connection Is Slow</p>}
</div>     
    )
  }
}
