import React from "react";

const Dashboard = React.lazy(() => import("./views/Dashboard/Dashboard"));
const Contracts = React.lazy(() => import("./views/Contracts/Contracts"));
const ContractsCreatedByMe = React.lazy(() => import("./views/Contracts/CreatedByMe"));
const ContractsAssignedForMe = React.lazy(() => import("./views/Contracts/AssignedForMe"));

const routes = [
    {path: "/", exact: true, name: "Главная", component: Dashboard},
    {path: "/dashboard", name: "Дашборд", component: Dashboard},
    {path: "/projects/createdByMe", name: "Созданные мною", component: ContractsCreatedByMe},
    {path: "/projects/assignedForMe", name: "Назначенные на меня", component: ContractsAssignedForMe},
    {path: "/projects", name: "Все проекты", component: Contracts},
];

export default routes;
