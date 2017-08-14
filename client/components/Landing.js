angular.module('app')
.controller('LandingCtrl', function($scope, Auth) {
  this.username = '';
  this.butnClicked = true;
  this.password = '';
  this.signup = true;
  this.sisu = 'Need to Sign Up?';
  this.error = false;


  this.getStarted = () => {
  	this.butnClicked = false;
  }

  this.handleSignUp = (username, password, email) => {
    this.error = false;
  	var obj = {username: username, password: password, email: email};
    Auth.signup(obj, (err, res) => {
      if (err) {
        this.error = true
      } else {
        $scope.$ctrl.userId = res;
        this.handleSignIn(email, password)
        setTimeout(this.toggle, 100);
      }
  	})
  }

  this.handleSignIn = (email, password) => {
    this.error = false;
  	var obj = {email: email, password: password};
  	Auth.signin(obj, (err, res) => {
      if (err) {
        this.error = true;
      } else {
        $scope.$ctrl.email = email;
        $scope.username = '';
        $scope.password = '';
        $scope.$ctrl.userId = res;
        $scope.$ctrl.signedIn = true;
        $scope.$ctrl.init(res);
      }
  	})
  }

  this.toggle = () => {
    this.error = false;
  	this.signup = !this.signup;
    this.style = !this.style;
  	if (this.signup) {
  	  this.sisu = 'Need to Sign Up?';
  	} else {
  	  this.sisu = 'Have an account? Sign In!';
  	}
  }

})
.component('landingPage', {
  controller: 'LandingCtrl',
  bindings: {
  	signedIn: '=',
    userId: '=',
    init: '=',
    email: '='
  },
  templateUrl: '../templates/landing.html'
})
