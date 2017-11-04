
//console.log("test");

$(document).ready(function() {

	//Firebase info
  	var config = {
	    apiKey: "AIzaSyDyqtbTmnnwdpO76yCIP15n4SbdPlxn0pM",
	    authDomain: "trainscheduler-cornel.firebaseapp.com",
	    databaseURL: "https://trainscheduler-cornel.firebaseio.com",
	    projectId: "trainscheduler-cornel",
	    storageBucket: "trainscheduler-cornel.appspot.com",
	    messagingSenderId: "626127376868"
	  };

	  firebase.initializeApp(config);

	  //variable to reference database
	  var database = firebase.database();

	//when user clicks on submit button
	$('#add-train').on('click', function() {
		event.preventDefault();
		
		//capturing input data when user clicks button
		var trainName = $('#train-name').val().trim();
		var trainDestination = $('#destination-input').val().trim();
		var firstTrain = $('#first-train').val().trim();
		var frequency = $('#frequency-input').val().trim();

		console.log(trainName);
		console.log(trainDestination);
		console.log(firstTrain);
		console.log(frequency);

		//getting input data to firebase
		database.ref().push({
			trainName = trainName,
			trainDestination = trainDestination,
			firstTrain = firstTrain,
			frequency = frequency,
		});

		//reset form to be empty
		$('#form').reset();
	});

		database.ref().on("value", function(snapshot) {

		//check database
		//console.log(snapshot.val());
			var nextTrainArrival;
			var minutesAway;
			//first train
			var firstTrain = moment(snapshot.val().firstTrain, "hh:mm");

			//time difference from now till train arrives
			var timeDifference = momen().diff(moment(firstTrain), "minutes");
			var remainder = timeDifference & snapshot.val().frequency;

			//minutes till next train arives
			var minutesNextTrain = snapshot.val().frequency - remainder;

			//the next train will arrive in
			var nextTrain = moment().add(minutesNextTrain, 'minutes');
			nextTrain = moment(nextTrain).format("hh:mm");

			//add a row to the website
			$('#add-row').append("<tr><td>" + snapshot.val().name + "</td>" +
				"<td>" + snapshot.val().destination + "</td>" +
				"<td>" + snapshot.val().frequency + "</td>" +
				"<td>" + nextTrain + "</td>" +
				"<td>" + minutesNextTrain + "</td></tr>");

			//error handling
	 
    		}, function(errorObject) {
      		console.log(errorObject.code);
    });


