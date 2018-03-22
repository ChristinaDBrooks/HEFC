import React from 'react';
import {Link} from 'react-router-dom';


class AdminMember extends React.Component{
    render(){
        return (
            <tr>
            <td>{this.props.member.firstname}{" "}{this.props.member.lastname}</td>
            <td>{this.props.member.phone}</td>
            <td>{this.props.member.mobile}</td>
            <td>{this.props.member.email}</td>
            <td>{this.props.member.address}</td>
            <td><Link to={`/EditMember/${this.props.member._id}`}>Edit</Link></td>
            <td><button name="delete" onClick ={()=>this.props.deleteMember(this.props.member._id)} >Delete</button></td>
            </tr>
        )
    }
}

export default AdminMember;
