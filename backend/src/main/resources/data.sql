---------------------------------------
-- Пользователи
-- пароль для всех: 123
---------------------------------------
-- админ
insert into user (id, name, role, email, password)
values
    (1, 'Админ', 2, 'admin@gmail.com', '$2a$10$LPWXDhi23gwFk.4tvfv8quqBCTBSAJt9SBXZLRCjz8yJ9.O8gAXOW'),
    (2, 'Пользователь', 1, 'user@gmail.com', '$2a$10$LPWXDhi23gwFk.4tvfv8quqBCTBSAJt9SBXZLRCjz8yJ9.O8gAXOW');

