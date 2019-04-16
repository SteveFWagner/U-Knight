insert into events
(title, category, description, start_date, end_date, address, zipcode, image)
values($1, $2, $3, $4, $5, $6, $7, $8)

returning event_id