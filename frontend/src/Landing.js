import React, { Component } from "react";
import axios from "axios";
import { Redirect } from 'react-router-dom'

class Landing extends Component {
    constructor() {
        super();
        this.get = this.get.bind(this);
        this.state = {
            users: [],
            user: "",
            redirect: false
        };
        this.onChange = this.onChange.bind(this);
        this.handleClick = this.handleClick.bind(this);

    }

    componentDidMount() {
        this.get();
    }

    get() {
        const PATH = `http://localhost:3000/users`;
        axios.get(PATH).then(res => { this.setState({ users: res.data }); });
    }

    onChange(e) {
        this.setState({ user: e.target.value });
    }

    handleClick(e) {
        e.preventDefault();
        let obj = this.state.users.find(o => o.name === this.state.user);
        let id = obj.idUsers;
        let name = obj.name;
        localStorage.setItem('idUsers', id);
        localStorage.setItem('name', name);
        this.setState({ redirect: true })
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/Main' />
        }
    }


    render() {
        return (
            <div>
                {this.renderRedirect()}
                <input placeholder="First name" onChange={e => { this.onChange(e) }}>
                </input>
                <button onClick={this.handleClick}>Enter</button>
            </div >
        );
    }

};



export default Landing;