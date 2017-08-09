angular.module('app')
.controller('HomeCtrl', function(Caps) {
  this.view = true;
  this.capsuleId = 0;
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
    console.log('toggled', this.view)
    if (this.view) {
      Caps.createCap((err, capsuleId) => {
        if (err) {
          console.log('You dun screwed up');
          throw new Error(err);
        } else {
          this.capsuleId = capsuleId;
          console.log('capsuleId', capsuleId);
          this.view = false;
        }
      })
    }
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
