import template from 'app/users/components/list/users-list.html';

export default {
    name: 'usersList',
    config: {
        bindings: { users: '<', selected: '<', showDetails: '&onSelected' },
        template,
    },
};
