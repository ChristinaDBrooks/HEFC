import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import MemberList from './MemberList'
import Form from './Form';
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import Admin from './Admin';
import EditMember from './EditMember';
import DeleteMemer from './DeleteMember';
import LoginForm from './LoginForm';

class App extends Component {
  constructor(){
    super();
    this.state ={
      members:[],
      loggedIn: false
    };
    // bindings reside here
    this.addMember = this.addMember.bind(this);
    this.deleteMember = this.deleteMember.bind(this);
    this.setLoggedIn = this.setLoggedIn.bind(this);
    this.setLoggedOut = this.setLoggedOut.bind(this);
  }

  componentWillMount(){
    // first get the members using a GET request via axios
    axios.get('http://localhost:8080/members')
      .then(result =>{
        // members live inside result data
        this.setState({
          members: result.data
        });
      })
      .catch(error =>{
        console.log(error);
      })
    }

// addMember
addMember(member){
  // first send the new member to db
  axios.post('http://localhost:8080/members', member)
    .then(result=>{
      let savedMember = result.data;
      let copy = Array.from(this.state.members);
      copy.push(savedMember);
      this.setState({
        members:copy
      })
    })
    .catch(error=>{
      console.log(error);
    })
  }

  // updateMember
  updateMember(e, value){
    e.preventDefault();
    // 1. construct the update data we are gonna send in the body
    // a. find the member object in state that matches idToUpdate

    // 2. send the PUT request with the updateDAta in the body
    let url = "http://localhost:8080/members/" + value._id;
    axios.put(url, value)
         .then(result => {
          console.log('value:', value, 'updatedinMongo:', result.data)
          let editedMember = result.data;
          let copy = Array.from(this.state.members);
          copy.push(editedMember);
          this.setState({
            members:copy
          })
        })
        .catch(error=>{
          console.log(error);
        })
    }

// deleteMember
deleteMember(_id){
  axios.delete('http://localhost:8080/members', {data:{_id}})
  .then(result=>{
    let editedMembers = this.state.members.filter(member =>{
      return member._id !== _id
    })
    this.setState({
      members: editedMembers
    })
    console.log('Deleted')
  })
  .catch(error=>{
    console.log(error)
  })
  }

// login
setLoggedIn(){
  this.setState({
    loggedIn: true
  })
}
setLoggedOut(){
  sessionStorage.clear();
  this.setState({
    loggedIn: false
  })
}

  render() {
    let loggedIn = sessionStorage.getItem('designation') !== null
    let form;
    if(loggedIn){
      form = <button onClick={this.setLoggedOut}>log out</button>;
    }
    else{
      form = <LoginForm setLoggedIn={this.setLoggedIn} />;
    }
    // console.log(this.props)
    return (
      <div className="App">
      <h1>Welcome to Communidex</h1>
      {/* {sessionStorage.getItem('designation') ? null: <LoginForm />} */}
      {form}
          <nav>
            <button><Link to="members">Members</Link></button>
            <button><Link to="admin">Admin</Link></button>
          </nav>

          <Switch>
          <Route path="/members" render={()=> (sessionStorage.getItem('designation') === 'superAdmin' || sessionStorage.getItem('designation')
           === 'generaluser') ? <MemberList members={this.state.members} /> : <Redirect to="/"/>} />
          <Route path="/admin" render={()=>sessionStorage.getItem('designation') === 'superAdmin' ? <Admin members={this.state.members} addNewMember={this.addMember} deleteMember={this.deleteMember} /> : <Redirect to="/members"/>} />
          <Route path="/EditMember/:memberId" render={(props)=> <EditMember members={this.state.members} match={props.match} handleUpdate={this.updateMember}/>} />
          </Switch>
      </div>
    );
  }
}

export default App;