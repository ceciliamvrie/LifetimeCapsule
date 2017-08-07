angular.module('landing-page', [])
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
  	Auth.signin(obj, function(res) {
  	  console.log('successful server response for signin');
  	}
  }

  this.handleSignIn = (username, password) => {
  	console.log(username, password, 'signed in');
  	var obj = {username: username, password: password};
  	Auth.signin(obj, function(res) {
  	  console.log('successful server response for signin');
  	}
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
.component('landing', {
  controller: 'LandingCtrl',
  template: 
    `<div>
      <h1>Welcome to Life-Time Capsule</h1>
      <span ng-show="$ctrl.butnClicked">
        <button type="button" ng-click="$ctrl.getStarted()">Get Started</button>
      </span>
      <span ng-hide="$ctrl.butnClicked">
        <button type="button" ng-click="$ctrl.toggle()">{{$ctrl.sisu}}</button>
        <span ng-show="$ctrl.signup">
	        <div>
	          <form ng-submit="$ctrl.handleSignUp(username, password, email)">
	            <label> Name: </label>
	            <input type="text" ng-model="username"> </input>
	            <label> Password: </label>
	            <input type="password" ng-model="password"> </input>
	            <label> Email: </label>
	            <input type="text" ng-model="email"> </input>
	            <button type="submit">Sign Up</button>
	          </form>
	        </div>
	    </span>
	        <span ng-hide="$ctrl.signup">
		        <div>
		          <form ng-submit="$ctrl.handleSignIn(username, password)">
		            <label> Name: </label>
		            <input type="text" ng-model="username"> </input>
		            <label> Password: </label>
		            <input type="password" ng-model="password"> </input>
		            <button type="submit">Sign In</button>
		          </form>
		        </div>
		    </span>	
      </span>
    </div>`
})