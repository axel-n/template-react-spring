export default {
    items: [
        {
            name: 'Дашборд',
            url: '/dashboard',
            icon: 'icon-speedometer',
            badge: {
                variant: 'info',
            },
        },
        {
            name: 'Задачи',
            icon: 'icon-cursor',
            children: [
                {
                    name: 'Созданные мною',
                    url: '/tasks/createdByMe',
                    icon: 'icon-cursor',
                },
                {
                    name: 'На мне',
                    url: '/tasks/assignedForMe',
                    icon: 'icon-cursor',
                },
                {
                    name: 'Доска',
                    url: '/tasks',
                    icon: 'icon-cursor',
                },
            ],
        }
    ],
};
