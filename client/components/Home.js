angular.module('app')
.controller('HomeCtrl', function(Caps) {
  this.id = 0;
  this.view = true;
  this.capsData = ['each', 'word', 'is', 'a', 'capsule'];

  this.handleFilter = function(event) {

    // Caps.filterCaps(event.target.id, (err, res) => {
    //   if (!err) {
    //     console.log('the get request for filtered data is ', res);
    //     this.capsData = res;
    //   } else {
    //     throw new Error(err);
    //   }
    // })
  }
 
  this.toggleToCreate = () => {
    console.log(this.id)

    // Caps.createCap(this.id, function(err, res) {
    //   if (err) {
    //     console.log('You dun screwed up');
    //     throw new Error(err);
    //   } else {
    //     console.log('successfully created empty capsule', res);
    //   }
    // })
  }

  this.toggleToView = () => {
    if(!this.view) {
      var saveProgress = confirm('Should we save this session?');
      if(saveProgress) {
        //save capsule
      }
      this.view = true;
    }
  }


})
.component('homePage', {
  controller: 'HomeCtrl',
  bindings: {

  },
  templateUrl: '../templates/home.html'
})
