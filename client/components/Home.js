angular.module('app')
.controller('HomeCtrl', function(Caps) {

  this.someVar = true;
  this.capsData = ['each', 'word', 'is', 'a', 'capsule'];

  this.handleFilter = function(event) {

    Caps.filterCaps(event.target.id, (err, res) => {
      if (!err) {
        console.log('the get request for filtered data is ', res);
        this.capsData = res;
      } else {
        throw new Error(err);
      }
    })
  }
})
.component('homePage', {
  controller: 'HomeCtrl',
  templateUrl: '../templates/home.html'
})
