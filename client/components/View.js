angular.module('app')
.controller('ViewCtrl', function(Caps) {

	this.handleEdit = (event) => {
	  //dynamically grabs each capsules data
	  console.log(this.cap)
	}

	this.handleEmail = (event) => {
      //dynamically grabs each capsules data
	  console.log(this.cap)
	}
})
.component('viewPage', {
  controller: 'ViewCtrl',

  bindings: {
  	cap: '<'
  },

  templateUrl: '../templates/view.html'
})