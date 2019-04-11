INSERT INTO users ( username, password, email)
VALUES ( ${username}, ${password}, ${email} )
returning user_id, username, email, image
