angular.module('app')
.controller('ViewCtrl', function($scope, Caps) {
  this.viewDetails = (cap) => {
  	$('.modalBodyBorder').on('click', function(event) {
  		$scope.chosenIndex = event.currentTarget.id;

	    $('#viewModal').html(
	    	`
	       <div class="modal-dialog" id="viewModalDialog">
			  <div class="modal-content" id="viewModalContent"> 
			    <div class="modal-header">
			      <button type="button" class="btn close" data-dismiss="modal">&times;</button>
			      <h4 class="modal-title">${cap.capsuleName}</h4>
			    </div>
			    <div class="viewModal-body" id="viewModalBody">
		     
     	    	  <h4>${cap.contents[$scope.chosenIndex].name}</h4>
     	    	  <p id="viewDetails">${cap.contents[$scope.chosenIndex].input}</p>
			    
			    </div>
			  </div>
			</div>
		  `
	    );

  	})
  }

  this.viewCapsule = (cap) => {
    $('#viewModal').html(
    	`
       <div class="modal-dialog" id="viewModalDialog">
		  <div class="modal-content" id="viewModalContent"> 
		    <div class="modal-header">
		      <button type="button" class="btn close" data-dismiss="modal">&times;</button>
		      <h4 class="modal-title">${cap.capsuleName}</h4>
		    </div>
		    <div class="viewModal-body" id="viewModalBody">
		    </div>
		  </div>
		</div>
	  `
    );

    for (var i = 0; i < cap.contents.length; i++) {
      $('.viewModal-body').append(
      	  `<div class="modalBodyBorder" id="${i}">
	    	  <h4>${cap.contents[i].name}</h4>
	    	  <p class="momentoInput">${cap.contents[i].input}</p>
    	  </div>`
       )
    }

  }

  if (this.cap.buried) {
  	console.log('buried or not ', this.cap.buried)
    let dateString = this.cap.unearthDate.split('T')[0].split('-');
    let month = dateString[1];
    let day = dateString[2];
    let year = dateString[0];

    this.unearthMessage = `You may open this capsule on ${month}/${day}/${year}`;
  }
})
.component('viewPage', {
  controller: 'ViewCtrl',

  bindings: {
  	cap: '<',
  	editCapsule: '=',
  	init: '<',
  	deleteCap: '=',
  	index: '<'
  },

  templateUrl: '../templates/view.html'
})