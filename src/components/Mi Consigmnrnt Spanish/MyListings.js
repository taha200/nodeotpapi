import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import "./pure.css";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
// import Modal from "react-responsive-modal";
// import {   ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

// First way to import
import { CircleLoader } from 'react-spinners';
import { Dropdown, } from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel'
import Popup from 'reactjs-popup'
export default class MiListings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searching: false ,
      searching2: false ,
      
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
      isSearching: false


    }
    this.handleModel = this.handleModel.bind(this)
    this.toggle = this.toggle.bind(this);
    this.handleDelete = this.handleDelete.bind(this)
    this.fetchData = this.fetchData.bind(this)
    this.handleFetchById = this.handleFetchById.bind(this)
    this.handleIncriment = this.handleIncriment.bind(this)
    this.handleDecriment = this.handleDecriment.bind(this)
    // this.handleDays = this.handleDays.bind(this)
    this.applyFilters = this.applyFilters.bind(this)

  }


  async fetchData() {
    let pageNumber = this.state.pageNum

    const response = await fetch("https://powerful-oasis-74577.herokuapp.com/api/getListings" + pageNumber,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      });
    const json = await response.json();

    let js = json.data
    this.setState({
      pages: json.pages
    })

    if (js.length > 0) {
      this.setState({
        Listings: js,
        loading: false

      }, () => {

      })
    }
    else {
this.setState({
  loading:false
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
  async handleDelete(e, i) {
    let arr = this.state.Listings;
    let Data = {
      id: e
    }

    this.setState({
      Listings: arr
    });
    await fetch("https://powerful-oasis-74577.herokuapp.com/api/deleteListing", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(Data)
    })
      .then(res => res.json())
      .then(data => {
        arr.splice(i, 1);
        this.setState({

          Listings: arr
        });
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
  handleIncriment() {
    let Page = this.state.pageNum + 1
    if (Page <= this.state.pages) {
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
  onCloseModal = () => {
    this.setState({ open: false });

  };
  onOpenModal = (e) => {
    this.handleFetchById(e)

  }
  async handleFetchById(e) {
    await fetch("https://powerful-oasis-74577.herokuapp.com/api/getListing" + e, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify()
    })
      .then(res => res.json())
      .then(data => {
        let DataForModel = data.result.doc

        this.setState({
          modelData: DataForModel,
          open: true
        })
      })
      .catch(err => console.error(err));

  }
  async applyFilters() {
    this.setState({
      pageNum: 1,
      searching2: true
    })
    let data = {
      deliverable: this.state.shipping,
      trade: this.state.trade,
      last:this.state.days,
      minPrice: "0",
      maxPrice:'10000'
    }
   

    if(this.state.days!=='0'){
      data.days=this.state.days
    }

    const response = await fetch("https://powerful-oasis-74577.herokuapp.com/api/getListings" + this.state.pageNum,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body:JSON.stringify(data)
      });
    const json = await response.json();
  
    let ar = json.data
   this.setState({
    Listings: ar
   })
   
  }
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
    },()=>{
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
    if(this.state.searchVal){
      this.setState({
        loading: true,
        searching: true,
        searching2: true
      })
      let Data = {
       title : this.state.searchVal
      }
    
  
      await fetch("https://powerful-oasis-74577.herokuapp.com/api/searchListing", {
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
        .catch(err => console.error(err),()=>{
          this.setState({
            loading: false
        })
        });
    }
    else{

    }
    
   
    
  }
  handleChange(e) {
    this.setState({
      searchVal: e.target.value
    })
  }
  handleClear(){

  }
  render() {
  
    const Card = ({ title }) => (
      <div style={{ "textAlign": "center", "color": "red" }} className="card">

        <div className="content">
          Delete Listing
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
          <h3 style={{"color": "white"}}><b>Admin Panel</b></h3>
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

          <div className="col-md-9">
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header"> <b>
                  listado de detalles </b></div>
                  <div className="card-body">

                    <div className="d-flex align-items-start E-fucn-con">
                      <div className="card-body">
                        <form className="card">
                          <div className="input-group">
                            <input type="search" onChange={this.handleChange.bind(this)} value={this.state.searchVal} className="form-control" placeholder="
                            Nombre de listado de búsqueda" />
                            {this.state.searching===true && <div className="input-group-btn">
                            <button style={{"margin": 5}} onClick={this.handleClear.bind(this)} className="btn btn-default"><i className="fas fa-times"></i></button>
                          </div>}
                            <div className="input-group-btn">
                              <button onClick={this.handleSearch.bind(this)} className="btn btn-danger"><i className="fa fa-search"></i>  
                              Buscar </button>
                            </div>
                          </div>
                        </form>
                      </div>

                    </div>

                  </div>
                 {this.state.searching===false &&  <div className="container">
                    <div className="row">
                      <div className="col-sm-3" >
                        <Dropdown>
                          <Dropdown.Toggle variant="success" id="dropdown-basic">
                            
Seleccionar por días {this.state.days}
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item value="3" onClick={() => { this.handleDays("7") }}>7 
                            Dias</Dropdown.Item>
                            <Dropdown.Item value="3" onClick={() => { this.handleDays("30") }}>30 
                            Dias</Dropdown.Item>
                            <Dropdown.Item value="3" onClick={() => { this.handleDays("90") }}>90 
                            Dias</Dropdown.Item>
                            <Dropdown.Item value="3" onClick={() => { this.handleDays("180") }}>180 
                            Dias</Dropdown.Item>


                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                      <div className="col-sm-3" >
                        <Dropdown>
                          <Dropdown.Toggle variant="success" id="dropdown-basic">
                          Comercio {this.state.trade === true ? "Yes" : "No"}
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item onClick={() => { this.Trade(true) }}>
                            Sí</Dropdown.Item>
                            <Dropdown.Item onClick={() => { this.Trade(false) }}>No</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                      <div className="col-sm-3" >
                        <Dropdown>
                          <Dropdown.Toggle variant="success" id="dropdown-basic">
                            
Envío {this.state.shipping === true ? "Yes" : "No"}
                    </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item onClick={() => { this.Shipping(true) }}>Sí</Dropdown.Item>
                            <Dropdown.Item onClick={() => { this.Shipping(false) }}>No</Dropdown.Item>

                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                      <div className="col-sm-3" >
                        <button onClick={this.Reset.bind(this)} className="btn btn-success"> 
                        Reiniciar</button>
                      </div>
                    </div>
                  </div>}


                  <div className="list-group">
                  {this.state.searching2===false &&  <div>

                      <button style={{ "float": "left", "marginRight": 20 }} onClick={this.handleDecriment} type="button" className="btn btn-primary"> <i className="fa fa-angle-double-left" aria-hidden="true">  Anterior </i> </button>
                      <button style={{ "float": "right" }} onClick={this.handleIncriment} type="button" className="btn btn-primary"> 
                      Siguiente <i className="fa fa-angle-double-right" aria-hidden="true"></i></button>
                      <p style={{ "textAlign": "center" }}>   
                      Página : {this.state.pageNum} / {this.state.pages} </p>
                    </div>}
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
                      {this.state.loading === false && this.state.Listings > 0 && this.state.Listings.map((listings, index) => {
                        return (
                          <div key={listings._id} className="list-group-item list-group-item-action">
                            <div className="row">

                              <div style={{ "height": 200, "width": 200 }} className="col-md-3">
                                <img src={listings.imageLinks[0]} alt="Images" className="list-img" />

                              </div>

                              <div className="col-md-8">
                                <h3 className="list-group-item-text">{listings.title}</h3>
                                <h6 className="list-group-item-text"> 
                                Categoría : {listings.Category}</h6>
                                <p>Precio : {listings.price} $ </p>
                                <p><button className="btn btn-primery" onClick={() => { this.handleModel(index) }} data-toggle="modal" data-target="#popUpWindow" ><i className="fa fa-read"></i>Lee mas
                                </button></p>
                                <p >{listings.description}</p>


                              </div>
                              <div className="col-md-1">
                                <Popup
                                  trigger={<button type="button" onClick={() => this.handleDelete(listings._id, index)} className="close cls" data-dismiss="modal">&times;</button>}
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
              {this.state.modal === true && this.state.modelObj.imageLinks.map((imge, index) => {
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
            <h2 > Ápice :<i><b> {this.state.modelObj.title} </b> </i> </h2>
            <h3 > Categoría :<i> {this.state.modelObj.Category}</i></h3>
            <h4 > 
            Subcategoría :<i> {this.state.modelObj.subCategory}</i></h4>

            <h5 > Envios internacionales : {this.state.modelObj.shippingInternational === true ? <span>
              Sí</span> : <span>No</span>}</h5>
            <h5 > 
            Envío nacional :<i> {this.state.modelObj.shippingNational === true ? <span>
              Sí</span> : <span>No</span>}</i></h5>
            <p > <b> 
            Descripción : </b> <i> {this.state.modelObj.description}</i></p>
          </ModalBody>
          <ModalFooter>

          </ModalFooter>
        </Modal>



      </div>
    )
  }
}
