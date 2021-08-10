import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';;

class AddPost extends React.Component{
    
    state = {
        title :"",
        description : "",
        catagory : "",
        price : "",
        imageUrl: null,
        imageAlt: null,
        fileInputState: null,
        selectedFile: null,
        previewSource: null,
        imageu:""
    }
    
    render(){

        const { fileInputState , selectedFile , previewSource } = this.state;
       
        const handleFileInputChange = (e) => {
           // console.log("In handle input change")
            const file = e.target.files[0];
            previewFile(file);
            this.setState({
                selectedFile : file,
                fileInputState : (e.target.value)
            })
        };
        
        const previewFile = (file) =>{
            //console.log("In preview file");
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                this.setState({
                    previewSource : reader.result
                })
            }
        };
        
        const handleSubmitFile = (e) => {
           // console.log("IN handelsubmit")
            e.preventDefault();
            if(!selectedFile) return;
            const reader = new FileReader();
            reader.readAsDataURL(selectedFile);
            reader.onload = () => {
                uploadImage(reader.result);
                console.log(reader.result);
            }
            reader.onerror = () => {
                console.log("error in submitting file")
            }
           
        };

        const uploadImage = async (base64EncodedImage) => {
           //console.log(base64EncodedImage);
            try{
               const res = await fetch ('http://localhost:3001/api/upload' , {
                    method: 'POST' ,
                    body: JSON.stringify({data: base64EncodedImage}),
                    headers: {'Content-type': 'application/json'}
                });
                const data = await res.json();
                console.log(data.url);
                this.setState({
                    imageu : data.url
                })
                console.log("image uploaded...");
            }catch(error){
                console.error(error);
            }
        };
        const config = {
            headers : {
                "x-access-token" : localStorage.getItem("token")
            },
          
        };
        //add new product(post)
        const newPost = () => { 
			axios.post('http://localhost:3001/profile/newpost',
				 {
                    pname : this.state.title,
                    pdecription : this.state.description,
                    cid : this.state.catagory,
				    price : this.state.price,
                    imageu : this.state.imageu,
			},config).then((res) => {
                console.log("post added");
			});
		};
        
        return(
            <div>
                <Header />
                <div class="container bootstrap snippets bootdeys">
                    <div class="row">
                        <div class="col-xs-12 col-sm-9">
                        <form class="form-horizontal">
                            <div class="panel panel-default">
                            <h4 class="panel-title">POST AD</h4>
                            </div>
                             
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                </div>
                                <div class="panel-body">
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">Add picture</label>
                                    <div class="col-sm-10">
                                        <form >
                                        <input type="file" name="image" onChange={handleFileInputChange} value={fileInputState} class="form-input"/>
                                        <button type="submit" className="btn" onClick={handleSubmitFile}>Submit</button>
                                        {previewSource && (
                                            <img src={previewSource} alt="chosen" style={{height:'300px'}}/> 
                                        )
                                        }
                                        </form>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">Give title</label>
                                    <div class="col-sm-10">
                                    <input type="tel" class="form-control"  
                                        onChange = {(e) => {
                                        this.setState({
                                        title : (e.target.value)
                                        });
                                    }}/>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">Give Description</label>
                                    <div class="textarea">
                                    <textarea rows="4" class="form-control"
                                        onChange = {(e) => {
                                            this.setState({
                                                description : (e.target.value)
                                            });
                                        }}
                                    ></textarea>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <legend>Select a category</legend>
                                    <p>
                                    <select id = "myList" class="dropdown"
                                        onChange={(e) => {
                                            this.setState({
                                                catagory : (e.target.value)
                                            });
                                        }}
                                    >
                                        <option ></option>
                                        <option value = "3">Clothes</option>
                                        <option value = "5">Books</option>
                                        <option value = "4">Appliances</option>
                                        <option value = "6">Utensils</option>
                                        <option value = "7">Vehicles</option>
                                        <option value = "8">Footwear</option>
                                    </select>
                                    </p>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">Price(if any)</label>
                                    <div class="col-sm-10">
                                    <input type="text" class="form-control"
                                    onChange={(e) => {
                                        this.setState({
                                            price : (e.target.value)
                                        });
                                    }}
                                    />
                                    </div>
                                </div>

                                <div class="form-group">
                                    <div class="col-sm-10 col-sm-offset-2">
                                    <Link to="/profile"><button type="submit" class="btn" onClick={newPost}>Done</button></Link>
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

    export default AddPost