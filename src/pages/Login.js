import React , {Component} from 'react';
import axios from 'axios';
import Home from './Home';

class Login extends React.Component{
	state = {
		usernamel : "",
		passwordl : "",
		loginStatus :false,
		usernreg : "",
		userfname :"",
		userlname :"",
		userpass :"",
		useremail:"",
		usercn:"",
		typeofuser:"",
		isRegister:false
	} 
	render(){
		//new registration
		const register = () => {
			axios.post('http://localhost:3001/register',
				 {
				username : this.state.usernreg,
				fname : this.state.userfname,
				lname : this.state.userlname,
				password : this.state.userpass,
				email : this.state.useremail,
				contact_no : this.state.usercn,
				typeofuser : this.state.typeofuser,
			}).then((res) => {
				console.log(res);
				if(!res.err){
					this.setState({isRegister : true})
				}
			});
		};
		//login 
		const login = () => {
			axios.post('http://localhost:3001/login',
				 {
				username : this.state.usernamel,
				password : this.state.passwordl,
	
			}).then((res) => {
				if(!res.data.auth){
					this.setState({loginStatus : false});
				}else{
					console.log(res.data);
					localStorage.setItem("token", res.data.tokens)
					this.setState({loginStatus :true});
					
				}
				console.log(res);
			});
		};

		const handleClick = () =>{
			login()
        }
        return(
			
			<div >
			{/* Check the login states and if user has sucesfully logged in then open the home page*/}
			{this.state.loginStatus ==true && <Home /> ||
		    <div class="login-html">
				<div class="sym">
					<img src="logo.jpeg" width="125px"/>
				</div>
				<input id="tab-1" type="radio" name="tab" class="sign-in"></input><label for="tab-1" class="tab">Log In</label>
				<input id="tab-2" type="radio" name="tab" class="sign-up"></input><label for="tab-2" class="tab">Sign Up</label>
			<div class="login-form">
				<div class="sign-in-htm">
					<div class="group">
						<label for="user" class="label">Username</label>
						<input id="user" type="text" class="input"
							onChange = {(e) => {
								this.setState({
									usernamel : (e.target.value)
								});
							}}
						></input>
					</div>
					<div class="group">
						<label for="pass" class="label">Password</label>
						<input id="pass" type="password" class="input" data-type="password"
						onChange = {(e) => {
							this.setState({
								passwordl : (e.target.value)
							});
						}}
						></input>
					</div>
				
					<div class="group">
						<input type="submit" class="button" value="Login"
						onClick ={() => {handleClick()}}
						></input>
					</div>
					{this.state.loginStatus==false && <h2>You have not logged In</h2>}
				
				</div>
				
				<div class="sign-up-htm">
				{/* show if user has succesfully registered*/}
				{this.state.isRegister==true &&<div class="foot-lnk">
						<label for="tab-1">You have Signed In Successfully </label>
					</div> ||
					<div>
					<div class="group">
						<label for="user" class="label">Username</label>
						<input id="user" type="text" class="input"
						onChange = {(e) => {
							this.setState({
								usernreg : (e.target.value)
							});
						}}
						/>
					</div>
					<div class="group">
						<label for="user" class="label">First Name</label>
						<input id="user" type="text" class="input"
						onChange = {(e) => {
							this.setState({
								userfname :(e.target.value)
							});
						}}
						></input>
					</div>
					<div class="group">
						<label for="user" class="label">Last Name</label>
						<input id="user" type="text" class="input"
						onChange = {(e) => {
							this.setState({
								userlname : (e.target.value)
							});
						}}
						></input>
					</div>
					<div class="group">
						<label for="user" class="label">Choose a Category</label>
						<select name = "user" id = "user"
							onChange={(e) => {
								this.setState({
									typeofuser : (e.target.value)
								});
							}}
						>
							<option></option>
							<option value = "donator">Donator</option>
							<option value = "beneficiary">Beneficiary</option>
							<option value = "proxy">On behalf of beneficiary(PROXY)</option>
						</select>
					</div>
					<div class="group">
						<label for="pass" class="label">Password</label>
						<input id="pass" type="password" class="input" data-type="password"
						onChange = {(e) => {
							this.setState({
								userpass : (e.target.value)
							});
						}}
						></input>
					</div>
			
					<div class="group">
						<label for="pass" class="label">Email Address</label>
						<input id="pass" type="text" class="input"
						onChange = {(e) => {
							this.setState({
								useremail : (e.target.value)});
						}}
						></input>
					</div>
					<div class="group">
						<label for="pass" class="label">Contact No</label>
						<input id="pass" type="text" class="input"
						onChange = {(e) => {
							this.setState({
								usercn : (e.target.value)
							});
						}}
						></input>
					</div>
					<div class="group">
						<input type="submit" class="button" value="Sign In"
							onClick ={register}
						></input>
					</div>
					<div class="hr"></div>
					<div class="foot-lnk">
						<label for="tab-1">Already Member?</label>
					</div>

				</div>
					}
					</div>
			</div>
    </div>}
  </div>
  )
    }
}
export default Login