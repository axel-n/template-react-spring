import React from "react";

const Dashboard = React.lazy(() => import("./views/Dashboard/Dashboard"));
const Contracts = React.lazy(() => import("./views/Tasks/Board"));
const CreatedByMe = React.lazy(() => import("./views/Tasks/CreatedByMe"));
const AssignedForMe = React.lazy(() => import("./views/Tasks/AssignedForMe"));

const routes = [
    {path: "/", exact: true, name: "Главная", component: Dashboard},
    {path: "/dashboard", name: "Дашборд", component: Dashboard},
    {path: "/tasks/createdByMe", name: "Созданные мною", component: CreatedByMe},
    {path: "/tasks/assignedForMe", name: "Назначенные на меня", component: AssignedForMe},
    {path: "/tasks", name: "Все задачи", component: Contracts},
];

export default routes;
