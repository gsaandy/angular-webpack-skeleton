/* global document */
import angular from 'angular';
import App from 'app/app';

angular
    .element(document)
    .ready(() => {
        angular
            .module('angular-webpack-app', [App.name])
            .run(() => {
                console.log('App started!');
            });

        const body = document.getElementsByTagName('body')[0];
        angular.bootstrap(body, ['angular-webpack-app']);
    });
