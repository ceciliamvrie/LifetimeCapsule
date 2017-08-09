angular.module('app', [])
.controller('AppCtrl', function() {
  this.signedIn = false;
})
.component('app', {
  controller: 'AppCtrl',
  templateUrl: '../templates/app.html'
})
