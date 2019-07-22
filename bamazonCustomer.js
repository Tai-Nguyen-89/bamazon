var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3307,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  showItems()
});

// Generates the items and shows it.
function showItems() {
  connection.query("SELECT * FROM products", function (err, res) {
    for(var i=0; i<res.length; i++){
      console.log(res[i].item_id+" --- "+res[i].product_name+" --- "+res[i].department_name+" --- "+res[i].price+" --- "+res[i].quantity+"\n");
    }
    connection.end();
    start()
  });
}

