SELECT event_id, events_attended.user_id, paid, rating, username, image
FROM events_attended
JOIN users on events_attended.user_id = users.user_id
WHERE event_id = $1