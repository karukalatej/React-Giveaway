import React , {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
class Bookscategory extends React.Component{
    state = {
        ressearch : [],
        usertype : "",
        pid:""
    }
    componentDidMount(){
        axios.post('http://localhost:3001/searchbar',
                     {
                        searchobj : "Books"
                }).then((res) => {
                        this.setState({ressearch : (res.data)});
                        console.log(res.data);
                    
                });
                axios.get('http://localhost:3001/authenticated',{
                    headers :{
                        "x-access-token" :localStorage.getItem("token")
                    }
                }).then((res) =>{
                    this.setState({
                        usertype : res.data[0].type
                    })
                    console.log(res);
                    console.log(this.state.usertype);
                   
                })
    }
    render(){
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
         const requestp = () =>{
            axios.post('http://localhost:3001/requestpost',{
                pid: this.state.pid,
            }, config).then((res) => {
                        
                        console.log(res.data);
                    
                });
          }
        return(
            <div>
                <Header />
                <div class="category">
                            <div class="van">
                                <ul>
                                <li><h2><Link to="/All">All</Link></h2></li>
                                    <li><h2><Link to="/Clothes">Clothes</Link></h2></li>
                                    <li><h2><Link to="/Books">Books</Link></h2></li>
                                    <li><h2><Link to="/Appliances">Appliances</Link></h2></li>
                                    <li><h2><Link to="/Utensils">Utensils</Link></h2></li>
                                    <li><h2><Link to="/Vehicles">Vehicles</Link></h2></li>
                                    <li><h2><Link to="/Footwear">Footwear</Link></h2></li>
                                </ul>
                            </div>
                </div>
                <div class="small-container">
                    <h2 class="title">Products</h2>
                    <div class="row">
                    <ul> 
                                    {this.state.ressearch.map(
                                    (p) => 
                                    <div class="col-4">
                                     <li>
                                        <img src={p.IMAGE} alt="" />
                                        <h3>{p.P_NAME} </h3> 
                                        <h4>{p.P_DECRIPTION}</h4>
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
        )
    }
}
export default Bookscategory