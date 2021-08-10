import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
class Home extends React.Component{
    state = {
        products : [],
        topu : [],
        pid:"",
        uid:"",
        usertype:"",
        isauth :false

    }
    
    componentDidMount(){
        //get the recent products
        axios.post(`http://localhost:3001/home/post`)
        .then(res => {
            if(res.data.message){
				this.setState(res.data.message);
			}else{
               if(!res.data.lenght) {
                   const products = res.data;
				    this.setState({products});
                    console.log({products});
                    
               }else{
                   console.log("error in data");
               }
			}
        });
        //check the user authentication
        axios.get('http://localhost:3001/authenticated',{
            headers :{
                "x-access-token" :localStorage.getItem("token")
            }
        }).then((res) =>{
            if(!res.data){
                this.setState({
                    isauth : false
                })
            }else{
                this.setState({
                    uid : res.data.id,
                    isauth : true,
                    usertype : res.data[0].type,   
                })
                console.log(res);
                console.log(this.state.usertype);
            }
        });
        //get top dontors
        axios.post(`http://localhost:3001/home/donator`)
        .then(res => {
            if(res.data.message){
				this.setState(res.data.message);
			}else{
               if(!res.data.lenght) {
                   const topu = res.data;
				    this.setState({topu});
                    console.log({topu});
                    
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
            },
          
        };
        const handleClick = (id) =>{
            this.setState({
                pid : id,
            })
            requestp()
        }
        //send request for product
        const requestp = () =>{
            axios.post('http://localhost:3001/requestpost',{
                pid: this.state.pid,
            }, config).then((res) => {
                        
                        console.log(res.data);
                    
                });
        }
        
        return(
            <div> 
                <Header/>
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
                <div class="row">
                            <div class="col-2">
                                <h1>Keep Donating!</h1>
                                <p> We make a living by what we get,{'\n'}We make a life by what we give. </p>
                                <a href="" class="btn"><Link to="/All">Explore more &#8594;</Link></a>
                            </div>
                            <div class="col-2">
                                <img src="mainpgimage.jpeg"/>
                                {'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}
                            </div>
                        </div>
               {/* 
                <!----------list of products----------> */}
                <div class="small-container">
                    <h2 class="title">Products</h2>
                    <div class="row">
                            <ul> 
                            {this.state.products.map(
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
                {/* <!---------------Top donors-----------------> */}
                <div class="top">
                    <h2 class="title">TOP DONORS OF THE MONTH</h2>
                    <h3>CONGRATULATIONS!!!</h3>
                    <div class="small-container">
                        <div class="row">
                            <div class="col-5">
                               {this.state.topu.map((tu)=>
                                   <h2>{tu.fname} {tu.lname}</h2>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default Home;