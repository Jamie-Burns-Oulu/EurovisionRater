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
        this.onChange = this.onChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.setState({ name: localStorage.getItem('name') });
        this.setState({ idUser: localStorage.getItem('idUsers') });
        this.get();
    }

    get() {
        const PATH = `http://localhost:3000/`;
        axios.get(PATH + "countries").then(res => { this.setState({ countries: res.data }); });
        axios.get(PATH + "ratings/" + localStorage.getItem('idUsers')).then(res => { this.setState({ ratings: res.data }); });
    }

    onChange(e) {

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
                USER => {this.state.name}
                <table>
                    <tbody>
                        <tr>
                            <th>Country</th>
                            <th>Overall</th>
                        </tr>
                        {this.state.countries.map(country => (
                            <tr key={country.idCountries} id={country.idCountries} onClick={this.handleClick} className="Country_Row">
                                <td id={country.idCountries} >{country.name}
                                    <img id={country.idCountries} src={country.flag} alt={"Flag of " + country.name} className="Flag_Image" />
                                </td>
                                {this.state.ratings.map(rate => (
                                    country.idCountries === rate.country_id ? <td id={country.idCountries}> {rate.overall} </td> : <td className="trash" />
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div >
        );
    }

};


export default withRouter(Main);