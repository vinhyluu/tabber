import React from "react";

export default class SongInfo extends React.Component{
    constructor(){
        super();
        this.state = {
            favourites: [],
        }
        this.addFavourite = this.addFavourite.bind(this);
    }

    addFavourite(e){
        e.preventDefault();
        console.log(this);
        const favs ={
            artist: this.artistName.textContent,
            title: this.songTitle.textContent,
            url: this.songUrl.textContent.outerHTML,
        };
        const newFavs = Array.from(this.state.favourites);
        newFavs.push(favs);
        this.setState({
            favourites: newFavs
        })
        console.log(this.state.favourites)
    }


    render(){
        return(
            <div className="songContainerOuter">
                {this.props.artist.map((artist, i) => {
                    return (
                        <div className="songContainerInner" key={i}>
                            <ul>
                                <div className="leftSide">
                                    <li ref={ref => this.artistName = ref}>{artist}</li>
                                </div>
                                <div className="rightSide">
                                    <div className="topRight">
                                        <li ref={ref => this.songTitle = ref}>{this.props.title[i]}</li>
                                    </div>
                                    <div className="bottomRight">
                                        <li ref={ref => this.songUrl = ref}><a href={`${this.props.link[i]}`}><i className="fas fa-link"></i></a></li>
                                        <li onClick={this.addFavourite}><i className="fas fa-plus"></i></li>
                                    </div>
                                </div>
                            </ul>
                        </div>
                    )
                })}
            </div>
        )
    }
}