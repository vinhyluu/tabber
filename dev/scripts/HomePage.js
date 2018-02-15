import React from "react";
import Header from "./Header";
import SearchTab from "./SearchTab";
import SongInfo from "./SongInfo";
import swal from 'sweetalert';
import axios from 'axios';

class MainPage extends React.Component {
    constructor(){
        super();
        this.state = {
            currentSearch: "",
            artistName: [],
            songTitle: [],
            tabId: [],
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.searchTab = this.searchTab.bind(this);
    }

    searchTab(param){
        axios.get(`http://www.songsterr.com/a/ra/songs.json?pattern=${param}`)
            .then(res => {
                const tabs = res.data;
                const songTitle = [];
                const artistName = [];
                const tabId = [];
                const result =[];

                console.log(artistName);
                console.log(songTitle);
                console.log(tabId);

                for(let key in tabs){
                    for(let data in tabs[key]){

                        const artist = tabs[key].artist.name.toUpperCase();
                        const song = tabs[key].title.toUpperCase();
                        // const link = tabs[key].id;

                        // console.log(link);
                        // console.log(song);

                        if(param == artist || param == song){
                            artistName.push(artist);
                            songTitle.push(song);
                            tabId.push(`http://www.songsterr.com/a/wa/bestMatchForQueryString?s=${song}&a=${artist}`);
                            // tabId.push(`http://www.songsterr.com/a/wa/song?id=${link}`);
                            break;
                        }
                    }
                }

                this.setState({
                    artistName,
                    songTitle,
                    tabId,
                })

                function isEmpty(obj) {
                    for (const key in obj) {
                        if (obj.hasOwnProperty(key))
                            return false;
                    }
                    return true;
                }

                if (isEmpty(artistName)) {
                    swal("Sorry!", "There is no tab for that song. Please try again.", "warning");
                }
            })
        }

    handleChange(e){
        e.preventDefault();
        const currentSearchValue = e.target.value.toUpperCase();
        this.setState({
            currentSearch: currentSearchValue
        })
        // console.log(currentSearchValue);
    }

    handleSubmit(e){
        e.preventDefault();
        this.searchTab(this.state.currentSearch);
        this.setState({
            currentSearch: ""
        })
    }


    render(){
        return(
            <div>
                <div className="wrapper">
                    <header>
                        <Header />
                    </header>

                    <div className="wrapper2">
                        <SearchTab search={this.handleSubmit} value={this.handleChange}/>
                    </div>

                    <div>
                        <SongInfo artist={this.state.artistName} title={this.state.songTitle} link={this.state.tabId}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default MainPage;