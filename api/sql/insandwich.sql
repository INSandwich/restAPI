PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS Category(
  Id INTEGER PRIMARY KEY AUTOINCREMENT,
  Name CHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS Roles(
  Id INTEGER PRIMARY KEY AUTOINCREMENT,
  Name CHAR(50) NOT NULL
);

INSERT INTO Roles (Name) Values("Guest");
INSERT INTO Roles (Name) Values("Customer");
INSERT INTO Roles (Name) Values("Admin");

INSERT INTO Category (Name) Values("Sandwiches");
INSERT INTO Category (Name) Values("Desserts");
INSERT INTO Category (Name) Values("Boissons");

CREATE TABLE IF NOT EXISTS Users(
  Id INTEGER PRIMARY KEY AUTOINCREMENT,
  FirstName CHAR(100) NOT NULL,
  LastName CHAR(100) NOT NULL,
  Email CHAR(254) NOT NULL,
  Login CHAR(50) UNIQUE NOT NULL,
  Password CHAR(254) NOT NULL,
  Adresse CHAR(300) NOT NULL,
  Tokens INTEGER default 0,
  Role_Id INTEGER NOT NULL default 1,
  CONSTRAINT fk_role_id FOREIGN KEY (Role_Id) REFERENCES Roles(Id)
);

INSERT INTO Users (FirstName, LastName, Email, Login, Password, Adresse, Tokens)
  VALUES ("Lorem", "ipsum", "Lorem.ipsum@dolor", "li", "dolor", "rue sit", 5);

INSERT INTO Users (FirstName, LastName, Email, Login, Password, Adresse, Tokens)
  VALUES ("Lorem", "ipsum", "Lorem.ipsum@dolor", "li2", "dolor", "rue sit", 2);

INSERT INTO Users (FirstName, LastName, Email, Login, Password, Adresse, Tokens)
  VALUES ("Lorem", "ipsum", "Lorem.ipsum@dolor", "li3", "dolor", "rue sit", 1);

INSERT INTO Users (FirstName, LastName, Email, Login, Password, Adresse, Tokens)
  VALUES ("Lorem", "ipsum", "Lorem.ipsum@dolor", "li4", "dolor", "rue sit", 822);

INSERT INTO Users (FirstName, LastName, Email, Login, Password, Adresse, Tokens)
  VALUES ("Lorem", "ipsum", "Lorem.ipsum@dolor", "li5", "dolor", "rue sit", 12);

INSERT INTO Users (FirstName, LastName, Email, Login, Password, Adresse, Tokens)
  VALUES ("Lorem", "ipsum", "Lorem.ipsum@dolor", "li6", "dolor", "rue sit", 42);

CREATE TABLE IF NOT EXISTS Products(
  Id INTEGER PRIMARY KEY AUTOINCREMENT,
  Name CHAR(80) NOT NULL,
  Description TEXT,
  Available INTEGER default 0,
  Image CHAR(60) NOT NULL,
  Price REAL NOT NULL,
  Category_Id INTEGER,
  CONSTRAINT fk_category_id FOREIGN KEY (Category_Id) REFERENCES Category(Id)
);

INSERT INTO Products(Name, Description, Available, Image, Price, Category_Id) Values("Kebab", "Le classique kebab, toujours la star des sandwicheries. Laissez vous tenter par cette douceur turque.", 1, "http://www.goldenmoustache.com/wp-content/uploads/2016/05/2b5747be-847b-42d4-a9d0-cd919b159c9e_maxi-kebab-vip-mag-171-1.jpg", 2.5, 1);
INSERT INTO Products(Name, Description, Available, Image, Price, Category_Id) Values("Galette Saucisse", "La Bretagne au rendez vous, quoi de mieux qu'une bonne saucisse enroulée dans sa galette pour se remémorer son beau pays?", 1, "http://www.centerblog.net/loisir/202880-6583277-la-galette-saucisse-#", 2.5, 1);
INSERT INTO Products(Name, Description, Available, Image, Price, Category_Id) Values("Tacos", "Parlons peu, parlons bien, quel est le sandwich préféré des étudiants ? Bien evidemment le tacos ! Goutez à ce concentré d'énergie !", 1, "http://mustikebab.com/wp-content/uploads/2016/02/Tacos-poulet-musti-kebab.jpg", 3.5, 1);
INSERT INTO Products(Name, Description, Available, Image, Price, Category_Id) Values("Panini", "Un sandwich connu, grillé délicatement par nos soins. Voici un des sandwiches les plus convoités par les plus jeunes.", 1, "http://lba-inc.com/newsite/wp-content/uploads/2014/04/panini.jpg", 1.5, 1);
INSERT INTO Products(Name, Description, Available, Image, Price, Category_Id) Values("Suedois", "Brrrrr, le grand froid, le saumon, les jolies blondes... Bref la suède quoi ! Et quoi de meilleur que leur sandwich suedois ?", 1, "http://www.patisseriepalanque.com/WebRoot/LaPoste2/Shops/box16474/4F29/9530/6F19/F58C/B967/0A0C/05EA/74B3/Isandwich_suedois_saumon.jpg", 2, 1);
INSERT INTO Products(Name, Description, Available, Image, Price, Category_Id) Values("Churros", "Un vrai met de festival, venez apprecier nos churros faits avec amour...", 1, "https://smittenkitchendotcom.files.wordpress.com/2016/03/churros1.jpg", 1, 2);
INSERT INTO Products(Name, Description, Available, Image, Price, Category_Id) Values("Crêpes", "Quand il fait froid, rien de tel qu'une bonne crêpe au nutella pour se réchauffer, et satisfaire ses papilles...", 1, "https://i.ytimg.com/vi/FRDMBhBKB7M/maxresdefault.jpg", 2, 2);
INSERT INTO Products(Name, Description, Available, Image, Price, Category_Id) Values("Gaufres", "Un autre met d'hiver, l'incontournable gauffre. Quel enfant refuserais une gaufre ?", 1, "http://demandware.edgesuite.net/aahv_prd/on/demandware.static/-/Sites-catalog-picard/default/dw1f7dd809/produits/pains-viennoiseries/edition/000000000000043455_E2.jpg", 2.5, 2);
INSERT INTO Products(Name, Description, Available, Image, Price, Category_Id) Values("Glace", "Plutôt un met d'été, mais aussi agréable et apprécié en hiver, la glace ! C'est froid, mais qu'est-ce que c'est bon !", 1, "http://www.newhealthadvisor.com/images/1HT02932/ice%20cream.jpg", 2.5, 2);
INSERT INTO Products(Name, Description, Available, Image, Price, Category_Id) Values("Coca-cola", "The one and only coke. La recette est secrète, mais c'est aussi secretement bon...", 1, "https://pbs.twimg.com/profile_images/770467680012890112/kSz1jtnn.jpg", 0.5, 3);
INSERT INTO Products(Name, Description, Available, Image, Price, Category_Id) Values("Orangina", "Les oranges, le matin, le midi, le soir, mais surtout sous forme liquide !", 1, "http://en.wikifur.com/w/images/c/c4/Orangina_logo.JPG", 0.5, 3);
INSERT INTO Products(Name, Description, Available, Image, Price, Category_Id) Values("Iced-Tea", "Venez déguster notre thé glacé maison, fait avec tout le savoir faire américain.", 1, "http://s.eatthis-cdn.com/media/images/ext/675083154/sweet-iced-tea.jpg", 0.5, 3);

CREATE TABLE IF NOT EXISTS Commands(
  Id INTEGER PRIMARY KEY AUTOINCREMENT,
  User_Id INTEGER NOT NULL,
  CONSTRAINT fk_user_id FOREIGN KEY (User_Id) REFERENCES Users(Id)
);

CREATE TABLE IF NOT EXISTS Command_Lines(
  Id INTEGER PRIMARY KEY AUTOINCREMENT,
  Amount INTEGER DEFAULT 1,
  Command_Id INTEGER NOT NULL,
  Product_Id INTEGER NOT NULL,
  CONSTRAINT fk_command_id FOREIGN KEY (Command_Id) REFERENCES Commands(Id),
  CONSTRAINT fk_product_id FOREIGN KEY (Product_Id) REFERENCES Products(Id)
);

COMMIT;
