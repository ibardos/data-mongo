/**
 * Count orders with a quantity greater than 10
 */
db.orders.find({ "quantity": { "$gt": 10 } }).count();

/**
 * What are the top 3 most selling products (based on sold quantity)?
 */
db.orders.aggregate([
  {
    "$group": {
      "_id": "$product",
      "quantities": { "$sum": "$quantity" }
    }
  },
  { "$sort": { "quantities": -1 } },
  { "$limit": 3 }
]);

/**
 * Which city sold the most products?
 */
db.orders.aggregate([
  {
    "$group": {
      "_id": "$address.city",
      "quantities": { "$sum": "$quantity" }
    }
  },
  { "$sort": { "quantities": -1 } },
  { "$limit": 1 }
]);

/**
 * What was the best month for sales (based on product prices)?
 */
db.orders.aggregate([
  {
    "$group": {
      "_id": { "$month": "$orderDate" },
      "intake": {
        "$sum": {
          "$multiply": [ "$quantity", "$priceEach" ]
        }
      }
    }
  },
  { "$sort": { "intake": -1 } },
  { "$limit": 1 }
]);
