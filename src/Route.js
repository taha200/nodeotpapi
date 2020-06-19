import React, { Component } from 'react';
import { Route, Router } from 'react-router-dom';
import history from './History';
import Reset from "./components/Reset"
import Dashboard from "./components/Dashboard"
import Admin from "./components/admin"
import TaskerList from './sookhay painday componet/taskerlist'
import Earnings from './sookhay painday componet/Earnings'
import CustomerList from './sookhay painday componet/custlist'
import OrderDetails from './sookhay painday componet/orderDetails'
import News from './sookhay painday componet/News'
import WhatsApp from './sookhay painday componet/WhatsApp'
import PastPaper from './sookhay painday componet/PastPaper'
import Featured from './sookhay painday componet/Featured'
import Exams from './sookhay painday componet/Exams'
import Ads from './sookhay painday componet/Ads'
class Routers extends Component {
    render() {
        return (
            <Router history={history}>
                <div>
                    <Route exact path="/" component={Admin} />   
                    <Route  path="/Dashboard" component={Dashboard} />   
                    <Route  path="/Reset" component={Reset} />   
                      {/** */}
                      <Route  path="/Students" component={TaskerList} />   
                      <Route  path="/Subjects" component={CustomerList} />   
                      <Route  path="/Sessions" component={Earnings} />     
                      <Route  path="/Lectures" component={OrderDetails} />   
                      <Route  path="/News" component={News} />   
                      <Route  path="/PastPapers" component={PastPaper} />   
                      <Route  path="/Whatsapp" component={WhatsApp} />   
                      <Route  path="/Featured" component={Featured} />   
                      <Route  path="/Exams" component={Exams} />   
                      <Route  path="/Advertisement" component={Ads} />   
                </div>
            </Router>
        )
    }
}

export default Routers;