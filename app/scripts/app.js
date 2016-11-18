'use strict';

/**
 * @ngdoc overview
 * @name kaoshiApp
 * @description
 * # kaoshiApp
 *
 * Main module of the application.
 */
angular
	.module('kaoshiApp', [])
	.controller("abc", function($scope, $http, getdata) {
		getdata.ajax('http://www.somenote.cn:1510/test', 'get', function(data) {
			//console.log(data)
			$scope.data = data
		})
		getdata.ajax('http://www.somenote.cn:1510/test2', 'get', function(data1) {
			//console.log(data1)
			$scope.data1 = data1
		})
		getdata.ajax('http://www.somenote.cn:1510/aut', 'get', function(data2) {
			//console.log(data2)
			$scope.data2 = data2
		})

	})
	.directive("qwe", function() {
		return {
			restrict: 'AEMC',
			template: '<div><li ng-repeat="a in d">{{a.title | create}}</li><li ng-repeat="b in c">{{b.title | create}}</li></div><div class="center"><img  ng-repeat="i in p" ng-src="{{i.img}}" /></div>',
			scope: true,
			transclude: true,
			scope: {
				d: "=data",
				p: "=data2",
				c: "=data1"
			},
			link: function(p, e, attr) {
				p.a = attr['b']
			}

		}
	})
	.filter("create", function() {
		return function(e) {
			if(e.length > 10) {
				return e.substring(0, 10) + '....'
			} else {
				return e
			}
		}
	})
	.service('getdata', function($http) {
		return {
			ajax: function(url, method, callback) {
				$http({
					url: url,
					method: method
				}).success(function(e) {
					callback(e)
				})
			}
		}
	})