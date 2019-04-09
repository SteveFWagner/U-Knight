INSERT INTO users ( email, password, username, image )
VALUES ( ${email}, ${password}, ${username}, ${image} )
returning user_id, username, password, email, image