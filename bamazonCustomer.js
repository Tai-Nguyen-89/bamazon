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
connection.connect(function (err) {
  if (err) throw err;
  showItems()
});

// Generates the items and shows it.
function showItems() {
  connection.query("SELECT * FROM products", function (err, response) {
    for (var i = 0; i < response.length; i++) {
      console.log("Item #: " + response[i].item_id +
        " --- Product Name: " + response[i].product_name +
        " --- Department Name: " + response[i].department_name +
        " --- Price: " + response[i].price +
        " --- Quantity: " + response[i].quantity + "\n");
    }
    customerInput(response);
  });
}

var customerInput = function (response) {
  inquirer.prompt([{
    type: "input",
    name: "choice",
    message: "What is the item number you would like to purchase"

    // When customer gives an answer, it'll loop through the array and look for that item ID. If there is one, it'll say the response is true and set the input to item.
  }]).then(function (answer) {
    var correct = false;
    for (var i = 0; i < response.length; i++) {
      if (response[i].item_id == answer.choice) {
        correct = true;
        var item = answer.choice;
        var id = i;

        inquirer.prompt({
          type: "input",
          name: "amount",
          message: "How many do you want to buy?",
          validate: function (value) {
            if (isNaN(value) == false) {
              return true;
            } else {
              return false;
            }
          }
        }).then(function (answer) {
          if ((response[id].quantity < answer.amount)) {
            console.log("Insufficient quantity available!");
            showItems();

          // } else if (response[id].quantity < parseInt(answer.amount)) {
          //     connection.query("UPDATE products SET quantity" + (response[id].quantity-answer.quantity) + "'WHERE item_ID'" + item + "'", function(err, response2) {
          //       console.log("Product was purchased.");
          //       showItems();
          //     })
            } else if (response[id].quantity > parseInt(answer.amount)) {
              connection.query("UPDATE products SET ? WHERE ?",
              [
                {
                  quantity: answer.amount--
                },
                {
                  item_id: item
                }
              ] 
              )
            } else {
              showItems();
              console.log("Not a valid selection!");
            }
        })
      }
      if(i == response.length && correct == false){
        showItems();
        console.log("Not a valid selection!2");
      }
    }
  })
}
