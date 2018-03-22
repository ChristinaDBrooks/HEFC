import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class LoginForm extends React.Component{
    constructor(){
        super();
        this.state = {value:''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event){
        this.setState({value: event.target.value});
    }
    
    handleSubmit(event){
        event.preventDefault();
        axios.post('http://localhost:8080/login', {password: this.state.value}) // inside {} becomes req.body
        .then(result=>{
            if (result.data.length === 0){
                sessionStorage.clear();
                window.location = '/'
            }
            else{
            console.log(result.data[0].designation)
            sessionStorage.setItem("designation", result.data[0].designation );
              if(result.data[0].designation === 'superAdmin'){
                this.props.history.push('/admin')
              }  
              else{
                this.props.history.push('/members')
              }
              
            
            this.props.setLoggedIn();
            }
        })
        .catch(error=>{
        console.log(error);
        })
        }

    render(){
        console.log(this.props)
        return(
            <div>
            <form onSubmit={this.handleSubmit}>
            <label>
                Password: <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Login" />
            </form>
            </div>
        )
    }
}

export default withRouter(LoginForm);