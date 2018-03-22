import React, { Component } from 'react';
import Form from './Form';
import axios from 'axios';
import AdminMemberList from './AdminMemberList'

class Admin extends Component {

    render(){
        //console.log(this.props.members)
        return(
            <div>
            <h3>Admin Panel</h3>
            <Form addMember={this.props.addNewMember} />
            <AdminMemberList members={this.props.members} deleteMember={this.props.deleteMember} />
            </div>
        )
    }
}

export default Admin;