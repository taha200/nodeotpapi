import React, { Component } from 'react'
import "./pure.css"
import { Link } from 'react-router-dom';
// First way to import
import { CircleLoader } from 'react-spinners';
import { Modal, ModalHeader, ModalBody, ModalFooter, Carousel } from 'reactstrap';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
export default class MiUsers extends Component {
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
      modelActivityData: []
    }
    this.handleActivities = this.handleActivities.bind(this)
    this.handleShippingProfile = this.handleShippingProfile.bind(this)
    this.toggle = this.toggle.bind(this)
    this.viewmodel = this.viewmodel.bind(this)
    this.handleStatus = this.handleStatus.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.deletePAymentInfo = this.deletePAymentInfo.bind(this)
    this.handleIncriment = this.handleIncriment.bind(this)
    this.handleDecriment = this.handleDecriment.bind(this)
    this.deleteActivity = this.deleteActivity.bind(this)
    this.deleteShippngInfo = this.deleteShippngInfo.bind(this)
    this.deletefirebaseUId = this.deletefirebaseUId.bind(this)
    this.Check = this.Check.bind(this)
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
              onClick: () => {}
            }
          ]
        });
      };


  viewmodel(i) {
   
    this.handleShippingProfile(i)

    this.toggle()
  }

async  handleShippingProfile(uid){

  let data = {
    firebaseUID : uid
  }

  fetch("https://powerful-oasis-74577.herokuapp.com/api/getSpacShippings",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(res => res.json())
    .then(dat => {
      let modeldata =dat.data[0]
     this.setState({
      modelShippingData: modeldata
     },()=>{
      
      this.handleActivities(uid)
     })

    }).catch(() => {
      alert("User Not found")
     
    })




  }
  handleActivities(uid){
    
    let data = {
      firebaseUID : uid
    }
   
    fetch("https://powerful-oasis-74577.herokuapp.com/api/getActivity",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }).then(res => res.json())
      .then(dat => {
        
        let modeldata =dat.data[0]
       this.setState({
        modelActivityData: modeldata,
        loading1: false
       },()=>{
      

  
       })
  
      }).catch(() => {
        alert("User Not found")
       
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
      this.fetchData()
    }
    else {
      alert("User Must Login First")
      this.props.history.push("/")
    }

  }
  handleIncriment() {
    let Page = this.state.pageNum + 1
    if (Page <= this.state.pages) {
      this.setState({
        loading: true,
        pageNum: Page,
        count: this.state.count + 20
      }, () => {
        this.fetchData()
      })
    }

  }

  handleChange(e) {
    this.setState({
      searchVal: e.target.value
    })
  }

  async fetchData() {
    let pageNumber = this.state.pageNum
    const response = await fetch("https://powerful-oasis-74577.herokuapp.com/api/getUsers" + pageNumber,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      });
    const json = await response.json();

    this.setState({
      pages: json.pages
    })
    let user = json.data
    this.setState({
      users: user,
      loading: false

    })
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
        this.fetchData()

      })
    }
  }

  deleteShippngInfo(uid) {
    let data = {
      uid: uid
    }
    fetch("https://powerful-oasis-74577.herokuapp.com/api/deleteShippingUID",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }).then(res => res.json())
      .then(data => {
        this.deletefirebaseUId(uid)


      }).catch(() => {
        alert("User Not Deleted")
        this.fetchData()
      })

  }

  deletefirebaseUId(uid) {

    let data = {
      uid: uid
    }
    fetch("https://powerful-oasis-74577.herokuapp.com/api/deleteAdminOrUSer",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }).then(res => res.json())
      .then(data => {
        this.deletePAymentInfo(uid)

      }).catch(() => {
        alert("User Not Deleted")
        this.fetchData()
      })

  }

  deletePAymentInfo(uid) {
    let data = {
      uid: uid
    }
    fetch("https://powerful-oasis-74577.herokuapp.com/api/deletePaymentInfoUID",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }).then(res => res.json())
      .then(data => {
        alert("user deleted")
        this.fetchData()
      }).catch(() => {
        alert("User Not Deleted")
        this.fetchData()
      })

  }

  handleStatus(e, i) {
   
    if (i === "Active") {
      let data = {
        id: e,
        status: "Disable"

      }
      fetch("https://powerful-oasis-74577.herokuapp.com/api/UserStausUpdate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }).then(res => res.json())
        .then(data => {
          this.fetchData()

        }).catch(() => {
          alert("Not update")
        })

    }
    else {
      let data = {
        id: e,
        status: "Active"

      }
      fetch("https://powerful-oasis-74577.herokuapp.com/api/UserStausUpdate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }).then(res => res.json())
        .then(data => {
          this.fetchData()

        }).catch(() => {
          alert("Not update")
        })

    }

  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal,

    }));
  }


  deleteActivity(uid) {
    let data = {
      uid: uid
    }
    fetch("https://powerful-oasis-74577.herokuapp.com/api/deleteActivityUserUID",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }).then(res => res.json())
      .then(data => {
        this.deleteShippngInfo(uid)

      }).catch(() => {
        alert("User Not Deleted")
        this.fetchData()
      })

  }


  async handleDelete(e, uid) {

    this.setState({
      loading: true
    })
    let data = {
      id: e
    }

    fetch("https://powerful-oasis-74577.herokuapp.com/api/deleteUser",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }).then(res => res.json())
      .then(data => {
        this.deleteActivity(uid)

      }).catch(() => {
        alert("User Not Deleted")
        this.fetchData()
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

  async handleSearch(e) {

    e.preventDefault()
    if (this.state.searchVal) {
      this.setState({
        loading: true,
        searching: true
      })
      let Data = {
        name: this.state.searchVal
      }


      await fetch("https://powerful-oasis-74577.herokuapp.com/api/userSearch", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(Data)
      })
        .then(res => res.json())
        .then(data => {

          this.setState({
            loading: false,
            users: data
          });
        })
        .catch(err => console.error(err), () => {
          this.setState({
            loading: false
          })
        });
    }
    else {

    }
  }
  handleClear(e) {
    e.preventDefault()
    this.fetchData()
    this.setState({
      searching: false
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
        {/* navigation */}
        <nav className="navbar navbar-expand-md bg-dark navbar-dark">
          <div className="container-fluid">
            <h3 style={{ "color": "white" }}><b>Admin Panel</b></h3>
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
            <li className="list-group-item bg-light "><i className="fa fa-list" aria-hidden="true"></i> <b> My Consignment </b>  <i style={{"float": "right"}}  className="fas fa-sort-down"></i> </li></a>
          <ul className="collapse"  id="new1" style={{ "listStyle": "none" ,  "fontFamily" :"Comic Sans MS" ,"backgroundColor" : "white" , "color" : "black"  }}>
            <Link to="/MyUsers" className="nav-item">
              <li className=" bg-light">
                <div className="col-md-1"></div> <i className="fa fa-users" aria-hidden="true"></i> User Details
          </li>
            </Link>


            <Link to="/MySales" className="nav-item">
              <li className=" bg-light">
                <div className="col-md-1"></div> <i className="fa fa-credit-card-alt" aria-hidden="true"></i> Sale Details
          </li>
            </Link>
            <Link to="/MyListings" className="nav-item">
              <li className=" bg-light">
                <div className="col-md-1"></div> <i className="fa fa-list-ol" aria-hidden="true"></i> Listing
      </li>
            </Link>
            <Link to="/MyCategory" className="nav-item">
              <li className=" bg-light">
                <div className="col-md-1"></div> <i className="fa fa-folder" aria-hidden="true"></i> Categories
  </li>
            </Link>
            <Link to="/MyReports" className="nav-item">
            <li className=" bg-light">
              <div className="col-md-1"></div> <i className="fa fa-bug" aria-hidden="true"></i> Reports
</li>
          </Link>
          <Link to="/MyListingReports" className="nav-item">
            <li className=" bg-light">
              <div className="col-md-1"></div> <i className="fas fa-flag" aria-hidden="true"></i> Listing Reports
</li>
          </Link>

          </ul>
        </li>
        <li className="nav-item">
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
        <li className="nav-item">
          <a href="#new3" data-toggle="collapse">
            <li className="list-group-item bg-light "><i className="fa fa-list" aria-hidden="true"></i> <b> Pure Artisan</b> <i style={{"float": "right"}}  className="fas fa-sort-down"></i> </li></a>
          <ul className="collapse" id="new3" style={{ "list-style": "none" ,  "fontFamily" :"Comic Sans MS" ,"backgroundColor" : "white" , "color" : "black"  }}>
            <Link to="/PureUsers" className="nav-item">
              <li className=" bg-light">
                <div className="col-md-1"></div> <i className="fa fa-users" aria-hidden="true"></i> User Details
          </li>
            </Link>


            <Link to="/PureSales" className="nav-item">
              <li className=" bg-light">
                <div className="col-md-1"></div> <i className="fa fa-credit-card-alt" aria-hidden="true"></i> Sale Details
          </li>
            </Link>
            <Link to="/PureListings" className="nav-item">
              <li className=" bg-light">
                <div className="col-md-1"></div> <i className="fa fa-list-ol" aria-hidden="true"></i> Listing
      </li>
            </Link>
            <Link to="/PureCategory" className="nav-item">
              <li className=" bg-light">
                <div className="col-md-1"></div> <i className="fa fa-folder" aria-hidden="true"></i> Categories
  </li>
            </Link>
            <Link to="/PureReports" className="nav-item">
            <li className=" bg-light">
              <div className="col-md-1"></div> <i className="fa fa-bug" aria-hidden="true"></i> Reports
</li>
          </Link>
          <Link to="/PureListingReports" className="nav-item">
            <li className=" bg-light">
              <div className="col-md-1"></div> <i className="fas fa-flag" aria-hidden="true"></i> Listing Reports
</li>
          </Link>

          </ul>
        </li>
        <li className="nav-item">
          <a href="#new4" data-toggle="collapse">
            <li className="list-group-item bg-light "><i className="fa fa-list" aria-hidden="true"></i> <b> Puro Artesanal </b> <i style={{"float": "right"}}  className="fas fa-sort-down"></i> </li> </a>
          <ul className="collapse" id="new4" style={{ "list-style": "none" ,  "fontFamily" :"Comic Sans MS" ,"backgroundColor" : "white" , "color" : "black"  }}>
            <Link to="/PureArUsers" className="nav-item">
              <li  className=" bg-light">
                <div className="col-md-1"></div> <i className="fa fa-users" aria-hidden="true"></i> Detalles de usuario
          </li>

            </Link>


            <Link to="/PureArSales" className="nav-item">
              <li className=" bg-light">
                <div className="col-md-1"></div> <i className="fa fa-credit-card-alt" aria-hidden="true"></i> Detalles de venta
          </li>
            </Link>
            <Link to="/PureArListings" className="nav-item">
              <li className=" bg-light">
                <div className="col-md-1"></div> <i className="fa fa-list-ol" aria-hidden="true"></i> Listado
      </li>
            </Link>
            <Link to="/PureArCategory" className="nav-item">
              <li className=" bg-light">
                <div className="col-md-1"></div> <i className="fa fa-folder" aria-hidden="true"></i> Las categorías
  </li>
            </Link>
            <Link to="/PureArReports" className="nav-item">
            <li className=" bg-light">
              <div className="col-md-1"></div> <i className="fa fa-bug" aria-hidden="true"></i> Informes
</li>
          </Link>
          <Link to="/PureArListingReports" className="nav-item">
            <li className=" bg-light">
              <div className="col-md-1"></div> <i className="fas fa-flag" aria-hidden="true"></i> Listado de Informes
</li>
          </Link>

          </ul>
        </li>

      </ul> </div>
          <br />
          <div className="col-md-9">
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header"><b>User Details</b></div>
                  <div className="card-body">
                    <div className="row">


                      <div className="card-body">
                        <form className="card">
                          <div className="input-group">
                            <input type="search" onChange={this.handleChange.bind(this)} value={this.state.searchVal} className="form-control" placeholder="Search User Name" />
                            {this.state.searching === true && <div className="input-group-btn">
                              <button style={{ "margin": 5 }} onClick={this.handleClear.bind(this)} className="btn btn-default"><i className="fas fa-times"></i></button>
                            </div>}
                            <div className="input-group-btn">
                              <button onClick={this.handleSearch.bind(this)} className="btn btn-danger"><i className="fa fa-search"></i> Search </button>
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

                        {this.state.loading &&
                          <div className='sweet-loading'>
                            <CircleLoader
                              css={style}
                              sizeUnit={"px"}
                              size={100}
                              color={'#2fbb9f'}
                              loading={this.state.loading}
                            />
                          </div>}
                        {this.state.loading === false && <div><table className="table table-hover">
                          <thead>
                            <tr>
                              <th>S.No</th>
                              <th>Image</th>
                              <th>Name</th>
                              <th>Email</th>
                              <th>Created Date</th>
                              <th></th>
                            </tr>
                          </thead>

                          {this.state.users && <tbody >


                            {this.state.users.length > 0 && this.state.users.map((user, index) => {

                              return (
                                <tr key={index}>
                                  <td>{count + index + 1}</td>
                                  <td> <img src={user.profilePic} className="img-circle" alt="Profile Picture" /> </td>
                                  <td>{user.fName}</td>
                                  <td>{user.email}</td>
                                  <td>{(new Date(user.createdDate)).toLocaleString()}</td>


                                  <td >
                                    <button style={{ "margin": 5 }} onClick={() => this.handleStatus(user._id, user.status)} className="btn btn-danger" type="submit"> {user.status} </button>
                                    <button style={{ "margin": 5, "fontSize": 30 }} onClick={() => this.Check(user._id, user.firebaseUID)} className="btn btn-link" type="submit"> <i className="fas fa-trash"></i></button>
                                    <button style={{ "margin": 5, "fontSize": 30 }} onClick={() => this.viewmodel(user.firebaseUID)} className="btn btn-link" type="submit"><i className="fas fa-eye"></i></button>

                                  </td>
                                </tr>
                              )
                            }
                            )}

                          </tbody>}
                        </table> </div>}
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

      </div>
    )
  }
}
