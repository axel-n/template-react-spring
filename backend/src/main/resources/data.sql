---------------------------------------
-- Users
-- pass decoded - 123
---------------------------------------
insert into user (id, name, role, email, password, cdat)
values
    (1, 'UserName Admin', 1, 'admin@gmail.com', '$2a$10$LPWXDhi23gwFk.4tvfv8quqBCTBSAJt9SBXZLRCjz8yJ9.O8gAXOW', CURRENT_TIMESTAMP),
    (2, 'UserName User', 0, 'user@gmail.com', '$2a$10$LPWXDhi23gwFk.4tvfv8quqBCTBSAJt9SBXZLRCjz8yJ9.O8gAXOW', CURRENT_TIMESTAMP);

insert into product (id, name, category, price, cdat)
values
    (1, 'Milk1', 1, 3.0, CURRENT_TIMESTAMP),
    (2, 'Milk2', 1, 5.0, CURRENT_TIMESTAMP),
    (3, 'Meat1', 1, 10.0, CURRENT_TIMESTAMP),
    (4, 'Meat2', 1, 15.0, CURRENT_TIMESTAMP),
    (5, 'Fish1', 1, 10.0, CURRENT_TIMESTAMP),
    (6, 'Fish2', 1, 15.0, CURRENT_TIMESTAMP);


