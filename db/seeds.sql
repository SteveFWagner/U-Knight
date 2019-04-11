CREATE TABLE events (
    event_id SERIAL PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    category VARCHAR(15) NOT NULL,
    description VARCHAR(255) NOT NULL,
    start_date VARCHAR(100) NOT NULL, 
    end_date VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL,
    zipcode INT NOT NULL, 
    image VARCHAR(255) NOT NULL
)

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY, 
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL,
    image VARCHAR(255)
)

CREATE TABLE events_attended (
    event_id INT REFERENCES events(event_id),
    user_id INT REFERENCES users(user_id),
    paid INT, 
    rating INT
)

CREATE TABLE messages (
    message_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    message VARCHAR(255)
)

CREATE TABLE event_chat(
    event_id INT REFERENCES events(event_id),
    message_id INT REFERENCES messages(message_id)
)

CREATE TABLE personal_chat(
    pc_id INT NOT NULL,
    message_id INT REFERENCES messages(message_id)
)

insert into events
(title, category, description, start_date, end_date, address, zipcode, image)
values
('I am within 10 miles', 'pc', 'location search test', 'today', 'today','some location',85020, null),
('I am within 10 miles', 'pc', 'location search test', 'today', 'today','some location',85020, null),
('I am within 10 miles', 'pc', 'location search test', 'today', 'today','some location',85020, null),
('I am within 25 miles', 'pc', 'location search test', 'today', 'today','some location',85305, null),
('I am within 25 miles', 'pc', 'location search test', 'today', 'today','some location',85305, null),
('I am within 25 miles', 'pc', 'location search test', 'today', 'today','some location',85305, null),
('I am within 50 miles', 'pc', 'location search test', 'today', 'today','some location',85396, null),
('I am within 50 miles', 'pc', 'location search test', 'today', 'today','some location',85396, null),
('I am within 50 miles', 'pc', 'location search test', 'today', 'today','some location',85396, null),
('I am over 50 miles', 'pc', 'location search test', 'today', 'today','some location',85348, null),
('I am over 50 miles', 'pc', 'location search test', 'today', 'today','some location',85348, null),
('I am over 50 miles', 'pc', 'location search test', 'today', 'today','some location',85348, null),
('I am Online', 'pc', 'location search test', 'today', 'today','some location',1000, null),
('I am Online', 'pc', 'location search test', 'today', 'today','some location',1000, null),
('I am Online', 'pc', 'location search test', 'today', 'today','some location',1000, null);

insert into users
(username, password, email, image)
values('yo momma', 'yo mamma password', 'yo momma email', null), 
('yo daddy', 'yo daddy password', 'yo daddy email', null), 
('isaac', 'firstSon', '123baby@mail.com', null), 
('icarus', 'im da best', 'paaaaulluuuuteeeenaisggop@idk.com', null), 
('ike', 'i fight for my friends', 'whatalamephrase@mail.com', null), 
('faux', 'i have a blaster', 'illkeeeeeelyou@mail.com', null), 
('theMan', 'idonthaveapassword', 'this.props@mail.com', null), 
('jordan', 'jondandeeznuts', 'whoopiewhoop', null), 
('garret', 'ivegotredhair', 'ilikeFire@mail.com', null), 
('ivan', 'ivegotblondehair', 'ilikeWindMagic@mail.com', null), 
('mia', 'ivegotBluehair', 'iloveWaterandHealingMagic@mail.com', null), 
('Felix', 'scrubdeeznuts', 'flake@mail.com', null), 
('Darius', 'imabigboy', 'ilikebigAxesandicannotLie@mail.com', null)