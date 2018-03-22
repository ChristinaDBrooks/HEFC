import React from 'react';
import Member from './Member';

class MemberList extends React.Component{
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
                return member.firstname.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                        member.lastname.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ;
            }
        );
        return (
            <div>
                <h1>Our Members</h1>
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
                    </tr>
                </thead>
                <tbody>
                    {filteredMembers.map((member)=>{
                        return <Member member={member} key={member._id} />
                    })}
                </tbody>
                </table>
                </div>
            </div>
        )
    }
}

export default MemberList;