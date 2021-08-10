import React, { Component } from 'react';
import axios from 'axios';
import Profile from './Profile';
import DoneeProfile from './DoneeProfile';

export class Main extends Component {
    state ={
        role :"",

    }
    componentDidMount(){
        axios.defaults.withCredentials = true;
        axios.get("http://localhost:3001/authenticated",{
            headers :{
                "x-access-token" :localStorage.getItem("token")
            }
        }).then((res) => {
             this.setState({role : res.data[0].type});
		    console.log(res.data);

    });
    }
    render() {
        return (
            <div>
                {/* Role wise open the profile */}
               {this.state.role == "donator" && <Profile />}
               {this.state.role == "beneficiar" && <DoneeProfile/>}
               {this.state.role == "proxy" && <DoneeProfile/>}
            </div>
        )
    }
}

export default Main