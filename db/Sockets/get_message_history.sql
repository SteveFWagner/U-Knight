select username, message, user_id, message_id
from messages
where room_number = ${event_id}
order by message_id desc;