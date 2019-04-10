insert into events
(title, category, description, start_time, end_time, address, date, zipcode)
values($1, $2, $3, $4, $5, $6, $7, $8);

-- select * from events