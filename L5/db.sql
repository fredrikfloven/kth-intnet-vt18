USE simfrelabs; # Byt till din egen  

DROP TABLE securities; # Radera om redan finns  
DROP TABLE orders; 

DROP TABLE trades; 

CREATE TABLE securities 
  ( 
     id   INT NOT NULL auto_increment, 
     name VARCHAR(64), 
     PRIMARY KEY (id) 
  ); 

CREATE TABLE orders 
  ( 
     id         INT NOT NULL auto_increment, 
     securityId INT, 
     type       VARCHAR(64), 
     price      FLOAT, 
     amount     INT, 
     uid        VARCHAR(64), 
     PRIMARY KEY (id) 
  ); 

CREATE TABLE trades 
  ( 
     id         INT NOT NULL auto_increment, 
     securityId INT, 
     price      FLOAT, 
     amount     INT, 
     dt         DATETIME, 
     buyer      VARCHAR(64), 
     seller     VARCHAR(64), 
     PRIMARY KEY (id) 
  );