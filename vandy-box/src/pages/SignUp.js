import React from 'react'
import Header from "../components/Header";
import { sendSignInLinkToEmail, isSignInWithEmailLink,signInWithEmailLink } from "firebase/auth";
import { auth } from '../firebase.js';


class App extends React.Component {
  handleSubmit
}
const actionCodeSettings = {
  url:'https://vandy-box.firebaseapp.com',
  handleCodeInApp: true,
  iOS: {
      bundleId: 'com.example.ios'
  },
  android: {
      packageName: 'com.example.android',
      installApp: true,
      minimumVersion: '12'
  },
  dynamicLinkDomain: 'vandy-box.firebaseapp.com'
};

class SignUpPage extends React.Component {
   constructor(props) {
       super(props);
       this.state = {
           username: "",
           vanderbiltEmail: ""
       };
   

   this.handleInputChange = this.handleInputChange.bind(this);
       this.handleSubmit = this.handleSubmit.bind(this);
   }

   handleInputChange(event) {
       event.preventDefault();
       const target = event.target;
       this.setState({
           [target.name]: target.value,
       });
   }

   handleSubmit(event) {
       event.preventDefault();
      //  if(this.state.vemail.length<= 15 && this.state.vanderbiltEmail.slice(this.state.vemail.length-15) != "@vanderbilt.edu"){
       sendSignInLinkToEmail(auth, this.state.vanderbiltEmail, actionCodeSettings)
           .then(() => {
               window.localStorage.setItem('emailForSignIn', this.state.vanderbiltEmail);
           }
       )
       .catch((error) => {
           const errorCode = error.code;
           const errorMessage = error.message;
       });


       if (isSignInWithEmailLink(auth, window.location.href)) {
           let email = window.localStorage.getItem('emailForSignIn');
       if(!email){
           email = window.prompt('Please provide your email for confirmation');
       }
       signInWithEmailLink(auth, this.state.vanderbiltEmail, window.location.href)
           .then((result) => {
               window.localStorage.removeItem('emailForSignIn');
       })
}
   }

render(){
  return (
  <div>
    <Header> </Header>
    <div class = "flex justify-center items-center w-screen h-screen">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit = {this.handleSubmit}>
        <div class = "mb-4">
        <label class = "block text-gray-700 text-sm font-bold mb-2">
          username
        </label>
        <input name = "username"
        type = "text"
        class = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        value = {this.state.username}
        onChange = {this.handleInputChange}
        placeholder = "username"
        />
        </div>
        <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">
          Vanderbilt Email
        </label>
        <input name = "vanderbiltEmail"
        type = "text"
        class = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        value = {this.state.vanderbiltEmail}
        onChange = {this.handleInputChange}
        placeholder = "Vanderbilt Email"
        />
        </div>
        {/* <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">
          Password
        </label>
        <input name = "password"
        type = "password"
        class  = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        value = {this.state.password}
        onChange = {this.handleInputChange}
        placeholder = "password"
        />
        </div> */}
        <div class="flex items-center justify-between">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          Sign Up
        </button>
      </div>
      </form>
    </div>
  </div>
  );
}
}
export default SignUpPage;