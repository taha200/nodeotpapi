import React, { Component } from 'react'
import "./pure.css"
import { Link } from 'react-router-dom';
import { CircleLoader } from 'react-spinners';
import Autocomplete from "react-autocomplete";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
export default class MiCategory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      col: 9,
      editsubCat:false,
      SubmitEditCatId: "",
      editCat: false,
      addCat: false,
      adSubCat: false,
      value: '',
      suggestions: [],
      selected: "",
      iconName: "material",
      Name: "",
      favcolor: "#4d2600",
      Categories: [],
      categoryId: "",
      collapse: false,
      LoginName: "",
      categoryName: "",
      loading: true,
      editName: "",
      editColour: "",
      iconeditName: "Font-Awesome",
      EditValue: '',
      SubCatArry: [],
      SubmitEditSubCatId: "",
      subcatgories:[],
      subCatIndex: "",
      id: "",
      CatId: ""

    }
    
    this.Check = this.Check.bind(this)
    this.SubmitEditCat = this.SubmitEditCat.bind(this)
    this.DeleteSubCat = this.DeleteSubCat.bind(this)
    this.updateSubCat = this.updateSubCat.bind(this)
    this.handleEditSubmitCat = this.handleEditSubmitCat.bind(this)
    this.onChangeEditValues = this.onChangeEditValues.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleSubCategory = this.handleSubCategory.bind(this)
    this.handleSubmitSubCat = this.handleSubmitSubCat.bind(this)
    this.fetchIconDataType = this.fetchIconDataType.bind(this)
    this.onChangeValues = this.onChangeValues.bind(this)
    this.handleSubmitCat = this.handleSubmitCat.bind(this)
    this.AddCategory = this.AddCategory.bind(this)
    this.fetchData = this.fetchData.bind(this)
    this.toggle = this.toggle.bind(this);
  }
  handleEdit(i,id){ 

  let editObj=  this.state.Categories[i]
 
  let name = editObj.name
  let colo= editObj.color
  let iconType= editObj.iconType
  let iconname= editObj.iconName

 
this.setState({
  editName: name,
  editColour: colo,
  SubmitEditCatId: id,
  value: editObj.iconType,
  iconName: editObj.iconName,
  SubCatArry: editObj.subCategories
},()=>{
  
})
  this.setState({
    editCat: true,
    col: 3
  })

  }
  toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
  }
//  alert warning

Check = (e) => {

    confirmAlert({
      title: 'Confirm Delete',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            this.DeleteCategory(e)
          }
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
  };


// alert warning
 async DeleteSubCat(Catindex, i, id) {
  
    let arr = this.state.Categories[Catindex].subCategories
 

  
 arr.splice(i,1)
 
    let data = {
      id: id,
      subCategories: arr
    }
    fetch("https://powerful-oasis-74577.herokuapp.com/api/deleteSubCategory",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }).then(res => res.json())
      .then(data => {
       
        this.fetchData()
      }).catch(err => console.error(err))

  }
  // 
  // 
  // 
    
  updateSubCat(a,b,c,d){
   
    this.setState({
      col: 3,
    editsubCat:true,
    subCatIndex: b,
    id: d,
    CatId: c
    })
    
    let subCat = this.state.Categories[a].subCategories
 
    this.setState({
      subcatgories: subCat
    })
    let arr = this.state.Categories[a].subCategories[b]
    
    let name = arr.name
    let colo= arr.color
    let iconType= arr.iconType
    let iconname= arr.iconName
  
   
  this.setState({
    editName: name,
    editColour: colo,
    value: arr.iconType,
    iconName: arr.iconName,
   
  })
  // let name = arr.name
  // let colo= arr.color
  // let iconType= arr.iconType
  // let iconname= arr.iconName

  // console.log(name , colo ,iconType ,iconname )
  // this.setState({
  //   editName: name,
  //   editColour: colo,
  //   SubmitEditSubCatId: c,
  //   value: arr.iconType,
  //   iconName: arr.iconName,
  
  // },()=>{
    
  // })
  }
