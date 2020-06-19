import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { CircleLoader } from 'react-spinners';
import { url, headers} from "./constants";
import SweetAlert from 'sweetalert-react'; // eslint-disable-line import/no-extraneous-dependencies
import 'sweetalert/dist/sweetalert.css';

export default class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.state={
      loading1:false,
      show:false,
      text:""
    }
  }
    render() {
      const style = {
        "margin": "auto",
        "width": "50%",
  
  
      }
        return (
            <div style={{"paddingBottom": 50}} className="col-md-3 ">
            <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/Dashboard"><li className="list-group-item bg-light"><i className="fa fa-tachometer"></i> <b> Dashboard </b></li></Link>
            </li>
            <li className="nav-item">
              <a href="#new1" data-toggle="collapse">
                <li className="list-group-item bg-light "><i className="fa fa-list" aria-hidden="true"></i> <b>Menu</b>  <i style={{"float": "right"}}  className="fas fa-sort-down"></i> </li></a>
              <ul className="collapse"  id="new1" style={{ listStyle: "none" , paddingBottom:'10px',paddingTop:'10px' ,fontFamily :"Comic Sans MS" ,backgroundColor : '#f8f9fa'}}>
                <Link to="/Students" className="nav-item">
                  <li className=" bg-light" style={{display:'flex',marginBottom:'3px'}}>
                    <div style={{width:'10%'}}>
                      <i className="fa fa-users" aria-hidden="true" ></i>
                    </div>
                    <div>
                      Students
                    </div>
                  </li>
                </Link>
    
                <Link to="/Sessions" className="nav-item">
                  <li className=" bg-light" style={{display:'flex',marginBottom:'3px'}}>
                    <div style={{width:'10%'}}>
                      <i className="fa fa-list-ol" aria-hidden="true" ></i>
                    </div>
                    <div>
                      Sessions
                    </div>
                </li>
                </Link>
                <Link to="/Subjects" className="nav-item">
                <li className=" bg-light" style={{display:'flex',marginBottom:'3px'}}>
                  <div style={{width:'10%'}}>
                    <i className="fa fa-book" aria-hidden="true" ></i>
                  </div>
                  <div>
                    Subjects
                  </div>
                </li>
              </Link>
                <Link to="/Lectures" className="nav-item">
                <li className=" bg-light" style={{display:'flex',marginBottom:'3px'}}>
                  <div style={{width:'10%'}}>
                    <i className="fa fa-bug" aria-hidden="true" ></i>
                  </div>
                  <div>
                    Lectures
                  </div>
                </li>
              </Link>
                <Link to="/Featured" className="nav-item">
                <li className=" bg-light" style={{display:'flex',marginBottom:'3px'}}>
                  <div style={{width:'10%'}}>
                    <i className="fa fa-file-video-o" aria-hidden="true" ></i>
                  </div>
                  <div>
                    Featured Videos
                  </div>
                </li>
              </Link>
                <Link to="/PastPapers" className="nav-item">
                <li className=" bg-light" style={{display:'flex',marginBottom:'3px'}}>
                  <div style={{width:'10%'}}>
                    <i className="fa fa-newspaper-o" aria-hidden="true" ></i>
                  </div>
                  <div>
                    Past Papers
                  </div>
                </li>
              </Link>
                <Link to="/News" className="nav-item">
                <li className=" bg-light" style={{display:'flex',marginBottom:'3px'}}>
                  <div style={{width:'10%'}}>
                    <i className="fa fa-video-camera" aria-hidden="true" ></i>
                  </div>
                  <div>
                    News
                  </div>
                </li>
              </Link>
                <Link to="/Exams" className="nav-item">
                <li className=" bg-light" style={{display:'flex',marginBottom:'3px'}}>
                  <div style={{width:'10%'}}>
                    <i className="fa fa-bug" aria-hidden="true" ></i>
                  </div>
                  <div>
                    Exams
                  </div>
                </li>
              </Link>
                <Link to="/Whatsapp" className="nav-item">
                <li className=" bg-light" style={{display:'flex',marginBottom:'3px'}}>
                  <div style={{width:'10%'}}>
                    <i className="fa fa-whatsapp" aria-hidden="true" ></i>
                  </div>
                  <div>
                    Whatsapp Groups
                  </div>
                </li>
              </Link>
                <Link to="/Advertisement" className="nav-item">
                <li className=" bg-light" style={{display:'flex'}}>
                  <div style={{width:'10%'}}>
                    <i className="fa fa-bug" aria-hidden="true" ></i>
                  </div>
                  <div>
                    Advertisement
                  </div>
                </li>
              </Link>
    
    
              </ul>
            </li>
            <div className='card'  style={{height:300,marginTop:40}}>
          <div className='card-header'>
          <b>App Images</b>
          </div>
        {this.state.loading1===false &&   <div style={{border:'none'}} className='card-body'>
          <ul style={{border:'none'}} class="nav nav-tabs flex-column md-tabs" id="myTabMD" role="tablist">
  <li class="nav-item">
    <a class="nav-link active" id="home-tab-md" data-toggle="tab" href="#home-md" role="tab" aria-controls="home-md"
      aria-selected="true">Home</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="profile-tab-md" data-toggle="tab" href="#profile-md" role="tab" aria-controls="profile-md"
      aria-selected="false">Recommendations</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="contact-tab-md" data-toggle="tab" href="#contact-md" role="tab" aria-controls="contact-md"
      aria-selected="false">Past Papers</a>
  </li>
</ul>
<div class="tab-content card pt-5" style={{border:'none',marginTop:0}} id="myTabContentMD">
  <div class="tab-pane fade show active"  id="home-md" role="tabpanel" aria-labelledby="home-tab-md">
       
          <input
          type='file'
          accept="image/*"
          onChange={e=>{
            console.log(e.target.files[0])
            this.setState({
              loading1: true,
            })
            let data = new FormData()
            data.append("fileData", e.target.files[0])
            fetch(url + '/api/addHomeCover', { method: "POST", body: data })
                .then(res => res.json())
                .then(data => {
                    if (data.message === 'Success') {
                        console.log(data)
                        this.setState({
                          loading1:false,
                          text:"Cover Image for Home updated!",
                          show:true
                        })

                    } else {
                        alert('Error Adding Subject')
                    }
                })
          }}
          />
  </div>
  <div class="tab-pane fade"  id="profile-md" role="tabpanel" aria-labelledby="profile-tab-md">
  <input
          type='file'
          accept="image/*"
          onChange={e=>{
            this.setState({
              loading1: true,
            })
            let data = new FormData()
            data.append("fileData", e.target.files[0])
            fetch(url + '/api/addPastPaperCover', { method: "POST", body: data })
                .then(res => res.json())
                .then(data => {
                    if (data.message === 'Success') {
                        console.log(data)
                        this.setState({
                          loading1:false,
                          text:"Cover Image for Past Papers updated!",
                          show:true
                        })

                    } else {
                        alert('Error Adding Subject')
                    }
                })
          }}
          />
  </div>
  <div class="tab-pane fade" id="contact-md" role="tabpanel" aria-labelledby="contact-tab-md">
  <input
          type='file'
          accept="image/*"
          onChange={e=>{
            this.setState({
              loading1: true,
            })
            let data = new FormData()
            data.append("fileData", e.target.files[0])
            fetch(url + '/api/addRecommendationsCover', { method: "POST", body: data })
                .then(res => res.json())
                .then(data => {
                    if (data.message === 'Success') {
                        console.log(data)
                        this.setState({
                          loading1:false,
                          text:"Cover Image for Recommenndations updated!",
                          show:true
                        })

                    } else {
                        alert('Error Adding Subject')
                    }
                })
          }}
          />
  </div>
</div>
          </div>}
          {this.state.loading1 && <div className='card-body'>
            
<CircleLoader
            css={style}
            sizeUnit={"px"}
            size={100}
            color={'#2fbb9f'}
            loading={this.state.loading1}
          />
            </div>}
            </div>
            
          </ul>
          <SweetAlert
          show={this.state.show}
          title="Uplaod Complete"
          text={this.state.text}
          onConfirm={() => this.setState({ show: false })}
          onOutsideClick={() => this.setState({ show: false })}
        />
           </div>
    
        )
    }
}
