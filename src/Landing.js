import React, { Component } from "react";
import axios from "axios";
import { Redirect } from 'react-router-dom'
import './CSS/Landing.css';

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
        this.createUser = this.createUser.bind(this);
    }

    componentDidMount() {
        if (localStorage.getItem('idUsers') && localStorage.getItem('name')) {
            this.setState({ redirect: true })
        };
        this.get();
    }

    get() {
        const PATH = `https://evr.herokuapp.com/users`;
        axios.get(PATH).then(res => { this.setState({ users: res.data }); });
    }

    onChange(e) {
        this.setState({ user: e.target.value });
    }

    handleClick() {
        let foundUser = this.state.users.find(o => o.name === this.state.user);
        if (foundUser) {
            let id = foundUser.idUsers;
            let name = foundUser.name;
            localStorage.setItem('idUsers', id);
            localStorage.setItem('name', name);
            this.setState({ redirect: true })
        } else {
            if (this.state.user.length < 1) {
                alert("Enter Name")
            } else {
                this.createUser(this.state.user);
            }

        }

    }

    createUser(Name) {
        const PATH = `https://evr.herokuapp.com/users/`;
        axios.post(PATH, { Name }).then(a => {
            this.get();
            this.handleClick();
        })

    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/Main' />
        }
    }


    render() {
        return (
            <div className="grid-container">
                {this.renderRedirect()}
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div className="welcome">
                    Welcome to Eurovision Rater
                </div>
                <div></div>
                <div></div>
                <div>
                    <input className="name-input" placeholder="Name" onChange={e => { this.onChange(e) }} />
                    <button className="start-btn" onClick={this.handleClick}>Start</button>
                </div >
                <div></div>
            </div>
        );
    }

};



export default Landing;