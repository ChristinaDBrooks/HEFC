import React from 'react';


class Member extends React.Component{
    render(){
        return (
            <tr>
            <td>{this.props.member.firstname}{" "}{this.props.member.lastname}</td>
            <td><a href={`tel:${this.props.member.phone}`}>{this.props.member.phone}</a></td>
            <td><a href={`tel:${this.props.member.mobile}`}>{this.props.member.mobile}</a></td>
            <td><a href={`mailto:${this.props.member.email}`}>{this.props.member.email}</a></td>
            <td><a href={`http://maps.google.com/?q=${this.props.member.address}`} target="_blank">{this.props.member.address}</a></td>
            </tr>
        )
    }
}

export default Member;