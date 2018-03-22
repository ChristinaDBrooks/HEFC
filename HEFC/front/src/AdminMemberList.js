import React from 'react';
import AdminMember from './AdminMember';

class AdminMemberList extends React.Component{
    constructor(){
        super();
        this.state = {
            search: ''
        };
    this.updateSearch = this.updateSearch.bind(this);
    }

    updateSearch(event){
        this.setState({search: event.target.value});
    }

    render(){
        let filteredMembers = this.props.members.filter(
            (member)=>{
               return member.firstname.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
            }
        );
        return (
            <div class="border-class">
                <h4>Edit Member Info</h4>
                <label>Search by Name: 
                    <input type="text" 
                           value={this.state.search} 
                           onChange={this.updateSearch} />
                </label>
                <div class="table-responsive">
                <table class="table table-hover">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Mobile</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Edit</th>
                        <th>Delete</th>

                    </tr>
                </thead>
                <tbody>
                    {filteredMembers.map((member)=>{
                        return <AdminMember member={member} deleteMember={this.props.deleteMember} key={member._id} />
                    })}
                </tbody>
                </table>
                </div>
            </div>
        )
    }
}

export default AdminMemberList;