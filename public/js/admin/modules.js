/*
 *
 * Single file to declare all modules and all theirs dependencies
 *
 **/

'use strict';

angular.module('app.providers',[]);

angular.module('app.services',[]);

angular.module('app.directives', []);

angular.module('app.controllers',['app.services','app.directives']);