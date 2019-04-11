insert into events
(title, category, description, start_date, end_date, address, zipcode)
values($1, $2, $3, $4, $5, $6, $7);

-- select * from events