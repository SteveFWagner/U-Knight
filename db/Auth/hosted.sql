select title, category, start_date, event_id
from events
where events.user_id = ${id}