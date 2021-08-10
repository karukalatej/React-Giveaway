import React from "react";
import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import AccountSettings from "./pages/AccountSettings";
import AddPost from "./pages/AddPost";
import ClothesCategoryPage from "./pages/ClothesCategoryPage";
import  Bookscategory  from "./pages/Bookscategory";
import  Footwearcategory  from "./pages/Footwearcategeory";
import  Vehiclescategory  from "./pages/Vehiclescategory";
import  Utensilscategory  from "./pages/Utensilscategory";
import  Appliancescategory  from "./pages/Appliancescategory";
import All from "./pages/All"
import Main from "./pages/Main";

function App() {
  return (
    <div>
      <Router>


          <Switch>
          <Route exact path='/' component={Login} />
            <Route path='/accountsettings' component={AccountSettings} />
            <Route path='/home' component={Home} />
            <Route path='/addpost' component={AddPost} />
            <Route path='/Footwear' component={Footwearcategory} />
            <Route path='/Books' component={Bookscategory} />
            <Route path='/Vehicles' component={Vehiclescategory} />
            <Route path='/Utensils' component={Utensilscategory} />
            <Route path='/Appliances' component={Appliancescategory} />
            <Route path='/Clothes' component={ClothesCategoryPage} />
            <Route path='/All' component={All} />
            <Route path='/Profile' component={Main} />
           
          </Switch>

       

      </Router>
    </div>
  )
}

export default App;