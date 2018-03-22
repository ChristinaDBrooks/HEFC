import React from 'react';

class Form extends React.Component{
    constructor(){
        super();
        this.collectValues = this.collectValues.bind(this)
    }
    collectValues(event){
        event.preventDefault();
        let member = {
            firstname : this.refs.firstname.value,
            lastname : this.refs.lastname.value,
            address : this.refs.address.value,
            phone : this.refs.phone.value,
            mobile : this.refs.mobile.value,
            email : this.refs.email.value
        }
        this.props.addMember(member);
    }

    render(){
        return (
            <div>
            <form class="border-class" onSubmit={this.collectValues}>
            <h4>Add a member</h4>
            <table>
            <tr>
                <td>Firstname:</td>
                <td><input type="text" ref="firstname" /></td>
                <td>Lastname:</td>
                <td><input type="text" ref="lastname" /></td>
                </tr>
            <tr>
                <td>Address:</td>
                <td colSpan={3}><input type="text" size ={54} ref="address" /></td>
            </tr>
            <tr>
                <td>Phone:</td>
                <td><input type="text" ref="phone" /></td>
                <td>Mobile:</td>
                <td><input type="text" ref="mobile" /></td>
            </tr>
            <tr>
                <td>Email:</td>
                <td colSpan={3}><input type="text" ref="email" size ={54} /></td>
            </tr>
            <tr><td colSpan={4} class="text-center"><input type="submit" value="Add member" /></td></tr>
            </table>
            </form>
            </div>
        )
    }
}

export default Form;