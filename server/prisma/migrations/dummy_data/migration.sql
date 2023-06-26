INSERT INTO "users" ("id", "name", "roles", "email", "password", "createdAt", "updatedAt")
VALUES ('b323148f-5c62-466a-a288-fc0d2f703a70', 'Admin', ARRAY['ADMIN']::"Role"[], 'admin@example.com', '$2b$10$ggFjMu6jMGmZujRcmzlM2.rrlSmpnk5Drh8UeXCg3eukcHzrtKgsS', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO "users" ("id", "name", "roles", "email", "password", "createdAt", "updatedAt")
VALUES ('14bb7607-c0e1-42a2-b230-d611f839bb99', 'User', ARRAY['USER']::"Role"[], 'user@example.com', '$2b$10$ggFjMu6jMGmZujRcmzlM2.rrlSmpnk5Drh8UeXCg3eukcHzrtKgsS', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
