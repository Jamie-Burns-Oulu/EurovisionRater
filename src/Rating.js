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
            countryForRating: this.props.match.params.id,
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
        let countryID = Number(this.props.match.params.id);
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
                        <img src={country.flag} alt={"Flag of " + country.name} className="flag_image" />
                        {country.idCountries}. {country.name}
                    </div>
                ))}

                <div className="main-ratings">

                    <div className="overall-rating">
                        Overall: {this.state.Overall}
                        <div>

                            <input type="range" name="Overall"
                                onChange={this.onChange} value={this.state.Overall} min="1" max="10" step="1" />
                        </div>
                    </div>
                    <div className="song-rating">
                        Song: {this.state.Song} Stars
                        <form className="show-rating" onChange={this.onChange}>
                            <div className="stars">
                                <input type="radio" name="Song" className="star-1" value="1" id="star-1" />
                                <label className="star-1" htmlFor="star-1">1</label>
                                <input type="radio" name="Song" className="star-2" value="2" id="star-2" />
                                <label className="star-2" htmlFor="star-2">2</label>
                                <input type="radio" name="Song" className="star-3" value="3" id="star-3" />
                                <label className="star-3" htmlFor="star-3">3</label>
                                <input type="radio" name="Song" className="star-4" value="4" id="star-4" />
                                <label className="star-4" htmlFor="star-4">4</label>
                                <input type="radio" name="Song" className="star-5" value="5" id="star-5" />
                                <label className="star-5" htmlFor="star-5">5</label>
                                <span></span>
                            </div>
                        </form>
                    </div>
                    <div className="show-rating">
                        Show: {this.state.Performance} Stars
                        <form className="show-rating" onChange={this.onChange}>
                            <div className="stars2">
                                <input type="radio" name="Performance" className="star-12" value="1" id="star-12" />
                                <label className="star-12" htmlFor="star-12">1</label>
                                <input type="radio" name="Performance" className="star-22" value="2" id="star-22" />
                                <label className="star-22" htmlFor="star-22">2</label>
                                <input type="radio" name="Performance" className="star-32" value="3" id="star-32" />
                                <label className="star-32" htmlFor="star-32">3</label>
                                <input type="radio" name="Performance" className="star-42" value="4" id="star-42" />
                                <label className="star-42" htmlFor="star-42">4</label>
                                <input type="radio" name="Performance" className="star-52" value="5" id="star-52" />
                                <label className="star-52" htmlFor="star-52">5</label>
                                <span></span>
                            </div>
                        </form>
                    </div>
                    <div className="comment-rating">
                        Comment
                        <div>
                            <input type="textarea" name="Comment"
                                onChange={this.onChange} value={this.state.Comment} />
                        </div>
                    </div>

                    <button className="start-btn" id="back-btn" onClick={this.handleClick}>Back</button>

                </div>


            </div >
        );
    }

};


export default withRouter(Rating);