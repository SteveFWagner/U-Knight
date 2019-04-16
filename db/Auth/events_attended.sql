Select events.event_id, users.username, events.title, events.category, events.start_date
from events_attended
join users on events_attended.user_id = users.user_id
join events on events_attended.event_id = events.event_id
where events_attended.user_id = ${id}