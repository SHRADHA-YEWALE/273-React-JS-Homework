import React, {Component} from 'react';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import axios from 'axios';

class Delete extends Component{


    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            bookId : ""
        }
      
        this.bookIdChangeHandler = this.bookIdChangeHandler.bind(this);        
        this.submitLogin = this.submitLogin.bind(this);
    }

    bookIdChangeHandler = (e) => {
        this.setState({
            bookId : e.target.value
        })
    }

    submitLogin = (e) => {
        e.preventDefault();
        const data = {
            BookID : this.state.bookId
        }
        
        axios.defaults.withCredentials = true;

        axios.post('http://localhost:3001/delete',data)
            .then(response => {
                console.log("Response from server: ",response.data);
                console.log("Status from server : ",response.status);
                if(response.data === 'Book_Id_Not_Exists'){
                    alert("Book Id does not exist!");
                }
                if(response.data === 'Book_Deleted'){
                    alert("Book deleted successfully!");
                    window.open('/home', "_self");
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
            <div class="container">
                <form>
                    <div style={{width: "50%",float: "left"}} class="form-group">
                        <input type="text" onChange = {this.bookIdChangeHandler} class="form-control" name="BookID" placeholder="Search a Book by Book ID" required />
                    </div>
                    <div style={{width: "50%", float: "right"}}>
                            <button onClick = {this.submitLogin} class="btn btn-success" type="submit">Delete</button>
                    </div> 
                </form>
            </div>
            </div>
        )
    }
}

export default Delete;