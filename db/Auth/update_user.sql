update users
set username = ${username}, bio = ${bio}, image = ${image}
where user_id = ${id};

Select username, bio, image, user_id
from users
where user_id = ${id};


