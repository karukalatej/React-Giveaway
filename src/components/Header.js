import React , {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
class Header extends React.Component{
    state = {
        searchv : "",
        ressearch : []
    }
    render(){
        //serch the products of enterd catagory
        const search = () =>{
            axios.post('http://localhost:3001/searchbar',
                     {
                        searchobj : this.state.searchv
                }).then((res) => {
                       if(res.data.message){
                           this.setState({ressearch : null});
                       } this.setState({ressearch : (res.data)});
                        console.log(res.data);
                    
                });
          }
          const config = {
            headers : {
                "x-access-token" : localStorage.getItem("token")
            },
          
        };
        const handleClick = (id) =>{
            this.setState({
                pid : id
            })
            requestp()
        }
        //request send for product
         const requestp = () =>{
            axios.post('http://localhost:3001/requestpost',{
                pid: this.state.pid,
            }, config).then((res) => {
                        
                        console.log(res.data);
                    
                });
          }
        return(
            <div>
                 <div class="header">
                    <div class="container">
                        <div class="navbar">
                            <div class="logo">
                                <img src="logo.jpeg" width="125px"/>
                            </div>
                            <nav>
                            <ul>
                                <li><div class="srchbar">
                                        <input type="tel" class="form-control" 
                                           onChange = {(e) => {
                                            this.setState({
                                                searchv : (e.target.value)
                                            });
                                        }

                                        }/>
                                    </div></li>
                                <li><img src="search.jpeg" onClick={search} width="30px" height="30px"/></li>
                                <li><Link to="/home"><img src="house.jpeg" width="30px" height="30px"/></Link></li>
                                <li><Link to="/profile"><img src="prof.jpeg" width="30px" height="30px"/></Link></li>
                                <li><Link to="/" onClick={() =>localStorage.clear()}><img src="logout.jpeg" width="30px" height="30px"/></Link></li>
                            </ul>
                            </nav>
                        </div>
                        <div class="small-container">
                    <div class="row">
                            <ul> 
                            {this.state.ressearch.map(
                            (p) => 
                                    <div class="col-4">
                                       
                                        <li>
                                        <img src={p.IMAGE} alt="" />
                                        <h4>{p.P_NAME} </h4> 
                                        <p>{p.P_DECRIPTION}</p>
                                        <p>Price : {p.price}</p>
                                        {this.state.usertype == "donator" && <h1></h1>||
                                        <button class="settings" 
                                          onClick={() => {handleClick(p.P_ID)}}
                                              >Request</button>
                                        }
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

export default Header