import angular from 'angular';
import AppController from 'app/app-controller';
import UsersDataService from 'app/users/services/users-data-service';
import UsersList from 'app/users/components/list/users-list';

const UserModule = angular.module('userModule', ['ngMaterial'])

    // controllers
    .controller('AppController', AppController)

    // components
    .component(UsersList.name, UsersList.config)

    // services
    .service('UsersDataService', UsersDataService);

export default UserModule;
