angular.module('app')
.controller('LandingCtrl', function(Auth) {
  this.username = '';
  this.butnClicked = true;
  this.password = '';
  this.signup = true;
  this.sisu = 'Need to Sign In';

  this.getStarted = () => {
  	console.log('hello world')
  	this.butnClicked = false;
  }

  this.handleSignUp = (username, password, email) => {
  	console.log(username, password, email, 'signed Up')
  	var obj = {username: username, password: password, email: email};
  	Auth.signup(obj, function(err, res) {
      if (err) {
        console.error(err)
      } else {
        console.log(res)
        console.log('successful server response for signup');
      }
  	})
  }

  this.handleSignIn = (username, password) => {
  	console.log(username, password, 'signed in');
  	var obj = {username: username, password: password};
  	Auth.signin(obj, function(err, res) {
      if (err) {
        console.error(err)
      } else {
        console.log('successful server response for signin');
      }
  	})
  }

  this.toggle = () => {
  	this.signup = !this.signup;
  	if (this.signup) {
  	  this.sisu = 'Need to Sign In';
  	} else {
  	  this.sisu = 'Create an Account';
  	}
  }

})
.component('landingPage', {
  controller: 'LandingCtrl',
  templateUrl: '../templates/landing.html'
})
