import React , {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';

class DoneeProfile extends React.Component{
    state ={
        userinfo : []
    }
    componentDidMount(){
        const config = {
            headers : {
                "x-access-token" : localStorage.getItem("token")
            }
        };
        //get the info of current user
        axios.get(`http://localhost:3001/profile`,
            config ,  
        )
        .then(res => {
            if(res.data.message){
				console.log(res.data.message);
			}else{
               
				    this.setState( {userinfo : res.data});
                    console.log(res.data);
              
			}
        })
    }
    render(){
        return(
            <div>
                <Header />
                <div class="container">
        <div class="profile-header">
            <div class="profile-img">
                <img src="Donee.jpeg" width="200" alt=""/>
                <div class="profile-nav-info">
                {this.state.userinfo.map((u) => 
                        <h1 class="user-name">
                        {u.username}
                         </h1>
                        )}
                    <div class="name">
                    {this.state.userinfo.map(
                            (p) =>
                            <p class="fname"> {p.fname} </p>
                            )}
                        {this.state.userinfo.map(
                                 (p) => 
                                 <p class="lname">
                                     {p.lname}  </p>
                            )}
                    </div>
                </div>
                
            </div>
        </div>
        <div class="main-bd">
            <div class="left-side">
                <div class="profile-side">
                    <div class="user-mail">
                    {this.state.userinfo.map((u) =>
                                     <i class="fa fa-envelope">
                                     {u.email} </i>
                                )}
                        <div class="user-bio">
                            <h3>Bio</h3>
                            {this.state.userinfo.map((u) =>
                                     <p class="bio">{u.userBio} </p>
                                 )}
                        </div>
                    </div>
                </div>
            </div>
            <div class="right-side">
                <div class="profile-butn">
                            
                <Link to="/accountsettings"><button class="createbtn">
                                <i class="fa fa-cogs" aria-hidden="true"></i>
                               Account Settings
                            </button></Link> 
                </div>
            </div>
        </div>
    </div>
            </div>
        )
    }
}
export default DoneeProfile