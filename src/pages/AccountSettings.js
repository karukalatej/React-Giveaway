import React , {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Header from '../components/Header';

class AccountSettings extends React.Component{

    state = {
        selectedFile:null,
        userinfo : [],
        nusernme :"",
        nfname :"",
        nlname:"",
        nemail:"",
        nbio:"",
        ncn :"",

    }

    submit = () => {
        confirmAlert({
          title: 'Confirm to submit',
          message: 'Are you sure to save these changes.',
          buttons: [
            {
              label: 'Yes',
              onClick: () => {
                  window.location.replace("http://localhost:3000/profile");
              }
            },
            {
              label: 'No',
              onClick: () => {
                  window.location.replace("http://localhost:3000/accountsettings");
              }
            }
          ]
        });
      };

      delete = () => {
        confirmAlert({
          title: 'Confirm to delete account',
          message: 'Are you sure to save these changes.',
          buttons: [
            {
              label: 'Yes',
              onClick: () => {
                 window.location.replace("http://localhost:3000/login");
              }
            },
            {
              label: 'No',
              onClick: () => {
                  window.location.replace("http://localhost:3000/accountsettings");
              }
            }
          ]
        });
      };


    fileSelectedHandler = event => {
        console.log(event.target.files[0]);
    }

    fileUploadHandler = event =>{
        this.setState({
            selectedFile: event.target.files[0]
        })
    }
    fileUploadHandler = () => {
        const fd = new FormData();
        fd.append('image',this.state.selectedFile, this.state.selectedFile.name);
        axios.post('',fd)
        .then (res => {
            console.log(res);
        }
        );
    }
    componentDidMount(){
        const config = {
            headers : {
                "x-access-token" : localStorage.getItem("token")
            }
        };
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
        const config = {
            headers : {
                "x-access-token" : localStorage.getItem("token")
            }
        };
        //edit profile 
        const edit = () => {
			axios.post('http://localhost:3001/profedit',
				 {
                    fname : this.state.nfname,
				    lname : this.state.nlname,
				    email : this.state.nemail,
				    contact : this.state.ncn,
				    ubio : this.state.nbio,
			},config).then((res) => {
				console.log(res);
			});
		};
       

        return(
            <div>
            <Header/>
                <div class="container bootstrap snippets bootdeys">
                    <div class="row">
                        <div class="col-xs-12 col-sm-9">
                        <form class="form-horizontal">
                            <div class="panel panel-default">
                            <h4 class="panel-title">EDIT PROFILE</h4>
                                 
                            </div>
      
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                </div>
                                <div class="panel-body">
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">Firstname</label>
                                    <div class="col-sm-10">
                                    <input type="tel" class="form-control" 
                                    onChange = {(e) => {
                                        this.setState({
                                            nfname : (e.target.value)
                                        });
                                    }}
                                    />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">Lastname</label>
                                    <div class="col-sm-10">
                                    <input type="tel" class="form-control" 
                                    onChange = {(e) => {
                                        this.setState({
                                            nlname : (e.target.value)
                                        });
                                    }}
                                    />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label"> Bio</label>
                                    <div class="col-sm-10">
                                    <textarea rows="3" class="form-control" 
                                    onChange = {(e) => {
                                        this.setState({
                                            nbio : (e.target.value)
                                        });
                                    }}
                                    ></textarea>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">Contact Number</label>
                                    <div class="col-sm-10">
                                    <input class="form-control" 
                                    onChange = {(e) => {
                                        this.setState({
                                            ncn : (e.target.value)
                                        });
                                    }}
                                    />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">E-mail</label>
                                    <div class="col-sm-10">
                                    <input type="email" class="form-control" 
                                    onChange = {(e) => {
                                        this.setState({
                                            nemail : (e.target.value)
                                        });
                                    }}
                                    />
                                    </div>
                                </div>
                            </div>
                        </div>

                            <div class="panel panel-default">
                                <div class="panel-heading">
                                </div>
                                <div class="panel-body">
                                <div class="form-group">
                                    <div class="col-sm-10 col-sm-offset-2">
                                    <Link to="/profile"><button type="submit" class="btn" onClick={edit}>Save</button></Link>
                                    <Link to="/profile"><button type="reset" class="btn">Cancel</button></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
            </div>
            )
        }
    }
    export default AccountSettings