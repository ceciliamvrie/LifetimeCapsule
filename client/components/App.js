angular.module('app', [])
.controller('AppCtrl', function() {
  this.signedIn = false;
  this.userId = '';
})
.component('app', {
  controller: 'AppCtrl',
  templateUrl: '../templates/app.html'
})
