import React from "react";
import ReactDOM from "react";
import App from "./app";
import SearchTab from "./SearchTab";
import SongInfo from "./SongInfo";
import FavouriteTabs from "./FavouriteTabs";
import swal from 'sweetalert';
import axios from 'axios';
import Qs from "qs"
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
                document.getElementById("searchBar").style.display = "block"
                document.querySelector(".searchTab").style.borderBottom = "1px solid rgb(167, 167, 167)"
                this.setState({
                    loggedIn: true
                })
            }else{
                document.getElementById("searchBar").style.display = "none"
                document.querySelector(".searchTab").style.borderBottom = "none"
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

    // Leaving this here. I didn't realize that I could use firebase.auth.onAuthStateChanged in this component as well so I was trying to store the logged in state into local storage. Got close, but then read it wasn't the best idea especially if it was in production code. Local storage is pretty cool though!
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

        this.setState({
            artistName: [],
            songTitle: [],
            tabId: [],
            currentSearch: ""
        })
    }

    //Search Tab
    searchTab(param){
        axios({
            method: "GET",
            url: "https://proxy.hackeryou.com",
            dataResponse: "json",
            paramsSerializer: function(params){
                return Qs.stringify(params, { arrayFormat: 'brackets' })
            },
            params: {
                reqUrl: `https://www.songsterr.com/a/ra/songs.json?pattern=${param}`
            },
            xmlToJson: false
        }).then(res => {
            const tabs = res.data;
            const songTitle = [];
            const artistName = [];
            const tabId = [];

            for (let key in tabs) {
                for (let data in tabs[key]) {

                    const artist = tabs[key].artist.name.toUpperCase();
                    const song = tabs[key].title.toUpperCase();
                    const link = `https://www.songsterr.com/a/wa/bestMatchForQueryString?s=${song}&a=${artist}`;
                    const linkNoSpace = link.replace(/\s+/g, "");

                    if (param == artist || param == song) {
                        artistName.push(artist);
                        songTitle.push(song);
                        tabId.push(linkNoSpace);
                        //prevent for in loop from repeating the same results
                        break;
                    }
                }
            }
                this.setState({
                    artistName,
                    songTitle,
                    tabId,
                })

                //function for empty search results
                function isEmpty(obj) {
                    for (const key in obj) {
                        if (obj.hasOwnProperty(key))
                            return false;
                    }
                    return true;
                }
                //if there are no values in the artistName array, return false
                if (isEmpty(artistName)) {
                    swal("Sorry!", "There is no tab for that song. Please try again.", "warning");
                }

            }).catch(function (error) {
                console.log(error);
            });
        }

    handleChange(e){
        e.preventDefault();
        const currentSearchValue = e.target.value.toUpperCase();
        this.setState({
            currentSearch: currentSearchValue
        })
    }

    handleSubmit(e){
        e.preventDefault();
        this.searchTab(this.state.currentSearch);
        this.setState({
            currentSearch: ""
        })
    }

    removeTab(){
        const location = window.location.pathname;
        console.log(location);
        
        if(location === "/favouritetabs"){
            document.querySelector(".searchTabs").style.display = "none"
            document.querySelector(".searchTab").style.borderBottom ="none"
        }
    }

    addTab(){
        const location = window.location.pathname;
        
        if(location === "/home"){
            document.querySelector(".searchTabs").style.display = "block"
            document.querySelector(".searchTab").style.borderBottom = "1px solid rgb(167, 167, 167)"
        }
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
                                                                    <li onClick={this.addTab}><Link to="/home" className="navLink goHome">Home</Link></li>
                                                                    <li onClick={this.removeTab}><Link to="/favouritetabs" className="navLink">Favourite Tabs</Link></li>
                                                                    <li className="navLink" onClick={this.logOut}><Link to="/home">Logout</Link></li>
                                                                </div>
                                                            )
                                                        } else {
                                                            return (
                                                                <div className="mainNav">
                                                                    <li className="navLink" onClick={this.showCreate}><Link to="/home">Create Account</Link></li>
                                                                    <li className="navLink" onClick={this.showLogin}><Link to="/home">Login</Link></li>
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
                                        <form className="login" action="" onSubmit={this.loginUser}>
                                            <div className="emailContainer">
                                                <label htmlFor="email">email</label>
                                                <input type="email" name="email" ref={ref => this.userEmail = ref} />
                                            </div>
                                            <div className="passwordContainer">
                                                <label htmlFor="password">password</label>
                                                <input type="password" name="password" ref={ref => this.userPassword = ref} />
                                            </div>
                                            <div className="loginClose">
                                                <input type="submit" value="login" className="loginButton"/>
                                                <button onClick={this.showLogin} className="closeModal">close</button>
                                            </div>
                                        </form>
                                    </div>

                                    <div className="overlay" ref={ref => this.overlay = ref}></div>

                                    <div className="createUserModal modal" ref={ref => this.createUserModal = ref}>
                                        <form className="login createUser" action="" onSubmit={this.createUser}>
                                            <div className="emailContainer">
                                                <label htmlFor="createEmail">email</label>
                                                <input type="email" name="createEmail" ref={ref => this.createEmail = ref} onChange={this.onChange} />
                                            </div>
                                            <div className="passwordContainer">
                                                <label htmlFor="createPassword">password</label>
                                                <input type="password" name="createPassword" ref={ref => this.createPassword = ref} onChange={this.onChange} />
                                            </div>
                                            <div className="passwordContainer">
                                                <label htmlFor="confirmPassword">confirm Password</label>
                                                <input type="password" name="confirmPassword" ref={ref => this.confirmPassword = ref} onChange={this.onChange} />
                                            </div>
                                            <div className="loginClose">
                                                <input type="Submit" defaultValue="create" onChange={this.onChange} className="createButton"/>
                                                <button onClick={this.showCreate} className="closeModal">close</button>
                                            </div>
                                        </form>
                                    </div>
                            </header>
                        </div>
                    </div>

                    <div>
                        <div>
                            <SearchTab search={this.handleSubmit} value={this.handleChange}/>
                        </div>
                    </div>

                    <Switch className="wrapper2 songContainer">
                        <Route exact path="/home" render={props => <SongInfo {...props} artist={this.state.artistName} title={this.state.songTitle} link={this.state.tabId} />} />
                        <Route exact path="/favouritetabs" component={FavouriteTabs} />} />
                    </Switch>

                    {/* If the user is logged out, display application introduction */}
                    {this.state.loggedIn===false ?
                    <div className="createLogin"> 
                        <p>Tabber is an app built by a guitarist for guitarists!</p>
                        <p>Search for guitar tabs, click the <i className="fas fa-plus"></i> button to add to your favourite tabs, and click <i className="fas fa-minus"></i> to remove them.</p>
                        <p>Create an account to get started!</p>
                        <span><i className="fas fa-music"></i></span>
                    </div>
                    :
                    <div></div>}
                </div>    
            </Router>
        )
    }
}

export default HomePage;