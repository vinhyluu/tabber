import React from "react";
import SearchTab from "./SearchTab";
import SongInfo from "./SongInfo";
import FavouriteTabs from "./FavouriteTabs";
import swal from 'sweetalert';
import axios from 'axios';
import firebase from './firebase';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

class HomePage extends React.Component {
    constructor(){
        super();
        this.state = {
            currentSearch: "",
            artistName: [],
            songTitle: [],
            tabId: [],
            loggedIn: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.searchTab = this.searchTab.bind(this);
        this.showCreate = this.showCreate.bind(this);
        this.createUser = this.createUser.bind(this);
        this.showLogin = this.showLogin.bind(this);
        this.loginUser = this.loginUser.bind(this);
        this.logOut = this.logOut.bind(this);
    }

    //Login
    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                document.querySelector(".searchTabs").style.display = "block"
                this.setState({
                    loggedIn: true
                })
            } else {
                document.querySelector(".searchTabs").style.display = "none"
                this.setState({
                    loggedIn: false

                })
            }
        })
    }

    showCreate(e) {
        e.preventDefault();
        this.overlay.classList.toggle("show");
        this.createUserModal.classList.toggle("show");
    }

    createUser(e) {
        e.preventDefault();
        const email = this.createEmail.value;
        const password = this.createPassword.value;
        const confirm = this.confirmPassword.value;
        if (password === confirm) {
            firebase.auth()
                .createUserWithEmailAndPassword(email, password)
                .then((res) => {
                    this.showCreate(e);
                })
                .catch((err) => {
                    alert(err.message)
                })
        } else {
            alert("Passwords Must Match")
        }
    }

    showLogin(e) {
        e.preventDefault();
        this.overlay.classList.toggle("show");
        this.loginModal.classList.toggle("show");
    }

    // saveToLocal(){
    //     const local = this.state.loggedIn;
    //     localStorage.setItem("loggedIn", JSON.stringify(local));
    // }

    loginUser(e) {
        e.preventDefault();
        const email = this.userEmail.value;
        const password = this.userPassword.value;

        // this.setState({
        //     loggedIn: true
        // })
        // }, 
        // this.saveToLocal);


        // when user is logged in, show the searchbar
        // document.querySelector(".searchTabs").style.display = "block";

        firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then((res) => {
                this.showLogin(e);
            })
            .catch((err) => {
                alert(err.message);
            })
    }

    logOut(e) {
        e.preventDefault();
        firebase.auth().signOut();

        // this.setState({
        //     loggedIn: false
        // })
        // console.log(this.state.loggedIn);

        // hide the search bar when user logs out
        // so if they visit the page again, and they have not signed in
        // the searchbar will not be visible

        // until they are logged back in
        // document.querySelector(".searchTabs").style.display="none";
    }

    //Search Tab
    searchTab(param){
        axios.get(`http://www.songsterr.com/a/ra/songs.json?pattern=${param}`)
            .then(res => {
                const tabs = res.data;
                const songTitle = [];
                const artistName = [];
                const tabId = [];

                // console.log(artistName);
                // console.log(songTitle);
                // console.log(tabId);

                for(let key in tabs){
                    for(let data in tabs[key]){

                        const artist = tabs[key].artist.name.toUpperCase();
                        const song = tabs[key].title.toUpperCase();
                        const link = `http://www.songsterr.com/a/wa/bestMatchForQueryString?s=${song}&a=${artist}`;
                        const linkNoSpace = link.replace(/\s+/g, "");

                        // console.log(linkNoSpace);
                        // console.log(link);
                        // console.log(song);

                        if(param == artist || param == song){
                            artistName.push(artist);
                            songTitle.push(song);
                            tabId.push(linkNoSpace);
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
            <Router>
                <div>
                    <div className="wrapper headWrapper">
                        <div className="wrapper2">
                            <header>                 
                                    <div>
                                        <nav>
                                            <ul>
                                                {/* iffy statement */}
                                                {
                                                    (() => {
                                                        if (this.state.loggedIn === true) {
                                                            return (
                                                                <div className="mainNav">
                                                                    <li>Home</li>
                                                                    <li>Favourite Tabs</li>
                                                                    <li><Link to="/">Home</Link></li>
                                                                    <li><Link to="/favouritetabs">Favourite Tabs</Link></li>
                                                                    <Route exact path="/" component={HomePage} />
                                                                    <Route exact path="/favouritetabs" component={FavouriteTabs} />
                                                                    <li><a href="" onClick={this.logOut}>Logout</a></li>
                                                                </div>
                                                            )
                                                        } else {
                                                            return (
                                                                <div className="mainNav">
                                                                    <li><a href="" onClick={this.showCreate}>Create Account</a></li>
                                                                    <li><a href="" onClick={this.showLogin}>Login</a></li>
                                                                </div>
                                                            )
                                                        }
                                                    })()
                                                }
                                            </ul>
                                        </nav>
                                    </div>
                                    

                                    <div className="mainTitle">
                                        <h1>Tabber</h1>
                                    </div>

                                    <div className="loginModal modal" ref={ref => this.loginModal = ref}>
                                        <form action="" onSubmit={this.loginUser}>
                                            <label htmlFor="email">email</label>
                                            <input type="email" name="email" ref={ref => this.userEmail = ref} />
                                            <label htmlFor="password">password</label>
                                            <input type="password" name="password" ref={ref => this.userPassword = ref} />
                                            <input type="submit" value="Login" />
                                            <button onClick={this.showLogin}>close</button>
                                        </form>
                                    </div>

                                    <div className="overlay" ref={ref => this.overlay = ref}></div>
                                    <div className="createUserModal modal" ref={ref => this.createUserModal = ref}>
                                        <form action="" onSubmit={this.createUser}>
                                            <div>
                                                <label htmlFor="createEmail">email</label>
                                                <input type="email" name="createEmail" ref={ref => this.createEmail = ref} onChange={this.onChange} />
                                            </div>
                                            <div>
                                                <label htmlFor="createPassword">password</label>
                                                <input type="password" name="createPassword" ref={ref => this.createPassword = ref} onChange={this.onChange} />
                                            </div>
                                            <div>
                                                <label htmlFor="confirmPassword">confirm Password</label>
                                                <input type="password" name="confirmPassword" ref={ref => this.confirmPassword = ref} onChange={this.onChange} />
                                            </div>
                                            <div>
                                                <input type="Submit" defaultValue="create" onChange={this.onChange} />
                                                <button onClick={this.showCreate}>close</button>
                                            </div>
                                        </form>
                                    </div>
                            </header>
                        </div>
                    </div>

                    {/* <Switch>
                        <Route exact path="/" render={props => <HomePage {...props} userkey={this.props.userkey} />} />
                    </Switch> */}
                 
                    {/* <div>
                        <div>
                            <SearchTab search={this.handleSubmit} value={this.handleChange}/>
                        </div>
                    </div> */}

                    <div className="wrapper2 songContainer">
                        <SongInfo artist={this.state.artistName} title={this.state.songTitle} link={this.state.tabId} />
                        <FavouriteTabs />
                    </div>
                </div>
            </Router>
        )
    }
}

export default HomePage;