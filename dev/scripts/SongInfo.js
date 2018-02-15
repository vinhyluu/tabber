import React from "react";

export default class SongInfo extends React.Component{
    render(){
        return(
            <div>
                {this.props.artist.map((artist, i) =>{
                    return(
                        <h3>{artist}</h3>
                    )
                })}

                {this.props.title.map((title, i) => {
                    return (
                        <h3>{title}</h3>
                    )
                })}

                {this.props.link.map((link, i) => {
                    return (
                        <h3>{link}</h3>
                    )
                })}
            </div>
        )
    }
}