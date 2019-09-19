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
            name: 'Проекты',
            icon: 'icon-cursor',
            children: [
                {
                    name: 'Созданные мною',
                    url: '/projects/createdByMe',
                    icon: 'icon-cursor',
                },
                {
                    name: 'На мне',
                    url: '/projects/assignedForMe',
                    icon: 'icon-cursor',
                },
                {
                    name: 'Доска',
                    url: '/projects',
                    icon: 'icon-cursor',
                },
            ],
        }
    ],
};
