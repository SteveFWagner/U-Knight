update users
set username = ${username}, bio = ${bio}, image = ${image}
where user_id = ${user_id};

Select username, bio, image
from users
where user_id = ${user_id};


