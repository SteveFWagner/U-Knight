CREATE TABLE events (
    event_id SERIAL PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    category VARCHAR(15) NOT NULL,
    description VARCHAR(255) NOT NULL,
    start_time VARCHAR(100) NOT NULL, 
    end_time VARCHAR(100) NOT NULL,
    date VARCHAR(100) NOT NULL, 
    address VARCHAR(255) NOT NULL,
    zipcode INT NOT NULL, 
    image VARCHAR(255) NOT NULL
)

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY, 
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
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
(title, category, description, start_time, end_time, date, address, zipcode, image)
values('advanced wars', 'strategy', 'advanced wars is awesome', '10:00 AM', '12:00 PM', '4/10/2019', '123 sesame street', 85050, null);

insert into events
(title, category, description, start_time, end_time, date, address, zipcode, image)
values('golden sun', 'rpg', 'why is isaac not in smash bros as a character?', '5:00 PM', '8:00 PM', '4/11/2019', '123 whoopie doo', '89265', null);

insert into events
(title, category, description, start_time, end_time, date, address, zipcode, image)
values('diablo 3', 'rpg', 'how is killing demons and skellys not fun? hater....', '5:00 AM', '7:00 AM', '4/12/2019', '123 holy cow', '68769', null);

insert into events
(title, category, description, start_time, end_time, date, address, zipcode, image)
values('call o booty', 'action/shooter', 'hide ur wife, hide ur kids', '8:00 AM', '8:00 PM', '4/13/2019', '123 gg ez', '53487', null);

insert into events
(title, category, description, start_time, end_time, date, address, zipcode, image)
values('For Honor', 'fighting', 'best fighting game that makes me rage all day long', '6:00 PM', '6:10 PM', '4/14/2019', '123 lallapalooza', '45387', null);

insert into events
(title, category, description, start_time, end_time, date, address, zipcode, image)
values('Rocket League', 'Arcade', 'Im ranked plat but i consistently play like a bronze baddie', '8:05 AM', '8:05 PM', '4/15/2019', '123 yo mamma way', '48723', null);

insert into events
(title, category, description, start_time, end_time, date, address, zipcode, image)
values('The Order 1886', 'Action/Shooter', 'Beautiful cinematic game, with steam punk theme', '6:29 PM', '10:00 PM', '4/16/2019', '123 whats a new address for lolz?', '87135', null);

insert into events
(title, category, description, start_time, end_time, date, address, zipcode, image)
values('Divinity Original Sin', 'rpg', 'Casting magic, buffing my tank, game is ez', '5: 00 AM', '60 hours and 150 dirty diapers later', '4/17/2019', '123 in the darkness', '48366', null);

insert into events
(title, category, description, start_time, end_time, date, address, zipcode, image)
values('Super Smash Brothers Ultimate', 'own category', 'if its between smash or pass im gonna definitely take smash', '5:00 AM', '24 hour event', '4/18/2019', '123 smash me right in the...', '41596', null);

insert into events
(title, category, description, start_time, end_time, date, address, zipcode, image)
values('Age of Empires', 'rts', 'come with friends leave with none', '6:00 PM', '10:00 PM', '4/19/2019', '123 gotta poo gotta pee dr', '42356', null);

insert into events
(title, category, description, start_time, end_time, date, address, zipcode, image)
values('World of Warcraft', 'mmorpg/action', 'i never played this game... do i regret it? not unless they comeout with an epic diablo MMO', '1:00 AM 2004', 'TBD', '11/23/2004', '123 internet way, no creeps at my house', '69795', null);

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