async SubmitEditCat(){
let data={
  name: this.state.editName,
  iconName: this.state.iconName,
  iconType: this.state.value,
  color: this.state.favcolor,
  subcatgories : this.state.subcatgories,
  subCatIndex: this.state.subCatIndex
}

let a=
this.state.subcatgories[data.subCatIndex]={
  name: this.state.editName,
  iconName: this.state.iconName,
  iconType: this.state.value,
  color: this.state.favcolor,
  _id: this.state.id
}
let dta={
  id: this.state.CatId,
  subCategories:  this.state.subcatgories,
}

await fetch("https://powerful-oasis-74577.herokuapp.com/api/updateSubCat",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dta)
    }).then(res => res.json())  
    .then(data => {
     this.setState({
       editsubCat: false,
       col: 9,
       editName: "",
       editColour: "",
        value : "",
        iconName : "",  
     })
 this.fetchData()
      
    }).catch(err => alert(" Sub Category Not Updated"))



  }

  handleSubmitSubCat(e) {
    this.setState({
      categoryId: e
    })


  }
  DeleteCategory(e) {
    let data = {
      id: e
    }
  
    fetch("https://secret-lake-27653.herokuapp.com/api/deleteCategory",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }).then(res => res.json())
      .then(data => {
        let catefories = this.state.Categories.filter(category => category._id !== e)
       
        this.setState({
          Categories: catefories
        })

      }).catch(err => console.error(err))


  }
  async  handleSubCategory() {
    let subCategory = {
      name: this.state.Name,
      iconName: this.state.iconName,
      iconType: this.state.value,
      color: this.state.favcolor,
      id: this.state.categoryId
    }
    
    await fetch("https://powerful-oasis-74577.herokuapp.com/api/addSubCategory",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(subCategory)
      }).then(res => res.json())
      .then(data => {
        this.setState({
          adSubCat: false,
          col: 9,
          editName: "",
          editColour: "",
           value : "",
           iconName : "",  
        })
        this.fetchData()
      }).catch(err => alert("Sub-Category not added"))

  }


  onChangeValues(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onChangeEditValues(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmitCat() {

    this.AddCategory()
  }


 async handleEditSubmitCat() {
    let category={
      id: this.state.SubmitEditCatId,
      name: this.state.editName,
      color: this.state.editColour,
      iconType: this.state.value,
      iconName: this.state.iconName,
      subCategories: this.state.SubCatArry
    }
   

    await fetch("https://powerful-oasis-74577.herokuapp.com/api/updateCat",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(category)
    }).then(res => res.json())
    .then(data => {
     alert("Category Updated")
     this.setState({
     SubmitEditCatId: "",
      editName: "",
    editColour: "",
     value : "",
     iconName : "",  
     })
 this.fetchData()
      
    }).catch(err => alert("Category Not Updated"))

  }

  async AddCategory() {
    let category = {
      name: this.state.Name,
      iconName: this.state.iconName,
      iconType: this.state.value,
      color: this.state.favcolor
    }
    await fetch("https://secret-lake-27653.herokuapp.com/api/addCategory",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(category)
      }).then(res => res.json())
      .then(data => {
       
        this.fetchData()
        this.setState({
          addCat: false,
          col: 9
        })
      }).catch(err => console.error(err))


  }
  handleChangeIconValue(e) {
    this.setState({
      iconName: e.target.value
    }, () => {

      this.fetchIconDataType()
    })
  }
  handleEditChangeIconValue(e) {
    this.setState({
      iconeditName: e.target.value
    }, () => {

      this.fetchIconDataType()
    })
  }
  async fetchIconDataType() {
    let iconname = this.state.iconName
    const response = await fetch("https://secret-lake-27653.herokuapp.com/api/getIcons" + iconname);
    const json = await response.json();
    let js = json.docs
    let icons = js.map(obj => {
      return {
        label: obj.name,
        id: obj._id
      }
    })
    this.setState({
      suggestions: icons
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
  async fetchData() {
    const response = await fetch("https://powerful-oasis-74577.herokuapp.com/api/getCategories",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
    const json = await response.json();
    let js = json.docs
    this.setState({
      Categories: js,
      loading: false
    }, () => {

    })
    this.fetchIconDataType()
    this.setState({
      editCat:false,

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
  render() {
    const style = {
      "margin": "auto",
      "width": "50%",
    }

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

          <div style={{ "overflow": "scroll", "height": 700 }} className={"col-md-"+ this.state.col}>
            <ul className="navbar-nav">
              <br />
              {/*<li style={{"padding": 20 , }} className="nav-item">
              <button className="btn btn-success btn-lg"><li onClick={() => {
                this.setState({ addCat: true, adSubCat: false })
              }} > <div className="col-md-1"></div> <i className="fa fa-plus" aria-hidden="true"></i> Add Category</li></button>
            </li>*/}
              <li  style={{"marginBottom": 10}} className="nav-item">
                <li  className="list-group-item bg-light"> <h3><i className="fa fa-tachometer"></i>    <b>Categories </b></h3> </li>
              </li>
              <li style={{"marginBottom": 10}}  className="nav-item">
              <button className="btn btn-success btn-lg"><li onClick={() => {
                this.setState({col : 3, addCat: true, adSubCat: false })
              }} > <div className="col-md-1"></div> <i className="fa fa-plus" aria-hidden="true"></i> Add Category</li></button>
            </li>
              {this.state.loading &&
                <div className='sweet-loading'>
                  <CircleLoader
                    css={style}
                    sizeUnit={"px"}
                    size={100}
                    color={'#151F1E'}
                    loading={this.state.loading}
                  />
                </div>}

              {this.state.loading === false && this.state.Categories.length > 0 && this.state.Categories.map((categori, index) => {
                return (
                  <li style={{ "padding": "20", }}  className="nav-item">
                  
                    <div className="list-group-item bg-light "> <h4 style={{ "marginTop": 10, "fontFamily": "Comic Sans MS" }}> {categori.name}   <a href={"#nw" + index} data-toggle="collapse"> <i   className="fas fa-sort-down"></i> </a>  <button className="btn btn-link"> <i style={{ "float": "right" }}  onClick={() => { this.Check(categori._id) }} className="fas fa-trash"> </i> </button>   </h4>
                    <button className="btn btn-link"> <i   onClick={() => { this.handleEdit(index ,categori._id) }} className="fas fa-edit"> </i> </button>   </div>
                    
                  <ul className="collapse" id={"nw"+ index} style={{ "list-style": "none" ,  "fontFamily" :"Comic Sans MS" ,"backgroundColor" : "white" , "color" : "black"  }}>
                    <div className="nav-item">
                    {categori.subCategories.map((subCatigori, i) => {
                      return (
                        <li style={{"marginBottom": 5,  }} className="nav-item">
                          <li className=" bg-light"> <div className="col-md-1"></div> <i className="fa fa-list" aria-hidden="true"></i> {subCatigori.name} <button className="btn btn-link"> <i style={{"marginRight": 10}} onClick={() => { this.updateSubCat(index, i, categori._id , subCatigori._id) }} className="fas fa-edit"></i> </button> <button className="btn btn-link">  <i onClick={() => { this.DeleteSubCat(index, i, categori._id) }} className="fas fa-trash"></i> </button> </li>

                        </li>
                      )
                    })}
                    <li>  <button><li onClick={() => { this.setState({ col : 3, adSubCat: true, addCat: false, categoryId: categori._id, categoryName: categori.name }) }} className=" bg-light"> <div className="col-md-1"></div> <i className="fa fa-plus" aria-hidden="true"></i> Add Sub Category</li></button> </li>
                    </div>
  
  
                  </ul>
                </li>
                )
              })

              }

           

            </ul>
          </div>


          {/**Edit Category */}

          {this.state.editCat && <div className="col-md-6">
            <div style={{ "backgroundColor": "white", "padding": 15 }} className="form">
              <br />
              <div className="page-header text-center">
                <button onClick={() => {
                  this.setState({
                    col : 9,
                    adSubCat: false,
                    editCat: false,
                    addCat: false,
                    editsubCat: false

                  })
                }} type="button" className="close" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
                <h2>Edit Category </h2></div>
              <form>
                <label>Name</label>
                <input type="text" name="editName" value={this.state.editName} onChange={this.onChangeEditValues} className="form-control" />
                <br />
                <label>Color</label>


                <input type="color"  width="85%" className="form-control" value={this.state.editColour} onChange={this.onChangeEditValues} name="editColour" />
                <br />
                <div className="dropdown">

                <select onChange={this.handleChangeIconValue.bind(this)}>
                  <option value='material'>
                    Material
            </option>
                  <option value='font-awesome'>
                    Font-Awesome
            </option>
                  <option value="material-community">
                    Material-Community
            </option>
                  <option value='ionicon'>
                    Ionicon
            </option>

                </select>

              </div>
              <br />
              {this.state.suggestions.length > 0 && <Autocomplete
                shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
                getItemValue={item => item.label}
                items={this.state.suggestions}
                renderItem={(item, isHighlighted) =>
                  <div key={item.id} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                    {item.label}
                  </div>
                }
                value={this.state.value}
                onChange={(e) => {
                  this.setState({
                    value: e.target.value
                  })
                }}
                onSelect={(val) => {
                  this.setState({
                    value: val
                  })
                }}
              />}

                <div className="text-right">
                  <button type="button" onClick={this.handleEditSubmitCat.bind(this)} className="btn btn-success"> Update Category</button>
                </div>
              </form>
            </div>

          </div>}



          {/**Edit subCategory 
          skhfhs
          saksnfiuhuis
          safsjbfbsufwuew
          sfjsbfuwey
          fhsufyyuweuf
          sfjsbfwueybfwyfw
          wefwfk
          wer
          wf
          wf
          w
          f
          f
          w
          fw*/}


          {this.state.editsubCat && <div className="col-md-6">
            <div style={{ "backgroundColor": "white", "padding": 15 }} className="form">
              <br />
              <div className="page-header text-center">
                <button onClick={() => {
                  this.setState({
                    col : 9,
                    adSubCat: false,
                    editCat: false,
                    addCat: false,
                    editsubCat: false

                  })
                }} type="button" className="close" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
                <h2>Edit Sub Category </h2></div>
              <form>
                <label>Name</label>
                <input type="text" name="editName" value={this.state.editName} onChange={this.onChangeEditValues} className="form-control" />
                <br />
                <label>Color</label>


                <input type="color"  width="85%" className="form-control" value={this.state.editColour} onChange={this.onChangeEditValues} name="editColour" />
                <br />
                <div className="dropdown">

                <select onChange={this.handleChangeIconValue.bind(this)}>
                  <option value='material'>
                    Material
            </option>
                  <option value='font-awesome'>
                    Font-Awesome
            </option>
                  <option value="material-community">
                    Material-Community
            </option>
                  <option value='ionicon'>
                    Ionicon
            </option>

                </select>

              </div>
              <br />
              {this.state.suggestions.length > 0 && <Autocomplete
                shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
                getItemValue={item => item.label}
                items={this.state.suggestions}
                renderItem={(item, isHighlighted) =>
                  <div key={item.id} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                    {item.label}
                  </div>
                }
                value={this.state.value}
                onChange={(e) => {
                  this.setState({
                    value: e.target.value
                  })
                }}
                onSelect={(val) => {
                  this.setState({
                    value: val
                  })
                }}
              />}

                <div className="text-right">
                  <button type="button" onClick={this.SubmitEditCat.bind(this)} className="btn btn-success">Update category</button>
                </div>
              </form>
            </div>

          </div>}










          {/**Add Category */}

          {this.state.addCat && <div className="col-md-6">
            <div style={{ "backgroundColor": "white", "padding": 15 }} className="form">
              <br />
              <div className="page-header text-center">
                <button onClick={() => {
                  this.setState({
                    col : 9,
                    adSubCat: false,
                    editCat: false,
                    addCat: false,
                    editsubCat: false

                  })
                }} type="button" className="close" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
                <h2>Add New Category</h2></div>
              <form>
                <label>Name</label>
                <input type="text" name="Name" value={this.state.Name} onChange={this.onChangeValues} className="form-control" />
                <br />
                <label>Color</label>


                <input type="color"  width="85%" className="form-control" value={this.state.favcolor} onChange={this.onChangeValues} name="favcolor" />
                <br />
                <div className="dropdown">

                  <select onChange={this.handleChangeIconValue.bind(this)}>
                    <option value='material'>
                      Material
              </option>
                    <option value='font-awesome'>
                      Font-Awesome
              </option>
                    <option value="material-community">
                      Material-Community
              </option>
                    <option value='ionicon'>
                      Ionicon
              </option>

                  </select>

                </div>
                <br />
                {this.state.suggestions.length > 0 && <Autocomplete
                  shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
                  getItemValue={item => item.label}
                  items={this.state.suggestions}
                  renderItem={(item, isHighlighted) =>
                    <div key={item.id} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                      {item.label}
                    </div>
                  }
                  value={this.state.value}
                  onChange={(e) => {
                    this.setState({
                      value: e.target.value
                    })
                  }}
                  onSelect={(val) => {
                    this.setState({
                      value: val
                    })
                  }}
                />}
                <div className="text-right">
                  <button type="button" onClick={this.handleSubmitCat.bind(this)} className="btn btn-success">Add New category</button>
                </div>
              </form>
            </div>

          </div>}

          {/**Add Sub----Category */}

          {this.state.adSubCat && <div className="col-md-6">
            <div style={{ "backgroundColor": "white", "padding": 15 }} className="form">
              <br />
              <div className="page-header text-center">
                <button onClick={() => {
                  this.setState({
                    col : 9,
                    adSubCat: false,
                    editCat: false,
                    addCat: false,
                    editsubCat: false

                  })
                }} type="button" className="close" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
                <h2>Add Sub Category to {this.state.categoryName}</h2></div>
              <form>
                <label>Name</label>
                <input type="text" name="Name" value={this.state.Name} onChange={this.onChangeValues} className="form-control" />
                <br />
                <label>Color</label>

                <input type="color" className="form-control" value={this.state.favcolor} onChange={this.onChangeValues} name="favcolor" />
                <br />
                <div className="dropdown">

                  <select onChange={this.handleChangeIconValue.bind(this)}>
                    <option value='material'>
                      Material
              </option>
                    <option value='font-awesome'>
                      Font-Awesome
              </option>
                    <option value="material-community">
                      Material-Community
              </option>
                    <option value='ionicon'>
                      Ionicon
              </option>

                  </select>

                </div>
                <br />
                {this.state.suggestions.length > 0 && <Autocomplete
                  shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
                  getItemValue={item => item.label}
                  items={this.state.suggestions}
                  renderItem={(item, isHighlighted) =>
                    <div key={item.id} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                      {item.label}
                    </div>
                  }
                  value={this.state.value}
                  onChange={(e) => {
                    this.setState({
                      value: e.target.value
                    })
                  }}
                  onSelect={(val) => {
                    this.setState({
                      value: val
                    })
                  }}
                />}
                <div className="text-right">
                  <button type="button" onClick={this.handleSubCategory.bind(this)} className="btn btn-success">Add Sub category</button>
                </div>
              </form>
            </div>

          </div>}
        </div>
      </div>
    )
  }
}
