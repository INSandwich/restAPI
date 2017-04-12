var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('insandwich.db');
var bcrypt = require('bcrypt');
var IsEmail = require('isemail');

/* To check a password with bcrypt :
bcrypt.compare(plaintextPwd, hash, function(err, res) {
    if(res == true) {
      console.log(plaintextPwd,"is correct");
    }
    else {
    console.log("wrong pwd");
    }
  }
);
*/




var users = {
  // Retrieve the list of users
  getAll: function(req, res) {
    var pageSize = 5;
    var pageNumber = 0;
    if(req.query.pageSize != null) {
      pageSize = req.query.pageSize;
    }
    if(req.query.pageNumber != null) {
      pageNumber = req.query.pageNumber;
    }
    db.all("SELECT * FROM Users LIMIT ? OFFSET ?", [pageSize, pageNumber],
      function(e, r) {
        if((r.length != 0) && (e == null)) {
          res.status(200).json({
            pageSize: pageSize,
            pageNumber: pageNumber,
            items: r
          });
        }
        else if (r.length == 0) {
          res.status(500).json({ error: "Error retrieving users.", detail: "No users in the database." }).end();
        }
        else {
          res.status(500).json({ error: "Error retrieving users.", detail: e }).end();
        }
      });
  },

  //router.post('/auth', users.auth);
  auth: function(req, res) {


    var rand = function() {
        return Math.random().toString(36).substr(2); // remove `0.`
    };

    var token = function() {
        return rand() + rand(); // to make it longer
    };

    var tokstring = token();

token();
    var password = req.body.password;
    var login = req.body.login;

    db.all("SELECT Password, Role_Id FROM Users WHERE Login LIKE ?", req.body.login,
      function(e, r) {
        if( (e == null) && (r.length != 0) ) {
          if(password == r[0].Password){
              res.status(200).json({ Message: "Successfully logged in", Token : tokstring, Login : login, Role_Id : r[0].Role_Id });
          }
          else if (r.length == 0) {
              res.status(500).json({ error: "Error retrieving user.", detail: "No user with this login." }).end();
          }

       }
       else {
         res.status(500).json({ error: "Error : blank request.", detail: e }).end();
       }

    });
  },

  // Retrieve an user by its ID
  getOne: function(req, res) {
    db.all("SELECT * FROM Users WHERE Id = ?", req.params.id,
      function(e, r) {
        if( (e == null) && (r.length != 0) ) {
          res.status(200).json(r);
        }
        else if (r.length == 0) {
          res.status(500).json({ error: "Error retrieving user.", detail: "No user with this Id." }).end();
        }
        else {
          res.status(500).json({ error: "Error retrieving user.", detail: e }).end();
        }
      }
    )
  },

  // Insert an user into the database
  create: function(req, res) {
      var password = req.body.password;

      // Gosh pls no, we gotta use promises here, to first execute everything in here, THEN the db.run
      if(password != "") {
        //console.log(password);

            var email = req.body.email;
            if(!(IsEmail.validate(email))) {
              res.status(500).json({error: "Please provide a correct email."}).end();
            }

            db.run("INSERT INTO Users (FirstName, LastName, Email, Login, Password, Adresse) VALUES (?, ?, ?, ?, ?, ?)",
            [req.body.firstname, req.body.lastname, email, req.body.login, req.body.password, req.body.adresse],
            function(e, r) {
              if((e == null) && (this.changes != 0)) {
                res.status(200).json({
                  Id: Number(this.lastID),
                  FirstName: req.body.firstname,
                  LastName: req.body.lastname,
                  Email: email,
                  Login: req.body.login,
                  Pwd: req.body.password,
                  Adresse: req.body.adresse
                });
              }
              else {
                res.status(500).json({ error: "Error creating user.", detail: e }).end();
              }
        });
        //res.status(500).json({error: "Hash failed, please provide a password."}).end();
      }


      // Check if this looks correct

  },

  // Update the user's role
  updateUserRole: function(req, res) {
    db.run("UPDATE Users SET Role_Id = ? WHERE Id = ?", [req.body.roleid, req.params.id],
      function(e, r) {
        //console.log(this);
        if((e == null) && (this.changes != 0)) {
          res.status(200).json({ message: "Successfully updated user role" });
        }
        else {
          res.status(500).json({error: "Error updating user role.", detail: e}).end();
        }
      }
    );
  },

  // Update the token value
  updateTokens: function(req, res) {
    var tokens = req.body.tokens;

    if(tokens > 0) {
      db.run("UPDATE Users SET Tokens = ? WHERE Id = ?", [tokens, req.params.id],
        function(e, r) {
          if((e == null) && (this.changes != 0)) {
            res.status(200).json({ message: "Successfully updated token amount."});
          }
          else {
            res.status(500).json({error: "Error updating token amount.", detail: e}).end();
          }
        }
      );
    }
    else {
      res.status(500).json({ "error": "Token value must be positive."}).end();
    }

  },

  addTokens: function(req, res) {
    var tokens = req.body.tokens;

    db.all("SELECT Tokens FROM Users WHERE id = ?", [req.params.id],
      function(e, r){
        if(e == null && r.length != 0)
        {
          db.run("UPDATE Users SET Tokens = ? WHERE id = ?",
          [req.body.tokens + r[0].Tokens, req.params.id],
          function(error, result){
            if(error == null)
            res.status(200).json({message: "Successfully added tokens"});
            else
            res.status(500).json({message : "Error adding token to user : update error"})
          })

        } else {
          res.status(500).json({message: "Error adding token to user : read error"});
        }
      }
    )
  },

  removeTokens: function(req, res) {
    var tokens = req.body.tokens;

    db.all("SELECT Tokens FROM Users WHERE id = ?", [req.params.id],
      function(e, r){
        if(e == null && r.length != 0)
        {
          if(r[0].Tokens >= req.body.tokens)
          {
            db.run("UPDATE Users SET Tokens = ? WHERE id = ?",
            [r[0].Tokens - req.body.tokens, req.params.id],
            function(error, result){
              if(error == null)
              res.status(200).json({message: "Successfully removed tokens"});
              else
              res.status(500).json({message : "Error removing token to user : update error"});
            })
          } else {
            res.status(500).json({message : "Error : insufficient tokens"});
          }

        } else {
          res.status(500).json({message: "Error removing token to user : read error"});
        }
      }
    )
  },

  updatePassword: function(req, res) {
    //Password verification before changing it
    var password = req.body.password;
    var newPassword = req.body.newpassword;

    //Get older password
    db.all("SELECT Password FROM Users WHERE Id = ?", req.params.id,
      function(e, r) {
        if( (e == null) && (r.length != 0) ) {

          //Checking if older password is okay
          //console.log(r[0].Password, password);
          if(password == r[0].Password && newPassword != 0){
            //Updating to the new password
            db.run("UPDATE Users SET Password = ? WHERE Id = ?", [req.body.newpassword, req.params.id],
              function(e, r) {
                //console.log(this);
                if((e == null) && (this.changes != 0)) {
                  res.status(200).json({ message: "Successfully updated user password" });
                }
                else {
                  res.status(500).json({error: "Error updating user password.", detail: e}).end();
                }
              }
            );
          }else{
            res.status(500).json({error: "Error updating user password : please enter your valid password."});
          }
        }
        else if (r.length == 0) {
          res.status(500).json({ error: "Error retrieving old password.", detail: "No user with this Id." }).end();
        }
        else {
          res.status(500).json({ error: "Error retrieving old password.", detail: e }).end();
        }
      }
    )


  },

  updateUserInfo: function(req, res) {

    var email = req.body.email;
    var FirstName = req.body.firstname;
    var LastName = req.body.lastname;
    var Login = req.body.login;
    var Adresse = req.body.adresse;
    console.log(email, FirstName, LastName, Login, Adresse)

    //We check the mail
    if(!(IsEmail.validate(email))) {
      res.status(500).json({error: "Please provide a correct email."}).end();

    //We check that every field is filled
  }else if(FirstName != ""  && LastName != "" && Login != "" && Adresse != ""){

      db.run("UPDATE Users SET FirstName = ?, LastName = ?, Email = ? , Login = ?, Adresse = ? WHERE Id = ?",
      [req.body.firstname, req.body.lastname, email, req.body.login, req.body.adresse, req.params.id],
      function(e, r) {
        if((e == null) && (this.changes != 0)) {
          res.status(200).json({
            Id: req.params.id,
            FirstName: req.body.firstname,
            LastName: req.body.lastname,
            Email: email,
            Login: req.body.login,
            Adresse: req.body.adresse
          });
        }
        else {
          res.status(500).json({ error: "Error updating user.", detail: e }).end();
        }
      });
    }else{
      res.status(500).json({error: "Please fill every field."});
    }


  },

  // Delete a role in the database
  delete: function(req, res) {
    db.run("DELETE FROM Users WHERE Id=?", req.params.id,
      function(e, r) {
        if ((e == null) && (this.changes != 0)) {
          res.status(200).json({
            message: "Role deleted successfully."
          });
        }
        else {
          res.status(500).json({ error: "Error deleting user.", detail: e }).end();
        }
      });
  }
}
module.exports = users;
