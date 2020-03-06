import React, { Component } from "react";
import axios from "axios";
import { Redirect, withRouter } from 'react-router-dom'
import './CSS/Main.css';

class Rating extends Component {
    constructor(props) {
        super(props);
        this.get = this.get.bind(this);
        this.state = {
            name: "",
            idUser: "",
            countryForRating: this.props.location.countryForRating,
            redirect: false,
            Overall: 0,
            Song: 0,
            Performance: 0,
            Comment: ""
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
        const PATH = `http://localhost:3000/ratings/`;
        axios.get(PATH + localStorage.getItem('idUsers')).then(res => {
            let countryID = Number(this.props.location.countryForRating)
            let existingRating = res.data.find(r => r.country_id === countryID);
            if (!existingRating) {
                let [overall, song, performance, comment] = [0, 0, 0, ""]
                let country_id = countryID;
                let user_id = localStorage.getItem('idUsers');
                axios.post(PATH, {
                    overall,
                    song,
                    performance,
                    comment,
                    user_id,
                    country_id
                })
                    .then(res => {
                        console.log(res);
                    });
            } else {
                this.setState({ Overall: existingRating.overall });
                this.setState({ Song: existingRating.song });
                this.setState({ Performance: existingRating.performance });
                this.setState({ Comment: existingRating.comment });
                console.log(this.state);
            }
        });
    }

    onChange = e => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
        this.updateRating(e.target.name)
    };

    updateRating(toUpdate) {
        const PATH = `http://localhost:3000/ratings/`;
        let country = this.state.countryForRating;
        let user = this.state.idUser;
        let overall = this.state.Overall;
        axios.put(PATH + toUpdate, {
            overall,
            user,
            country
        })
            .then(res => {
                console.log(res);
            });

        console.log(toUpdate);

    }

    handleClick(e) {
        e.preventDefault();
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
                {this.state.name}
                <br />
                Overall (1-10):
                <input type="number" name="Overall"
                    onChange={this.onChange} placeholder={this.state.Overall} />
                <br />
                Song (1-5):
                <input type="number" name="Song"
                    onChange={this.onChange} placeholder={this.state.Song} />
                <br />
                Show (1-5):
                <input type="number" name="Performance"
                    onChange={this.onChange} placeholder={this.state.Performance} />
                <br />
                Comment:
                <input type="text" name="Comment"
                    onChange={this.onChange} placeholder={this.state.Comment} />
                <br />    <br />    <br />    <br />
                <button onClick={this.handleClick}>Back</button>
            </div >
        );
    }

};


export default withRouter(Rating);