import angular from 'angular';

class AppController {

    constructor(UsersDataService, $mdSidenav) {
        'ngInject';

        this.usersDataService = UsersDataService;
        this.$mdSidenav = $mdSidenav;
        this.selected = null;
        this.users = [];

        this.loadUsers();
    }

    loadUsers() {
        this.usersDataService
            .loadAllUsers()
            .then((users) => {
                this.users = [].concat(users);
                this.selected = users[0];
            });
    }

    toggleUsersList() {
        this.$mdSidenav('left').toggle();
    }

    selectUser(user) {
        this.selected = angular.isNumber(user) ? this.users[user] : user;
    }

}

export default AppController;
