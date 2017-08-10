angular.module('app')
.controller('HomeCtrl', function(Caps) {
  this.view = true;
  this.editingViewCapsule = false;
  this.capsuleId = 0;
  this.capsuleToEdit = {};
  this.capsData = [{capsuleName: 'first one', contents: [{title: 'some title', input: 'some message'}], inProgress: true},
   {capsuleName: 'second one', contents: [{name: 'some title', input: 'some other message'}], inProgress: false}];

   Caps.filterCaps('all', (err, allCaps) => {
     if (err) {
      throw new Error(err);
     } else {
      console.log('getter')
       this.capsData = allCaps
     }
   });

  this.handleFilter = function(event) {

    Caps.filterCaps(event.target.id, (err, res) => {
      if (!err) {
        console.log('the get request for filtered data is ', res);
        this.capsData = res;
      } else {
        throw new Error(err);
      }
    });
  }

  this.editCapsule = (capsule) => {
    this.capsuleToEdit = capsule;
    this.capsuleToEdit.contents = [{title: 'some title', input: 'some message'}];
    this.editingViewCapsule = true;
    this.view = false;
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
          this.editingViewCapsule = false;
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
