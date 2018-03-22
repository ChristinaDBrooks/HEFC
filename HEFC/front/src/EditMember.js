import React from 'react';


class EditMember extends React.Component{
    constructor(){
        super();
        this.state = {
            firstname: '',
            lastname:'',
            address:'',
            phone:'',
            mobile:'',
            email:'',
            _id: ''
        }
        this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentWillMount(){
    for(let i = 0; i < this.props.members.length; i++){
            if(this.props.members[i]._id === this.props.match.params.memberId){
                this.setState({
                    firstname: this.props.members[i].firstname,
                    lastname: this.props.members[i].lastname,
                    address: this.props.members[i].address,
                    phone: this.props.members[i].phone,
                    mobile: this.props.members[i].mobile,
                    email: this.props.members[i].email,
                    _id: this.props.members[i]._id
                })
                return
            }
        }
    }

    handleChange(e){
        let keyToUpdate = e.target.name; //lastname
        this.setState({
            [keyToUpdate]: e.target.value
        })

    // handleSubmit(e){
    //     event.preventDefault();
    //     }
      
    }
    render(){
        return (
            <div>
            <h1>Edit Member</h1>
            <form onSubmit={(e)=>this.props.handleUpdate(e, this.state)}>
            <table>
                <tr>
                    <td>Firstname:</td>
                    <td><input name="firstname" value={this.state.firstname} onChange={this.handleChange}></input></td>
                </tr>
                <tr>
                    <td>Lastname:</td>
                    <td><input name="lastname" value={this.state.lastname} onChange={this.handleChange}></input></td>
                </tr>  
                <tr>
                    <td>Address:</td>
                    <td><input name="address" value={this.state.address} onChange={this.handleChange}></input></td>
                </tr>
                <tr>
                    <td>Phone:</td>
                    <td><input name="phone" value={this.state.phone} onChange={this.handleChange}></input></td>
                </tr>
                <tr>
                    <td>Mobile:</td>
                    <td><input name="mobile" value={this.state.mobile} onChange={this.handleChange}></input></td>
                </tr>
                <tr>
                    <td>Email:</td>
                    <td><input name="email" value={this.state.email} onChange={this.handleChange}></input></td>
                </tr>
                <tr><td><button type="submit">Update Member</button></td></tr>
            </table>
            </form>
            </div>
        )
    }
}

export default EditMember;