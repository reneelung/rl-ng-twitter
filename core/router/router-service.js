'use strict'

angular.module('twitterApp.router',['ui.router'])
.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

	$urlRouterProvider.otherwise('home');
 	$locationProvider.html5Mode(false);

 	$stateProvider
    .state('home', {
    	url : 'home',
    	views: {
    		'main' : {
    			controller: 'Main-Ctrl as mainCtrl',
    			templateUrl: 'sections/main/main.html'
    		}
    	}    	
    })
    .state('tweet', {
    	url: 'tweet',
    	templateUrl: 'sections/tweet/tweet-form'
    });

})
.factory('router', function($q, $log, $state){
	var service = {};
	service.goToAddTweet = function () {
    	$state.go('tweet');
  	};
	return service;
});