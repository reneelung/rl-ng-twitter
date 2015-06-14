'use strict'

angular.module('twitterApp.tweet', [])

.controller('Tweet-Ctrl', function(server, $log, $q, $timeout, $scope){
	var vm = this;
	var service = {};

	vm.tweeted = false;

	service.addTweet = function(data){
		// server.addTweet(data)
		// 	.then(function(response){
		// 		vm.tweeted = true;
		// 		$timeout(function() { vm.tweeted = false; service.resetForm() }, 2000);
		// 	});

		service.resetForm();
		console.log(vm.tweeted);
	}

	service.resetForm = function()
	{
		vm.tweetData = "";
		vm.tweeted = false;

	}

	return service;
});