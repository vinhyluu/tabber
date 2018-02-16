import React from "react";

export default class SongInfo extends React.Component{
    render(){
        return(
            <div className="songContainerOuter">
                {this.props.artist.map((artist, i) => {
                    return (
                        <div className="songContainerInner" key={i}>
                            <ul>
                                <div className="leftSide">
                                    <li>{artist}</li>
                                </div>
                                <div className="rightSide">
                                    <div className="topRight">
                                        <li>{this.props.title[i]}</li>
                                    </div>
                                    <div className="bottomRight">
                                        <li><a href={`${this.props.link[i]}`}><i class="fas fa-link"></i></a></li>
                                        <li><i class="fas fa-plus"></i></li>
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