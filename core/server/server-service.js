'use strict';

angular.module('twitterApp.server', [])

.factory('server', function($q, $log){

		var oauthResult;
		var oauthCookie = "oauthio_provider_twitter";
		var service = {};

		service.initialize = function() {
			OAuth.initialize('m38einQIsx3Qo_a45PnK_aX5CZI', { cache : true })
			oauthResult = oauthResult || OAuth.create('twitter');	
		};

		service.connectTwitter = function() {
			return OAuth.popup('twitter', { cache : true });
		};

		service.isReady = function() {
			return oauthResult;
		};		

		service.clearCache = function() {
			service.signOut();
			OAuth.clearCache();
			oauthResult = false;
		};

		service.getLatestTweets = function() {
			return oauthResult.get('/1.1/statuses/home_timeline.json');
		};

		service.checkLoggedIn = function() {			
		    var cookies = document.cookie.split(';');
		    var logged_in = false;
		    angular.forEach(cookies, function(key, value){
		    	var cookie = key.split('=');	
		    	if (cookie[0].replace(/ /g, '') == oauthCookie && cookie[1])
		    	{
		    		logged_in = true;
		    	}
		    });

		    return logged_in;		    
		}

		service.getUser = function() {
			return oauthResult.me();
		}

		service.signOut = function() {
			document.cookie = oauthCookie + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC"
		}

		service.addTweet = function(data) {
			var postUrl = '/1.1/statuses/update.json?';

			if (data && data.length <= 140) {
				data = encodeURIComponent(data);				
				return oauthResult.post(postUrl + "status=" + data);
			}

			return false;			
		}

		return service;
	}
);