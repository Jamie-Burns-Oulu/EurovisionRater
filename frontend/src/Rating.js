import React, { Component } from "react";
import axios from "axios";
import { Redirect, withRouter } from 'react-router-dom'
import './CSS/Rating.css';

class Rating extends Component {
    constructor(props) {
        super(props);
        this.get = this.get.bind(this);
        this.state = {
            idUser: "",
            countryForRating: this.props.location.countryForRating,
            redirect: false,
            Overall: 0,
            Song: 0,
            Performance: 0,
            Comment: "",
            country: []
        };
        this.onChange = this.onChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.setState({ idUser: localStorage.getItem('idUsers') });
        this.get();
    }

    get() {
        let countryID = Number(this.props.location.countryForRating);
        const PATH = `https://evr.herokuapp.com/`;
        axios.get(PATH + "countries/" + countryID).then(res => { this.setState({ country: res.data }); });
        axios.get(PATH + "ratings/" + localStorage.getItem('idUsers')).then(res => {
            let existingRating = res.data.find(r => r.country_id === countryID);
            if (!existingRating) {
                let [overall, song, performance, comment] = [0, 0, 0, ""]
                let country_id = countryID;
                let user_id = localStorage.getItem('idUsers');
                axios.post(PATH + "ratings/", {
                    overall,
                    song,
                    performance,
                    comment,
                    user_id,
                    country_id
                })
            } else {
                this.setState({ Overall: existingRating.overall });
                this.setState({ Song: existingRating.song });
                this.setState({ Performance: existingRating.performance });
                this.setState({ Comment: existingRating.comment });
            }
        });
    }

    onChange = e => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
        this.updateRating(e.target.name);
    };

    updateRating(toUpdate) {
        const PATH = `https://evr.herokuapp.com/ratings/`;
        let country = this.state.countryForRating;
        let user = this.state.idUser;
        let overall = this.state.Overall;
        let song = this.state.Song;
        let performance = this.state.Performance;
        let comment = this.state.Comment;
        if (toUpdate === "Overall") {
            axios.put(PATH + toUpdate, { overall, user, country })
        } else if (toUpdate === "Song") {
            axios.put(PATH + toUpdate, { song, user, country })
        } else if (toUpdate === "Performance") {
            axios.put(PATH + toUpdate, { performance, user, country })
        } else if (toUpdate === "Comment") {
            axios.put(PATH + toUpdate, { comment, user, country })
        }
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
                {this.state.country.map(country => (
                    <div className="country-name">
                        {country.name}
                        <img src={country.flag} alt={"Flag of " + country.name} className="flag_image" />
                    </div>
                ))}

                <div className="main-ratings">

                    <div className="overall-rating">
                        Overall
                        <div>
                            <input type="number" name="Overall"
                                onChange={this.onChange} value={this.state.Overall} />
                        </div>
                    </div>
                    <div className="song-rating">
                        Song
                        <div>
                            <input type="number" name="Song"
                                onChange={this.onChange} value={this.state.Song} />
                        </div>
                    </div>
                    <div className="show-rating">
                        Show
                        <div>
                            <input type="number" name="Performance"
                                onChange={this.onChange} value={this.state.Performance} />
                        </div>
                    </div>
                    <div className="comment-rating">
                        Comment
                        <div>
                            <input type="text" name="Comment"
                                onChange={this.onChange} value={this.state.Comment} />
                        </div>
                    </div>

                    <button onClick={this.handleClick}>Back</button>

                </div>
            </div >
        );
    }

};


export default withRouter(Rating);