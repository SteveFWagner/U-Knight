UPDATE events_attended
SET paid = paid + $3
WHERE event_id = $1 AND user_id = $2;
