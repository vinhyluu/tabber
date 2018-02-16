import React from "react";
import firebase from "./firebase";
import Favourites from "./FavouriteTabs";

export default class SongInfo extends React.Component{
    constructor(){
        super();
        this.state = {
            favourites: [],
        }
        this.addFavourite = this.addFavourite.bind(this);
    }

    componentDidMount(){
        firebase.database().ref().on("value", (res) => {
            const userData = res.val();
            const dataArray = [];
            //we're taking the original object, the key itself, we're putting inside of the object so that we can grab an easy reference to that value later
            for(let key in userData){
                userData[key].key = key;
                dataArray.push(userData[key])
            }
            this.setState({
                favourites: dataArray
            })
            // console.log(dataArray);
        });
    }

    // addFavourite(artist, songIndex) {
    //     const fav = {
    //         artist,
    //         title: this.props.title[songIndex],
    //         url: this.props.link[songIndex]
    //     };

    //     const newFavs = Array.from(this.state.favourites);
    //     newFavs.push(fav);

    //     this.setState({
    //         favourites: newFavs
    //     },()=>{
    //         console.log(this.state.favourites)
    //     })
    // }

    addFavourite(artist, songIndex) {
        const fav = {
            artist,
            title: this.props.title[songIndex],
            url: this.props.link[songIndex]
        };

        // get reference to database
        const dbRef = firebase.database().ref();
        //push something into the database
        dbRef.push(fav);
    }

    removeFavourite(noteId){
        
    }



    
    // addFavourite(e){
    //     e.preventDefault();
    //     const artist = document.getElementById("artistName").innerHTML;
    //     console.log(artist);
    //     const title = document.getElementById("titleSong").innerHTML;
    //     console.log(title);
    //     const url = document.getElementById("songUrl").getAttribute("href");
    //     console.log(url);
    // }


    render() {
        return (
            <div>
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
                                            <li><a href={`${link[i]}`}><i className="fas fa-link"></i></a></li>
                                            <li onClick={event => this.addFavourite(artist, i)}><i className="fas fa-plus"></i></li>
                                        </div>
                                    </div>
                                </ul>
                            </div>
                        )
                    })}
                </div>

                <div>
                    <Favourites favourites={this.state.favourites}/>
                </div>
            </div>
        )
    }
}