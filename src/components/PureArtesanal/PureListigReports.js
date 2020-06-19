import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import "./pure.css";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
// import Modal from "react-responsive-modal";
// import {   ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
// First way to import
import { CircleLoader } from 'react-spinners';
import { Dropdown, } from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel'
import Popup from 'reactjs-popup'
export default class PureListingReports extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searching: false,
      searching2: false,
      modelObj: {},
      LoginName: "",
      Listings: [],
      modelData: {},
      pageNum: 1,
      lgShow: false,
      days: "0",
      trade: false,
      shipping: false,
      loading: true,
      modal: false,
      pages: 0,
      searchVal: "",
      isSearching: false,
    }
    this.handleDeleteUser = this.handleDeleteUser.bind(this)
    this.handleModel = this.handleModel.bind(this)
    this.toggle = this.toggle.bind(this);
    this.handleDelete = this.handleDelete.bind(this)
    this.fetchData = this.fetchData.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.deleteActivity = this.deleteActivity.bind(this)
    this.deletePAymentInfo = this.deletePAymentInfo.bind(this)
    this.deletefirebaseUId = this.deletefirebaseUId.bind(this)
    this.Check = this.Check.bind(this)
    this.Check1 = this.Check1.bind(this)
    this.Check3 = this.Check3.bind(this)
    this.DeletReport = this.DeletReport.bind(this)
    this.DeleteUser = this.DeleteUser.bind(this)
    this.SetStatus = this.SetStatus.bind(this)
    this.listingDelete = this.listingDelete.bind(this)
    this.SetStatuss = this.SetStatuss.bind(this)
  }
  Check1 = (e, id) => {

    confirmAlert({
      title: 'Confirm Delete',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            this.handleDelete(e, id)
          }
        },
        {
          label: 'No',
          onClick: () => console.log("nothing happend")
        }
      ]
    });
  };
  Check = (e, i) => {
   
    confirmAlert({
      title: 'Confirm Delete',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            this.DeletReport(e, i)

          }
        },
        {
          label: 'No',
          onClick: () => console.log("nothing happend")
        }
      ]
    });
  };

  Check3 = (uid, listingId ,i) => {

    confirmAlert({
      title: 'Confirm Delete',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            this.DeleteUser(uid, listingId ,i)

          }
        },
        {
          label: 'No',
          onClick: () => console.log("nothing happend")
        }
      ]
    });
  };
  listingDelete(Lid ,i) {
    
    let data = {
      id: Lid
    }

    fetch("https://artisanbackend.herokuapp.com/api/DeleteAllListings",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }).then(res => res.json())
      .then(data => {
       alert("User and Listings Deleted")
        this.SetStatuss(i)
      }).catch(() => {
        alert("User Not Deleted")
        this.fetchData()
      })

  }
 async SetStatuss(i){
    let Data = {
      id: i,
      Action: "2"
    }

    await fetch("https://artisanbackend.herokuapp.com/api/UpdateReportStatus", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(Data)
    })
      .then(res => res.json())
      .then(data => {
        this.fetchData()

      })
      .catch(err => console.error(err));
  }


  DeleteUser(uid, Lid ,i) {
   
    this.handleDeleteUser(uid, Lid ,i)
  }



  // Chain Functionality


  async handleDeleteUser(uid, Lid ,i) {


    let data = {
      uid: uid
    }

    fetch("https://artisanbackend.herokuapp.com/api/deleteListingsUser",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }).then(res => res.json())
      .then(data => {
        this.deleteActivity(uid, Lid ,i)

      }).catch(() => {
        alert("User Not Deleted")
        this.fetchData()
      })
  }


  deleteActivity(uid, Lid ,i) {
    let data = {
      uid: uid
    }
    fetch("https://artisanbackend.herokuapp.com/api/deleteActivityUserUID",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }).then(res => res.json())
      .then(data => {
        this.deleteShippngInfo(uid, Lid ,i)

      }).catch(() => {
        alert("User Not Deleted")
        this.fetchData()
      })

  }



  deleteShippngInfo(uid, Lid ,i) {
    let data = {
      uid: uid
    }
    fetch("https://artisanbackend.herokuapp.com/api/deleteShippingUID",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }).then(res => res.json())
      .then(data => {
        this.deletefirebaseUId(uid, Lid ,i)


      }).catch(() => {
        alert("User Not Deleted")
        this.fetchData()
      })

  }


  deletefirebaseUId(uid, Lid ,i) {

    let data = {
      uid: uid
    }
    fetch("https://artisanbackend.herokuapp.com/api/deleteAdminOrUSer",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }).then(res => res.json())
      .then(data => {
        this.deletePAymentInfo(uid, Lid ,i)

      }).catch(() => {
        alert("User Not Deleted")
        this.fetchData()
      })

  }


  deletePAymentInfo(uid, Lid ,i) {
    let data = {
      uid: uid
    }
    fetch("https://artisanbackend.herokuapp.com/api/deletePaymentInfoUID",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }).then(res => res.json())
      .then(data => {
        this.listingDelete(Lid ,i)

      }).catch(() => {
        alert("User Not Deleted")
        this.fetchData()
      })

  }

  // 
  // 
  // 


  async fetchData() {


    const response = await fetch("https://artisanbackend.herokuapp.com/api/getListReports",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
    const json = await response.json();
   
    let js = json.docs
    

    if (js.length > 0) {
      this.setState({
        Listings: js,
        loading: false

      }, () => {

      })
    }
    else {
      this.setState({
        loading: false
      })
    }
  }

  async componentDidMount() {
    var user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      let loginperson = user.Name
      let islogin = user.login

      if (islogin === 1) {
        this.setState({
          LoginName: loginperson
        })
        this.fetchData()
      }

    }
    else {
      alert("User Must Login First")
      this.props.history.push("/")
    }
  }
  async handleDelete(e, id) {
    let Data = {
      id: e
    }


    await fetch("https://artisanbackend.herokuapp.com/api/DeleteReportListing", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(Data)
    })
      .then(res => res.json())
      .then(data => {
        this.SetStatus(id)

      })
      .catch(err => console.error(err));

  }

  async SetStatus(id) {

    let Data = {
      id: id,
      Action: "1"
    }

    await fetch("https://artisanbackend.herokuapp.com/api/UpdateReportStatus", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(Data)
    })
      .then(res => res.json())
      .then(data => {
        this.fetchData()

      })
      .catch(err => console.error(err));


  }
  async DeletReport(e, i) {
    let Data = {
      id: e
    }

    await fetch("https://artisanbackend.herokuapp.com/api/DeleteListingReport", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(Data)
    })
      .then(res => res.json())
      .then(data => {
        this.fetchData()

      })
      .catch(err => console.error(err));

  }
  handleModel(index) {

    let num = this.state.Listings[index]

    this.setState({
      modelObj: num
    }, () => {
      this.toggle()
    })

  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }
  // handleIncriment() {
  //   let Page = this.state.pageNum + 1
  //   if (Page <= this.state.pages) {
  //     this.setState({
  //       loading: true,
  //       pageNum: Page
  //     }, () => {
  //       this.fetchData()
  //     })
  //   }
  //   else {

  //   }

  // }
  onCloseModal = () => {
    this.setState({ open: false });

  };
  onOpenModal = (e) => {
    this.handleFetchById(e)

  }
  // async handleFetchById(e) {
  //   await fetch("https://secret-lake-27653.herokuapp.com/api/getListing" + e, {
  //     method: "GET",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify()
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       let DataForModel = data.result.doc

  //       this.setState({
  //         modelData: DataForModel,
  //         open: true
  //       })
  //     })
  //     .catch(err => console.error(err));

  // }
  // async applyFilters() {
  //   this.setState({
  //     pageNum: 1,
  //     searching2: true
  //   })
  //   let data = {
  //     deliverable: this.state.shipping,
  //     trade: this.state.trade,
  //     last:this.state.days,
  //     minPrice: "0",
  //     maxPrice:'10000'
  //   }


  //   if(this.state.days!=='0'){
  //     data.days=this.state.days
  //   }

  //   const response = await fetch("https://secret-lake-27653.herokuapp.com/api/getListings" + this.state.pageNum,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body:JSON.stringify(data)
  //     });
  //   const json = await response.json();

  //   let ar = json.data
  //  this.setState({
  //   Listings: ar
  //  })

  // }
  handleDecriment(e) {
    let CurrntPage = this.state.pageNum
    if (CurrntPage > 1) {
      let Page = this.state.pageNum - 1
      this.setState({
        loading: true,
        pageNum: Page
      }, () => {
        this.fetchData()

      })
    }
    else {
    }

  }

  handleDays(e) {


    this.setState({
      days: e
    }, () => {
      this.applyFilters()

    })
  }
  Trade(e) {

    this.setState({
      trade: e
    }, () => {
      this.applyFilters()
    })
  }
  Shipping(e) {

    this.setState({
      shipping: e
    }, () => {
      this.applyFilters()
    })
  }
  Reset() {
    this.setState({
      pageNum: 1,
      searching2: false
    }, () => {
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
  async  handleSearch(e) {
    e.preventDefault()
    if (this.state.searchVal) {
      this.setState({
        loading: true,
        searching: true,
        searching2: true
      })
      let Data = {
        title: this.state.searchVal
      }


      await fetch("https://artisanbackend.herokuapp.com/api/searchReport", {
        method: "PUT",
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
            Listings: data
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
  handleChange(e) {
    this.setState({
      searchVal: e.target.value
    })
  }
  handleClear() {

  }
  render() {

    const Card = ({ title }) => (
      <div style={{ "textAlign": "center", "color": "red" }} className="card">

        <div className="content">
          Delete
        </div>
      </div>
    )
    const style = {
      "margin": "auto",
      "width": "50%",
    }


    return (

      <div>
        {/* navigation */}
        <nav style={{ "display": "block", "fontFamily": "Times New Roman" }} className="navbar navbar-expand-md bg-dark navbar-dark">
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
                  <a className="nav-link dropdown-toggle" href="" id="navbardrop" data-toggle="dropdown">
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
          <div style={{ "paddingBottom": 50 }} className="col-md-3 ">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/Dashboard"><li className="list-group-item bg-light"><i className="fa fa-tachometer"></i> <b> Dashboard </b></li></Link>
              </li>
              <li className="nav-item">
                <a href="#new1" data-toggle="collapse">
                  <li className="list-group-item bg-light "><i className="fa fa-list" aria-hidden="true"></i> <b> My Consignment </b>  <i style={{ "float": "right" }} className="fas fa-sort-down"></i> </li></a>
                <ul className="collapse" id="new1" style={{ "listStyle": "none", "fontFamily": "Comic Sans MS", "backgroundColor": "white", "color": "black" }}>
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
                  <li className="list-group-item bg-light "><i className="fa fa-list" aria-hidden="true"></i> <b> Mi Consignacion </b> <i style={{ "float": "right" }} className="fas fa-sort-down"></i> </li></a>
                <ul className="collapse" id="new2" style={{ "list-style": "none", "fontFamily": "Comic Sans MS", "backgroundColor": "white", "color": "black" }}>
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
                  <li className="list-group-item bg-light "><i className="fa fa-list" aria-hidden="true"></i> <b> Pure Artisan</b> <i style={{ "float": "right" }} className="fas fa-sort-down"></i> </li></a>
                <ul className="collapse" id="new3" style={{ "list-style": "none", "fontFamily": "Comic Sans MS", "backgroundColor": "white", "color": "black" }}>
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
                  <li className="list-group-item bg-light "><i className="fa fa-list" aria-hidden="true"></i> <b> Puro Artesanal </b> <i style={{ "float": "right" }} className="fas fa-sort-down"></i> </li> </a>
                <ul className="collapse" id="new4" style={{ "list-style": "none", "fontFamily": "Comic Sans MS", "backgroundColor": "white", "color": "black" }}>
                  <Link to="/PureArUsers" className="nav-item">
                    <li className=" bg-light">
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

          <div style={{ "paddingBottom": 50 }} className="col-md-9">
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header"> <b> Report Listing Details </b></div>
                  <div className="card-body">

                    <div className="d-flex align-items-start E-fucn-con">
                      <div className="card-body">
                        <form className="card">
                          <div className="input-group">
                            <input type="search" onChange={this.handleChange.bind(this)} value={this.state.searchVal} className="form-control" placeholder="Search Report Tittle" />
                            {this.state.searching === true && <div className="input-group-btn">
                              <button style={{ "margin": 5 }} onClick={this.handleClear.bind(this)} className="btn btn-default"><i className="fas fa-times"></i></button>
                            </div>}
                            <div className="input-group-btn">
                              <button onClick={this.handleSearch.bind(this)} className="btn btn-danger"><i className="fa fa-search"></i> Search </button>
                            </div>
                          </div>
                        </form>
                      </div>

                    </div>

                  </div>


                  <div className="list-group">
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
                    <div className="listins-render" style={{ "color": "black", "backgroundColor": "white", "border": "1", "overflow": "scroll" }}>
                      {this.state.loading === false && this.state.Listings.length > 0 && this.state.Listings.map((listings, index) => {
                        return (
                          <div key={listings._id} className="list-group-item list-group-item-action">
                            <div className="row">

                              <div style={{ "height": 350, "width": 400 }} className="col-md-3">
                                <img src={listings.listingImages[0]} alt="Image" className="list-img" />

                              </div>

                              <div className="col-md-8">
                                <h3 className="list-group-item-text">{listings.title}</h3>
                                <h6 className="list-group-item-text"> Seller Name : {listings.sellerName}</h6>
                                <p> Email : {listings.email} </p>
                                <p> Date : {(new Date(listings.createdDate)).toLocaleString()} </p>

                                <p >Listing Description : {listings.listingDescription}</p>
                                <p><button className="btn btn-primery" onClick={() => { this.handleModel(index) }} data-toggle="modal" data-target="#popUpWindow" ><i className="fab fa-readme"></i> Read More </button> </p>

                                {listings.Action === "0" ?
                                  <div>
                                    <p> <button className="btn btn-danger" onClick={() => { this.Check3(listings.sellerFirebaseUID, listings.listingID, listings._id) }}> Delete User </button></p>
                                    <p> <button className="btn btn-danger" onClick={() => { this.Check1(listings.listingID, listings._id) }}> Delete Listing </button></p>
                                  </div>
                                  : <span></span>}

                                {listings.Action === "1" ?
                                  <div>
                                    <p> <button className="btn btn-danger" onClick={() => { this.Check3(listings.sellerFirebaseUID, listings.listingID ,listings._id) }}> Delete User </button></p>
                                    <p style={{ "color": "red" }}> Listing Deleted</p>
                                  </div>

                                  : <span></span>}


                                {listings.Action === "2" ?
                                  <div>

                                    <p style={{ "color": "red" }}> User Deleted</p>
                                    <p style={{ "color": "red" }}> Listing Deleted</p>
                                  </div>

                                  : <span></span>}



                              </div>
                              <div className="col-md-1">
                                <Popup
                                  trigger={<button type="button" onClick={() => this.Check(listings._id, index)} className="close cls" data-dismiss="modal">&times;</button>}
                                  position="left top"
                                  on="hover"
                                >
                                  <Card title="Left Top" />
                                </Popup>

                              </div>
                            </div>
                          </div>
                        )
                      })}

                    </div>

                  </div>
                </div>

              </div>
            </div>

          </div>
          <div>
            {/* <Modal open={open} onClose={this.onCloseModal} center>

              <div className="Model">
                <div style={{ height: 400, overflowY: 'auto', overflowX: 'auto' }}>
                  {<Carousel autoPlay={true}>
                    {open && this.state.modelData.imageLinks.length > 0 && this.state.modelData.imageLinks.map((image, index) => {
                      return <Carousel.Item key={index}>
                        <a href={image} rel="noopener noreferrer" target='_blank'> <img className='img-responsive' width={"100%"} height={"auto"} alt="900x500" src={image} /></a>
                      </Carousel.Item>
                    })}
                  </Carousel>}
                  <h2 > Tittle :<i> {this.state.modelData.title}</i></h2>
                  <h3 > Category :<i> {this.state.modelData.Category}</i></h3>
                  <h4 > SubCategory :<i> {this.state.modelData.subCategory}</i></h4>
  
                  <h5 > Shipping International : {this.state.modelData.shippingInternational === true ? <span>Yes</span> : <span>No</span>}</h5>
                  <h5 > Shipping Domestic :<i> {this.state.modelData.shippingNational === true ? <span>Yes</span> : <span>No</span>}</i></h5>
                  <p > <b> Description : </b> <i> {this.state.modelData.description}</i></p>



                </div>
              </div>




                  </Modal>*/}
          </div>
        </div>

        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>
            <Carousel>
              {this.state.modal === true && this.state.modelObj.listingImages.map((imge, index) => {
                return (
                  <Carousel.Item style={{ "height": "auto", "width": "100%" }}>
                    <img
                      className="d-block w-100"
                      src={imge}
                      alt="Image"
                    />
                  </Carousel.Item>
                )
              })}


            </Carousel>

          </ModalHeader>
          <ModalBody style={{ "fontFamily": "monospace" }}>
            <h2 > Tittle :<i><b> {this.state.modelObj.title} </b> </i> </h2>
            <h3 > Saller Name  :<i> {this.state.modelObj.sellerName}</i></h3>
            <h4 >  Email :<i> {this.state.modelObj.email}</i></h4>
            <p > <b> Description : </b> <i> {this.state.modelObj.listingDescription}</i></p>
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </Modal>



      </div>
    )
  }
}
