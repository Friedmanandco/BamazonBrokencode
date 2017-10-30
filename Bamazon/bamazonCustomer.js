var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("console.table")

var connection = mysql.createConnection({
      host: "localhost",
      port: 3306,
      user: "root",
      password: "password",
      database: "customers_db"
}); 

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  afterConnection();
});


function afterConnection() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log('Products Available for sale in Bamazon');
    console.table(res);
  });
};

var start = function() {
	console.log('\n ');
	inquirer.prompt({
		name: "purchaseOrExit",
		type: "rawlist",
		message: "Would you like to [PURCHASE] an item or [EXIT]",
		choices: ["PURCHASE", "EXIT"]
	}).then(function(answer) {
		if (answer.purchaseOrExit.toUpperCase() === "PURCHASE");
			makePurchase(); 
			   

	  	 console.log("Thank you for shopping with Bamazon come back and shop with us soon");
	  		connection.end();
	  	  			
	});

};

	var makePurchase = function() {
			console.log('\n');
			inquirer.prompt([{
				name: "id",
				type: "input",
				message: "Enter the item_id of the product you would like to select"},
				{
				name: "quantity",
				type: "input",
				message: "Enter the stock_quantity  you would like to purchase"
				}]).then(function(answer) {
				// Query the bamazon database for info about the item in stock
				connection.query('SELECT item_id, product_name, department_name, price, stock_quantity');
				console.log('\n You would like to buy ' + answer.quantity);

				if (res[0].stock_quantity >+ answer.quantity) {


					var itemQuantity = res[0].stock_quantity - answer;
					connection.query("Update products SET ? WHERE ?");
					stock_quantity: itemQuantity
				}, {
					item_id: answer.id
				}], function(err, res) {};
				var cost = res[0].price * answer.quantity;
				console.log("\n order complete ");
					displayProducts();
					start();

				} else {

					console.log("\n Sorry, Insufficient stock_quantity");

					start();
				}
			});

			}
				



	

