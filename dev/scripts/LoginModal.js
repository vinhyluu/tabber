// import React from "react";
// import firebase from "./firebase";

// export default class LoginModal extends React.Component{
//     constructor(){
//         super();

//         this.setState = {
//             loggedIn: false
//         }

//         this.showCreate = this.showCreate.bind(this);
//         this.createUser = this.createUser.bind(this);
//         this.showLogin = this.showLogin.bind(this);
//         this.loginUser = this.loginUser.bind(this);
//         this.logOut = this.logOut.bind(this);
//     }

//     componentDidMount() {
//         firebase.auth().onAuthStateChanged((user) => {
//             if (user) {
//                 document.querySelector(".searchTabs").style.display = "block"
//                 this.setState({
//                     loggedIn: true
//                 })
//             } else {
//                 document.querySelector(".searchTabs").style.display = "none"
//                 this.setState({
//                     loggedIn: false

//                 })
//             }
//         })
//     }

//     showCreate(e) {
//         e.preventDefault();
//         this.overlay.classList.toggle("show");
//         this.createUserModal.classList.toggle("show");
//     }

//     createUser(e) {
//         e.preventDefault();
//         const email = this.createEmail.value;
//         const password = this.createPassword.value;
//         const confirm = this.confirmPassword.value;
//         if (password === confirm) {
//             firebase.auth()
//                 .createUserWithEmailAndPassword(email, password)
//                 .then((res) => {
//                     this.showCreate(e);
//                 })
//                 .catch((err) => {
//                     alert(err.message)
//                 })
//         } else {
//             alert("Passwords Must Match")
//         }
//     }

//     showLogin(e) {
//         e.preventDefault();
//         this.overlay.classList.toggle("show");
//         this.loginModal.classList.toggle("show");
//     }

//     loginUser(e) {
//         e.preventDefault();
//         const email = this.userEmail.value;
//         const password = this.userPassword.value;

//         firebase.auth()
//             .signInWithEmailAndPassword(email, password)
//             .then((res) => {
//                 this.showLogin(e);
//             })
//             .catch((err) => {
//                 alert(err.message);
//             })
//     }

//     logOut(e) {
//         e.preventDefault();
//         firebase.auth().signOut();
//     }

//     render(){
//         return(
//             <div>
//                 <div className="loginModal modal" ref={ref => this.loginModal = ref}>
//                     <form action="" onSubmit={this.loginUser}>
//                         <label htmlFor="email">email</label>
//                         <input type="email" name="email" ref={ref => this.userEmail = ref} />
//                         <label htmlFor="password">password</label>
//                         <input type="password" name="password" ref={ref => this.userPassword = ref} />
//                         <input type="submit" value="Login" />
//                         <button onClick={this.showLogin}>close</button>
//                     </form>
//                 </div>

//                 <div className="overlay" ref={ref => this.overlay = ref}></div>

//                 <div className="createUserModal modal" ref={ref => this.createUserModal = ref}>
//                     <form action="" onSubmit={this.createUser}>
//                         <div>
//                             <label htmlFor="createEmail">email</label>
//                             <input type="email" name="createEmail" ref={ref => this.createEmail = ref} onChange={this.onChange} />
//                         </div>
//                         <div>
//                             <label htmlFor="createPassword">password</label>
//                             <input type="password" name="createPassword" ref={ref => this.createPassword = ref} onChange={this.onChange} />
//                         </div>
//                         <div>
//                             <label htmlFor="confirmPassword">confirm Password</label>
//                             <input type="password" name="confirmPassword" ref={ref => this.confirmPassword = ref} onChange={this.onChange} />
//                         </div>
//                         <div>
//                             <input type="Submit" defaultValue="create" onChange={this.onChange} />
//                             <button onClick={this.showCreate}>close</button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
        
//         )
//     }
// }