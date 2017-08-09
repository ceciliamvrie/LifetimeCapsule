angular.module('app', [])
.controller('AppCtrl', function() {
  this.signedIn = true;
})
.component('app', {
  controller: 'AppCtrl',
  templateUrl: '../templates/app.html'
})
