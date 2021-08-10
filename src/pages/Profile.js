import React , {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Requests from './Requests';
import Header from '../components/Header';

class Profile extends React.Component{
    state ={
        userinfo : [],
        posts :[],
        isreq :[],
        requests :[],
        pid:"",
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
        //get the products of user
        axios.get(`http://localhost:3001/profile/post`,
            config ,  
        )
        .then(res => {
            if(res.data.message){
				console.log(res.data.message);
			}else{
                if(res.data.message){
                    console.log(res.data.message);
                }else{
                   
                        this.setState( {posts : res.data});
                        console.log(res.data);
                  
                }
              
			}
        })
    }
    
    render(){
       const handleClick = (id) =>{
            this.setState({
                pid :id
            })   
            deletep()
       }
       //delete the product 
       const deletep = () =>{
        axios.post('http://localhost:3001/profile/deletepost',{
            pid: this.state.pid,
        }   
       ).then((res) => {  
            console.log(res.data);
            });
    }
        return(
            <div>
                <Header />
                    <div class="container">
        <div class="profile-header">
            <div class="profile-img">
                <img src="Donator.jpeg" width="200" alt=""/>
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
                            <h3> Bio </h3>
                                 {this.state.userinfo.map((u) =>
                                     <p class="bio">{u.userBio} </p>
                                )}
                                  
                        </div>
                        <div class="profile-btn">
                        <Link to="/accountsettings"> <button class="chatbtn">
                            <i class="fa fa-cogs" aria-hidden="true"></i>
                           Account Settings
                            </button></Link>
                            <button class="settings">
                                <i class="fa fa-plus"></i>
                                <Link to="/AddPost">Post</Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right-side">
                <div class="profile-body">
                    <h3>Your Recent Posts</h3>
                        <ul> 
                            {this.state.posts.map(
                            (p) => 
                                    <div class="col-8">
                                        <li>
                                        <img src={p.IMAGE} alt="" />
                                        <h3>{p.P_NAME} </h3> 
                                        <h4>{p.P_DECRIPTION}</h4>
                                        <button class="settings" onClick={() => {handleClick(p.P_ID)}} >Delete</button>
                                        {p.given == 0 && 
                                        <Requests selctectedPID={p.P_ID} /> || "Product is Given"}
                                        </li>
                                    </div>  
                                )}
                        </ul>
                </div>
            </div>

        </div>
    </div>
            </div>
        )
    }
}
export default Profile;