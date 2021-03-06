import React from "react";
import firebase from "./firebase";
import Favourites from "./FavouriteTabs";

export default class SongInfo extends React.Component{
    constructor(){
        super();
        this.state = {
            favourites: [],
            loggedIn: false,
        }
        this.addFavourite = this.addFavourite.bind(this);
    }

    componentDidMount(){
        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                firebase.database().ref(`users/${user.uid}/favourites`).on("value", (res) => {
                    const userData = res.val();
                    const dataArray = [];
                    //taking the original object, the key itself, we're putting inside of the object to grab for reference later
                    for(let key in userData){
                        userData[key].key = key;
                        dataArray.push(userData[key])
                    }
                    this.setState({
                        favourites: dataArray,
                        loggedIn: true
                    })
                });
            }else{
                this.setState({
                    favourites: [],
                    loggedIn: false
                })
            }
        })
    }

    addFavourite(artist, songIndex) {
        const fav = {
            artist,
            title: this.props.title[songIndex],
            url: this.props.link[songIndex]
        };
        // get reference to database
        const userId = firebase.auth().currentUser.uid;
        const dbRef = firebase.database().ref(`users/${userId}/favourites`);
        //push into the database
        dbRef.push(fav);
    }

    render() {
        return (   
            <div>
                {this.state.loggedIn === true ?
                <div className="songContainerOuter">
                    {this.props.artist.map((artist, i) => {
                        const { link, title } = this.props;
                        return (
                            <div className="songContainerInner" key={i}>
                                <ul>
                                    <div className="leftSide">
                                        <li>{artist}</li>
                                    </div>
                                    <div className="rightSide">
                                        <div className="topRight">
                                            <li>{title[i]}</li>
                                        </div>
                                        <div className="bottomRight">
                                            <li><a href={`${link[i]}`} target="_blank"><i className="fas fa-link"></i></a></li>
                                            <li onClick={event => this.addFavourite(artist, i)}><i className="fas fa-plus"></i></li>
                                        </div>
                                    </div>
                                </ul>
                            </div>
                        )
                    })}
                </div>
                :
                //ternary so that when you search as a logged in user, and then logout, the search results don't appear
                <div></div>}
            </div>
        )
    }
}