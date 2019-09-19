---------------------------------------
-- Пользователи
-- пароль для всех: 123
---------------------------------------
-- менеджеры
insert into user (id, name, role, email, password, enabled)
values (1, 'Петров Василий', 0, 'user1@gmail.com', '$2a$10$LPWXDhi23gwFk.4tvfv8quqBCTBSAJt9SBXZLRCjz8yJ9.O8gAXOW', true),
       (2, 'Иванов Петр', 0, 'user2@gmail.com', '$2a$10$LPWXDhi23gwFk.4tvfv8quqBCTBSAJt9SBXZLRCjz8yJ9.O8gAXOW', true);

-- бухгалтера
insert into user (id, name, role, email, password, enabled)
values (3, 'Иванова Светлана', 1, 'user3@gmail.com', '$2a$10$LPWXDhi23gwFk.4tvfv8quqBCTBSAJt9SBXZLRCjz8yJ9.O8gAXOW', true);

-- директор
insert into user (id, name, role, email, password, enabled)
values (4, 'Сидоров Иван', 2, 'user4@gmail.com', '$2a$10$LPWXDhi23gwFk.4tvfv8quqBCTBSAJt9SBXZLRCjz8yJ9.O8gAXOW', true);

-- админ
insert into user (id, name, role, email, password, enabled)
values (5, 'Админ', 3, 'admin@gmail.com', '$2a$10$LPWXDhi23gwFk.4tvfv8quqBCTBSAJt9SBXZLRCjz8yJ9.O8gAXOW', true);

---------------------------------------
-- Проекты
---------------------------------------
-- на менеджерах
insert into task (id, name, creator, status, assign_team, description, cdat)
values (1, 'contract1', 1, 0, 0, 'description1', CURRENT_TIMESTAMP),
       (2, 'contract2', 2, 0, 0, 'description2', CURRENT_TIMESTAMP);

-- -- комменты
insert into message (id, user_id, comment, task_id, cdat)
values (1, 1, 'comment1 from Manager', 1, CURRENT_TIMESTAMP),
       (2, 2, 'comment2 from Manager', 1, CURRENT_TIMESTAMP);


-- на бухгалтере
insert into task (id, name, creator, status, assign_team, description, cdat)
values (3, 'contract4', 1, 0, 1, 'description1', CURRENT_TIMESTAMP),
       (4, 'contract5', 2, 1, 1, 'description2', CURRENT_TIMESTAMP);

-- у директора
insert into task (id, name, creator, status, assign_team, description, cdat)
values (5, 'contract5', 1, 0, 2, 'description1', CURRENT_TIMESTAMP);
