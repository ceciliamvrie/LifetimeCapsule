angular.module('homepage')
.controller('ViewCtrl', function() {

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

  template: 
    `<div class="capsule">
      <div class="capsuleBar">
        <i class="fa fa-pencil fa-fw" aria-hidden="true" ng-click="$ctrl.handleEdit($event)"></i>
        <i class="fa fa-envelope-o fa-fw" aria-hidden="true" ng-click="$ctrl.handleEmail($event)"></i>
      </div>
      <h1>{{$ctrl.cap}}</h1>
    </div>`
})