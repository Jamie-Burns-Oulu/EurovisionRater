import React, { Component } from "react";
import axios from "axios";
import { withRouter } from 'react-router-dom'
import './CSS/Main.css';

class Rating extends Component {
    constructor(props) {
        super(props);
        this.get = this.get.bind(this);
        this.state = {         
            name: "",          
            countryForRating: this.props.location.countryForRating
        };    
    }

    componentDidMount() {
        this.setState({ name: localStorage.getItem('name') });
        this.setState({ idUser: localStorage.getItem('idUsers') });
        this.get();
        console.log(this.props.location.countryForRating)
    }

    get() {
        const PATH = `http://localhost:3000/`;
        axios.get(PATH + "countries").then(res => { this.setState({ countries: res.data }); });
        axios.get(PATH + "ratings/" + localStorage.getItem('idUsers')).then(res => { this.setState({ ratings: res.data }); });
    }


    render() {
        return (
            <div>
                Hello {this.state.name}
            </div >
        );
    }

};


export default withRouter(Rating);