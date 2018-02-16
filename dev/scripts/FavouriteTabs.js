import React from "react";

export default class Favourites extends React.Component{
    render() {
        console.log(this.props.favourites);
        return (
            <div>
                <div className="songContainerOuter">
                    {this.props.favourites.map((key, i) => {
                        console.log(key.artist);
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
                                            <li onClick={event => this.addFavourite(artist, i)}><i className="fas fa-minus"></i></li>
                                        </div>
                                    </div>
                                </ul>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}