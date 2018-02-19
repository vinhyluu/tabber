import React from "react";
import firebase from "./firebase";

export default class Favourites extends React.Component{
    constructor(){
        super();

        this.state={
            dataArray: [],
            loggedIn: false,
        }
    }
    componentDidMount(){
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                firebase.database().ref(`users/${user.uid}/favourites`).on("value", (res) => {
                    const userData = res.val();
                    const dataArray = [];

                    console.log(userData);
                    for(let key in userData){
                        userData[key].key = key;
                        dataArray.push(userData[key]);
                    }
                    this.setState({
                        dataArray,
                        loggedIn: true
                    })
                });
                
            }else{
                this.setState({
                    dataArray: [],
                    loggedIn: false
                })
            } 
        })
    }

    removeFavourite(cardId) {
        const userId = firebase.auth().currentUser.uid;
        const dbRef = firebase.database().ref(`users/${userId}/favourites/${cardId}`);
        dbRef.remove();
    }
    
    render() {
        return (
            <div>
                {this.state.loggedIn === true ?
                <div className="songContainerOuter">
                    {this.state.dataArray.map((key, i) => {
                        console.log(key);
                        return (
                            <div className="songContainerInner" key={i}>
                                <ul>
                                    <div className="leftSide">
                                        <li>{key.artist}</li>
                                    </div>
                                    <div className="rightSide">
                                        <div className="topRight">
                                            <li>{key.title}</li>
                                        </div>
                                        <div className="bottomRight">
                                            <li><a href={`${key.url}`}><i className="fas fa-link"></i></a></li>
                                            <li onClick={event => this.removeFavourite(key.key)}><i className="fas fa-minus"></i></li>
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