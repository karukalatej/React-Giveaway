import React , {Component} from 'react';
import axios from 'axios';

export default class Requests extends React.Component{
    state={
        requests : [],
        isreq :false,
        mail:"",
        uname:"",
        fname:"",
        lname:""
    }
    componentDidMount(){
        const config = {
            headers : {
                "x-access-token" : localStorage.getItem("token")
            }
        };
            //get the requests for the product
            axios.post('http://localhost:3001/profile/requestpost',{
                pid: this.props.selctectedPID,
            },config).then((res) =>{
                if(res.data.message){
                    this.setState({isreq : false});
                }else{
                   if(!res.data.lenght) {
                       this.setState({isreq : true})
                        this.setState({requests : res.data});
                        console.log(res.data);
                        
                   }else{
                       console.log("error in data");
                   }
                }
                });
    }
    render(){
        const config = {
            headers : {
                "x-access-token" : localStorage.getItem("token")
            }
        };
        //handle the click of give button 
        const handleClick = (email,uname,fname,lname) =>{
            this.setState({
                mail : email,
                uname : uname,
                fname: fname,
                lname : lname
            })
            sendEmail()
            markAsGiven()
        }
        //send Email to specific users (donator and benificiry)
        const sendEmail = () =>{
            axios.post('http://localhost:3001/email',{
                uemial : this.state.mail,
                uname : this.state.uname,
                fname : this.state.fname,
                lname : this.state.lname,
                pid: this.props.selctectedPID,
            },config
               
           ).then((res) => {  
                        console.log(res.data);
                });
        }
        //give Product
        const markAsGiven = () =>{
            axios.post('http://localhost:3001/ProductGiven',{
                pid: this.props.selctectedPID,
            },config
               
           ).then((res) => {  
                 console.log(res.data);
                });
        }

         return(
            <div class="small-container">
                <div class="row">
                    <div class="request">
                    <ul>
                       <h3> Requests :</h3> 
                        {this.state.isreq && 
                            <div class="col-2">
                                {this.state.requests.map((r) =>
                                <li>
                                    <h2>{r.username} : {r.fname} {r.lname}</h2> 
                                    <button class="settings" onClick={() => {handleClick(r.email,r.username,r.fname,r.lname)}}>Give</button>
                                </li>
                            )}
                            </div> || 
                            <h4>No requests !</h4>}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}