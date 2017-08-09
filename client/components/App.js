angular.module('app', [])
.controller('AppCtrl', function() {
  this.signedIn = true;
  this.page = 'home';
})
.component('app', {
  controller: 'AppCtrl',
  templateUrl: '../templates/app.html'
})
