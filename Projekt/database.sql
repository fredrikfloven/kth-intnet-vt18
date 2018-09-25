DROP TABLE users;
DROP TABLE meals;
DROP TABLE ingredients;


CREATE TABLE users 
  ( 
     username VARCHAR(64),  
     password VARCHAR(64), 
     PRIMARY KEY (username) 
  ); 

CREATE TABLE meals 
  ( 
     id                  INT NOT NULL auto_increment,             
     userName           VARCHAR(64),        
     mealType           VARCHAR(64),        
     mealName           VARCHAR(64),  
     eatenAt            DATE, 
     ingredients     VARCHAR(64),      
     PRIMARY KEY (id) 
  );

CREATE TABLE ingredients 
  ( 
     ingredientName     VARCHAR(64), 
     kCal               FLOAT, 
     fat                FLOAT, 
     protein            FLOAT,  
     carb               FLOAT,  
     PRIMARY KEY (ingredientName) 
  ); 

INSERT INTO users VALUES(1,"user1","pw1");
INSERT INTO users VALUES(2,"user2","pw2");
INSERT INTO users VALUES(3,"user3","pw3");
INSERT INTO users VALUES(4,"user4","pw4");
INSERT INTO users VALUES(5,"user5","pw5");

INSERT INTO meals VALUES(1, "user1", "Omnivorian", "Chicken with Rice", "2018-02-01", "Raw Chicken, Raw Rice(Basmati)");
INSERT INTO meals VALUES(2, "user1", "Omnivorian", "Beef with Rice", "2018-02-02", "Raw Beef, Raw Rice(Basmati)");
INSERT INTO meals VALUES(3, "user2", "Vegetarian", "Rice", "2018-02-01", "Raw Rice(Basmati)");



INSERT INTO ingredients VALUES ("Raw Porkchop", 107, 2.6, 20.6, 0);
INSERT INTO ingredients VALUES ("Raw Salmon", 160, 9.6, 18.6, 0);
INSERT INTO ingredients VALUES ("Raw Chicken", 104, 1.2, 23.1, 0);
INSERT INTO ingredients VALUES ("Raw Beef", 123, 3.85, 21.8, 0);
INSERT INTO ingredients VALUES ("Raw Rice, Basmati", 359, 1, 9.2, 76.7);
INSERT INTO ingredients VALUES ("Raw Potato", 79, 0.1, 1.7, 16.4);
INSERT INTO ingredients VALUES ("Raw Pasta, fresh, with egg", 132, 1.62, 5.31, 22.8);