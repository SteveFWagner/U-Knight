INSERT INTO users ( username, password, image, email)
VALUES ( ${username}, ${password}, ${image}, ${email} )
returning user_id, username, email, image
