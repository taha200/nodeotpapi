import React, { Component } from 'react'
import "./pure.css"
import { Link } from 'react-router-dom';
// First way to import
import { CircleLoader } from 'react-spinners';
import { connect } from 'react-redux';
import { setSessionsActions } from "../store/action/action";
import { Modal as Modall, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';

import Modal from 'react-responsive-modal';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import { url, headers } from "./constants";
import Sidebar from './Sidebar'
import Loader from 'react-loader-spinner'
class Exams extends Component {
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
            modelShippingData: [],
            modelActivity: [],
            modelActivityData: [],
            customer: [],
            renderPage: false,
            visible: true,
            showExamModal: false,
            sessionID: this.props.sessions.length > 0 ? this.props.sessions[0] : "",
            examAt: "",
            name:""
        }



        this.handleDelete = this.handleDelete.bind(this)
        this.createExam = this.createExam.bind(this)
    }




    async componentDidMount() {

        var user = JSON.parse(localStorage.getItem('userr'));
        let loginperson = user.Name
        let islogin = user.login

        if (islogin === 1) {
            this.setState({
                LoginName: loginperson
            })

            fetch(url + "/api/getAllExams",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                }).then(res => res.json())
                .then(dat => {
                    console.log(dat)
                    this.setState({
                        visible: false,
                        renderPage: true,
                    })
                    if (dat.message === 'Success') {
                        this.setState({
                            customer: dat.doc
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
    fatchData() {
        fetch("https://desolate-hamlet-64216.herokuapp.com/api/allTaskers" + this.state.pageNum,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },

            }).then(res => res.json())
            .then(dat => {

                this.setState({
                    customer: dat.data
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
    onSearchUser(e) {
        e.preventDefault()
        const data = {
            name: this.state.searchVal
        }
        fetch("https://desolate-hamlet-64216.herokuapp.com/api/searchUsers",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(res => res.json())
            .then(dat => {
                if (dat.length > 0) {
                    console.log(dat)
                    this.setState({
                        customer: dat,
                        searchVal: ''
                    })
                }
                else {
                    alert("User Not found")
                    this.setState({
                        searchVal: ''
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


    async handleDelete(e, id) {
        let data = {
            id
        }

        fetch(url + "/api/deleteExams",
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(res => res.json())
            .then(data => {
                console.log(data.doc)
                const cust = this.state.customer.filter(user => {
                    return user._id !== id

                })
                this.setState({
                    customer: cust
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
        this.setState({ showExamModal: false });
    };
    createExam() {
        if (this.state.sessionID !== '') {
            if (this.state.examAt!== '') {
                let data = {
                    sessionID: this.state.sessionID,
                    examAt: this.state.examAt,
                    name: this.state.name
                }
                fetch(url + '/api/addExam', { method: "POST", body: JSON.stringify(data), headers: headers })
                    .then(res => res.json())
                    .then(data => {
                        if (data.message === 'Success') {
                            let user = data.doc
                            let updatedUsers = this.state.customer
                            updatedUsers.push(user)
                            this.setState({
                                customer: updatedUsers,
                                showExamModal: false
                            })
                        } else {
                            alert("Can't Create Exam")
                        }
                    }).catch(err => alert("Can't Create Exam"))
            }
            else {
                alert("User not found")
            }
        } else {
            alert("You must select a session")
        }
    }

    render() {
        const { count } = this.state;
        const style = {
            "margin": "auto",
            "width": "50%",


        }
        return (
            <div>
                {this.state.visible && <div className="d-flex justify-content-center" style={{ marginTop: '20%', marginLeft: '2%' }}>
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
                            <Sidebar />
                            <br />


                            <div className="col-md-9">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="card">
                                            <div className="card-header">
                                                <div className='row'>
                                                    <div className='col-md-4'>
                                                        <b style={{ fontSize: 20 }}>All Exams</b>
                                                    </div>
                                                    <div className='col-md-5'>
                                                    </div>
                                                    <div className='col-md-3'>
                                                        <button onClick={() => this.setState({ showExamModal: true })} className='btn btn-primary'>Add Exam</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <div className="row">

                                                    <div style={{ "color": "black", "backgroundColor": "white", "border": "1", "overflow": 'scroll', }} className="table-responsive">



                                                        <div><table className="table table-hover">
                                                            <thead>
                                                                <tr>
                                                                    <th style={{ fontSize: 16, fontWeight: "bold" }}>S.No</th>
                                                                    <th style={{ fontSize: 16, fontWeight: "bold" }}>Name</th>
                                                                    <th style={{ fontSize: 16, fontWeight: "bold" }}>Session ID</th>
                                                                    <th style={{ fontSize: 16, fontWeight: "bold" }}>Date</th>
                                                                    <th></th>
                                                                </tr>
                                                            </thead>

                                                            {this.state.customer && <tbody >


                                                                {this.state.customer.length > 0 && this.state.customer.map((user, index) => {
                                                                         let date = user.examAt.split('-')
                                                                         let dateString = ''
                                                                         dateString+=date[2].substring(0,2) +" - " +date[1] +' - ' +date[0]

                                                                    return (
                                                                        <tr key={index}>
                                                                            <td>{count + index + 1}</td>

                                                                            <td>{user.name}</td>
                                                                            <td>{user.sessionID}</td>
                                                                            <td>{dateString}</td>
                                                                            <td><button onClick={(e) => this.handleDelete(e,user._id)} className='btn btn-danger'>Delete</button></td>
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


                        <Modall centered toggle={() => this.setState({ showExamModal: false })} isOpen={this.state.showExamModal} onClose={this.onCloseModal}>
                            <br />
                            <br />
                            <h2 style={{ textAlign: "center" }}>Add Exam</h2>
                            <br />
                            <div style={{padding:'10px'}}>
                                <input type='text'
                                placeholder='Exam Title'
                                name='name'
                                onChange={e=>{
                                    this.setState({
                                        name:e.target.value
                                    })
                                }}
                                className='form-control'
                                />
                                <br />
                                
                                <p style={{margin:0}}>Select Session ID</p>
                                <select style={{height:'40px',width:"100%",border:"solid 1px lightgray",borderRadius:"5px"}} onChange={e => {
                                    this.setState({
                                        sessionID: e.target.value
                                    })
                                }} type="select" name="select" id="exampleSelect">
                                    {this.props.sessions.length > 0 && this.props.sessions.map((session) => {
                                        return <option value={session.sessionID}>
                                            {session.sessionID}
                                        </option>
                                    })}
                                </select>

                                <br />
                                <br />
                                <p style={{margin:0}}>Exam Date:</p>
                                <input style={{height:'40px',width:"100%",border:"solid 1px lightgray",borderRadius:"5px"}} type="date"
                                name='examAt'
                                onChange={e=>{
                                    this.setState({
                                        examAt:e.target.value
                                    })
                                }}
                                />
                                <br />
                                <br />
                                <div className='row'>
                                    <div className='col-md-5'>

                                    </div>
                                    <div className='col-md-5'>
                                        <button className='btn btn-primary' onClick={this.createExam} >Add Exam</button>
                                    </div>
                                    <div className='col-md-2'>

                                    </div>
                                </div>
                            </div>
                            <br />
                        </Modall>
                    </div>

                }
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
        setSessions: (sessions) => {
            dispatch(setSessionsActions(sessions))
        }
    })
}

export default connect(mapStateToProps, mapActionsToProps)(Exams)