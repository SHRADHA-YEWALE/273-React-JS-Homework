import React, {Component} from 'react';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import axios from 'axios';



class Create extends Component{

    //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            bookId : "",
            title : "",
            author : ""
        }
        //Bind the handlers to this class
        this.bookIdChangeHandler = this.bookIdChangeHandler.bind(this);
        this.bookTitleChangeHandler = this.bookTitleChangeHandler.bind(this);
        this.bookAuthorChangeHandler = this.bookAuthorChangeHandler.bind(this);
        
        this.submitLogin = this.submitLogin.bind(this);
    }

    componentWillMount(){
        this.setState({
            authFlag : false
        })
    }
   
    bookIdChangeHandler = (e) => {
        this.setState({
            bookId : e.target.value
        })
    }
   
    bookTitleChangeHandler = (e) => {
        this.setState({
            title : e.target.value
        })
    }

    bookAuthorChangeHandler = (e) => {
        this.setState({
            author : e.target.value
        })
    }


    submitLogin = (e) => {

        e.preventDefault();
        const data = {
            BookID : this.state.bookId,
            Title : this.state.title,
            Author : this.state.author
        }
        
        axios.defaults.withCredentials = true;

        axios.post('http://localhost:3001/create',data)
            .then(response => {
                console.log("Response from server: ",response.data);
                if(response.data === 'Book_Already_Exists'){
                    alert("Book Already Exists!");
                    window.open('/create','_self');
                }
                
                if(response.data === 'Book_Successfully_Added'){
                    alert("Book Added Successfully!");
                    
                    window.open('/home','_self');
                }
            });
            
    }

    render(){
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/login"/>
        }
        return(
            <div>
                {redirectVar}
                <br/>
                <div class="container">
                    <form action="http://127.0.0.1:3000/create" method="post">
                        <div style={{width: '30%'}} class="form-group">
                            <input  type="text" onChange = {this.bookIdChangeHandler} class="form-control" name="BookID" placeholder="Book ID" required/>
                        </div>
                        <br/>
                        <div style={{width: '30%'}} class="form-group">
                                <input  type="text" onChange = {this.bookTitleChangeHandler} class="form-control" name="Title" placeholder="Book Title" required/>
                        </div>
                        <br/>
                        <div style={{width: '30%'}} class="form-group">
                                <input  type="text" onChange = {this.bookAuthorChangeHandler}  class="form-control" name="Author" placeholder="Book Author" required/>
                        </div>
                        <br/>
                        <div style={{width: '30%'}}>
                            <button onClick = {this.submitLogin} class="btn btn-success" type="submit">Create</button>
                        </div> 
                    </form>
                </div>
            </div>
        )
    }
}

export default Create;