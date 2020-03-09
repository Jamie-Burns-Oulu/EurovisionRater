import React, { Component } from "react";
import axios from "axios";
import { Redirect, withRouter } from 'react-router-dom'
import './CSS/Main.css';

class Main extends Component {
    constructor() {
        super();
        this.get = this.get.bind(this);
        this.state = {
            countries: [],
            redirect: false,
            idUser: "",
            name: "",
            ratings: [],
            countryForRating: ""
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.setState({ name: localStorage.getItem('name') });
        this.setState({ idUser: localStorage.getItem('idUsers') });
        this.get();
    }


    get() {
        const PATH = `https://evr.herokuapp.com/`;
        axios.get(PATH + "countries").then(res => { this.setState({ countries: res.data }); });
        axios.get(PATH + "ratings/" + localStorage.getItem('idUsers')).then(res => { this.setState({ ratings: res.data }); });
    }


    handleClick(e) {
        e.preventDefault();
        this.setState({ countryForRating: e.target.id })
        this.setState({ redirect: true });

    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to={{
                pathname: '/Rating',
                countryForRating: this.state.countryForRating
            }} />
        }
    }


    render() {
        return (
            <div>
                {this.renderRedirect()}
                <div className="app-name">
                    Eurovision Rater <span className="user-name">{this.state.name}</span>
                </div>

                <table className="countries-table">
                    <tbody>
                        <tr>
                            <th colSpan="2">Country</th>
                            <th className="overall-th">Overall</th>
                        </tr>

                        {this.state.countries.map((country) =>
                            <tr key={country.idCountries} id={country.idCountries} onClick={this.handleClick} className="Country_Row">
                                <td id={country.idCountries} >
                                    <img id={country.idCountries} src={country.flag} alt={"Flag of " + country.name} className="Flag_Image" />

                                </td>
                                <td id={country.idCountries}>
                                    {country.idCountries}. {country.name}
                                </td>
                                {this.state.ratings.map(rate => (
                                    country.idCountries === rate.country_id ? <td id={country.idCountries} className="overall-ratings"> {rate.overall} </td> : <td className="trash" />
                                ))}
                            </tr>
                        )}
                    </tbody>
                </table>
            </div >
        );
    }

};


export default withRouter(Main);