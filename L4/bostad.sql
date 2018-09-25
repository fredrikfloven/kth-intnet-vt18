use baarsoe; # Byt till eget användarnamn

drop table bostader; # Om det finns en tidigare databas

create table bostader (
lan varchar(64),
objekttyp varchar(64),
adress varchar(64),
area float,
rum int,
pris float,
avgift float
)CHARACTER SET latin1 COLLATE latin1_swedish_ci;


insert into bostader values ('Stockholm','Bostadsrätt','Polhemsgatan 1',30,1,1000000,1234);

insert into bostader values ('Stockholm','Bostadsrätt','Polhemsgatan 2',60,2,2000000,2345);

insert into bostader values ('Stockholm','Villa','Storgatan 1',130,5,1000000,3456);

insert into bostader values ('Stockholm','Villa','Storgatan 2',160,6,1000000,3456);

insert into bostader values ('Uppsala','Bostadsrätt','Gröna gatan 1',30,1,500000,1234);

insert into bostader values ('Uppsala','Bostadsrätt','Gröna gatan 2',60,2,1000000,2345);

insert into bostader values ('Uppsala','Villa','Kungsängsvägen 1',130,5,1000000,3456);

insert into bostader values ('Uppsala','Villa','Kungsängsvägen 2',160,6,1000000,3456);

insert into bostader values ('Uppsala','Bostadsrätt','Kungsängsvägen 4',33,2,1000000,6133);

insert into bostader values ('Malmö','Bostadsrätt','Minigatan 2',55,2,1700000,1345);

insert into bostader values ('Malmö','Villa','Minigatan 4',134,7,2000000,5313);

insert into bostader values ('Malmö','Villa','Maxigatan 12',122,6,2200000,5341);

insert into bostader values ('Malmö','Radhus','Maxigatan 22',170,8,1200000,1677);

insert into bostader values ('Stockholm','Bostadsrätt','Ringvägen 222',15,1,1500000,3614);

insert into bostader values ('Stockholm','Bostadsrätt','Sveavägen 44',22,1,1900000,6173);

insert into bostader values ('Stockholm','Bostadsrätt','Drottninggatan 11',32,2,2800000,6177);

insert into bostader values ('Stockholm','Bostadsrätt','Kungsgatan 20',36,2,3000000,7613);

insert into bostader values ('Stockholm','Bostadsrätt','Sturegatan 5',77,4,4700000,8133);

insert into bostader values ('Stockholm','Radhus','Broplansgatan 63',60,3,1900000,5331);

insert into bostader values ('Säffle','Villa','Mörehus',450,11,350000,1776);

insert into bostader values ('Solna','Radhus','Kyrkobacken 15',55,4,2600000,4443);

insert into bostader values ('Solna','Villa','Råsundavägen 49',164,6,4000000,5331);

SELECT * FROM bostader
