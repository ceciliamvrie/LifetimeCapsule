angular.module('app')
.controller('LandingCtrl', function($scope, Auth) {
  this.username = '';
  this.butnClicked = true;
  this.password = '';
  this.signup = true;
  this.sisu = 'Need to Sign In?';
  this.error = 'true';


  this.getStarted = () => {
  	this.butnClicked = false;
  }

  this.handleSignUp = (username, password, email) => {
  	console.log(username, password, email, 'signed Up')
  	var obj = {username: username, password: password, email: email};
  	Auth.signup(obj, (err, res) => {
      if (err) {
        this.error = !this.error
        var handle = confirm('Please enter a valid username, passoword, and email');
        if (handle) {
          if (!this.error) {
            this.error = !this.error
          }
        }

      } else {
        $scope.$ctrl.userId = res;
      	this.handleSignIn(email, password)
        // console.log('successful server response for signup');
      }
  	})
  }

  this.handleSignIn = (email, password) => {
  	var obj = {email: email, password: password};
  	Auth.signin(obj, function(err, res) {
      if (err) {
        this.error = !this.error
        var handle = setTimeout(() => ('Your email and password do not match'), 100);
        if (handle) {
          if (!this.error) {
            this.error = !this.error
          }
        }
      } else {
        $scope.username = '';
        $scope.password = '';
        $scope.$ctrl.userId = res;
        $scope.$ctrl.signedIn = true;
        $scope.$ctrl.init(res);
      }
  	})
  }

  this.toggle = () => {
  	this.signup = !this.signup;
    this.style = !this.style;
  	if (this.signup) {
  	  this.sisu = 'Need to Sign In?';
  	} else {
  	  this.sisu = 'Create an Account';
  	}
  }

})
.component('landingPage', {
  controller: 'LandingCtrl',
  bindings: {
  	signedIn: '=',
    userId: '=',
    init: '='
  },
  templateUrl: '../templates/landing.html'
})
