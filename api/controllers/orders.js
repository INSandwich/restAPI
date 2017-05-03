var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('insandwich.db');

var orders = {

<<<<<<< HEAD

=======
>>>>>>> refs/remotes/origin/master
  getAll: function(req, res){
    var pageSize = 9;
    var pageNumber = 0;

    if(req.query.pageSize != null) pageSize = req.query.pageSize;
    if(req.query.pageNumber != null) pageNumber = req.query.pageNumber;

    db.all("SELECT * from Commands, Command_Lines where Commands.id = Command_Lines.Command_Id Commands.id LIMIT ? OFFSET ?", pageSize, pageNumber, function(e, r){
      console.log(r);
    });
  },

  getByUser: function(req, res){

  },

  getOne: function(req, res){
    var pageSize = 9;
    var pageNumber = 0;

    if(req.query.pageSize != null) pageSize = req.query.pageSize;
    if(req.query.pageNumber != null) pageNumber = req.query.pageNumber;

    db.all("SELECT * FROM Commands WHERE Id = ?",
    req.params.id,
    function(e, r){
      if(e == null)
      {
        // retrieve command lines comming with the command
        db.all("SELECT * FROM Command_Lines WHERE Command_Id = ? LIMIT ? OFFSET ?",
        [req.params.id, pageSize, pageNumber], function(error, result){
            if(error == null)
            {
              res.status(200).json({
                commandInfo: r[0],
                lines : {
                  pageSize : pageSize,
                  pageNumber : pageNumber,
                  items: result
                }
              });
            } else {
              console.log(error);
              res.status(500).json({error : "Unable to get command's lines"});
            }
        });
      } else {
        res.status(500).json({error : "Unable to get command"});
      }
    })
  },

  create: function(req, res){

  },

  update: function(req, res){

  },

  delete: function(req, res){

  }
}

module.exports = orders;
<<<<<<< HEAD



}
=======
>>>>>>> refs/remotes/origin/master