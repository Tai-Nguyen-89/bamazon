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

function showItems() {
  connection.query("SELECT * FROM products", function (err, res) {
      // if (err) throw err;
      // // console.log(res);
      console.log(JSON.stringify(res, null, 2));
      connection.end();
      start()
  });
}


// function to handle posting new items up for auction
function start() {
  // prompt for info about the item being put up for auction
  inquirer
    .prompt([
      // {
      //   name: "itemNumber",
      //   type: "input",
      //   message: "What is the item product number?"
      // },
      // {
      //   name: "amount",
      //   type: "input",
      //   message: "How many do you want to buy?"
      // },
      {
        name: "startingBid",
        type: "input",
        message: "What would you like your starting bid to be?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(res) {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO products SET ?",
        {
          item_name: res.item_id,
          buyAmount: res.quantity || 0,
        },
        function(err) {
          if (err) throw err;
          console.log("Buying Item");
          buyItem();
        }
      );
    });
}

function buyItem() {
  // query the database for all items being auctioned
  connection.query("SELECT * FROM auctions", function(err, results) {
    if (err) throw err;
    // once you have the items, prompt the user for which they'd like to bid on
    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].item_name);
            }
            return choiceArray;
          },
          message: "What change this from auction"
        },
        {
          name: "buy",
          type: "input",
          message: "How many do you want to buy?"
        }
      ])
      .then(function(answer) {
        // get the information of the chosen item
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].item_name === answer.choice) {
            chosenItem = results[i];
          }
        }

        // determine if bid was high enough
        if (chosenItem.highest_bid < parseInt(answer.bid)) {
          // bid was high enough, so update db, let the user know, and start over
          connection.query(
            "UPDATE auctions SET ? WHERE ?",
            [
              {
                highest_bid: answer.bid
              },
              {
                id: chosenItem.id
              }
            ],
            function(error) {
              if (error) throw err;
              console.log("Bid placed successfully!");
              start();
            }
          );
        }
        else {
          // bid wasn't high enough, so apologize and start over
          console.log("Your bid was too low. Try again...");
          start();
        }
      });
  });
}
