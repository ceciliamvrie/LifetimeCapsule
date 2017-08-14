angular.module('app')

.controller('TickerCtrl', function() {
  if (this.capsule.buried) {
    let dateString = this.capsule.unearthDate.split('T')[0].split('-');
    let month = dateString[1];
    let day = dateString[2];
    let year = dateString[0];

    this.unearthMessage = `You may open this capsule on ${month}/${day}/${year}`;
  }
})

.component('ticker', {
  controller: 'TickerCtrl',

  bindings: {
    capsule: '<'
  },

  templateUrl: '../templates/ticker.html'
})
