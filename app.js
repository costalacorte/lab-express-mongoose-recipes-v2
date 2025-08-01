const express = require("express");
const logger = require("morgan");

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");

const app = express();
const PORT = 3000;

app.use(logger("dev"));
app.use(express.json());

const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err);
  });



// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});
const Recipe = require("./models/Recipe.model");

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes", (req, res) => {
  const newRecipe = req.body;

  Recipe.create(newRecipe)
    .then((createdRecipe) => {
      res.status(201).json(createdRecipe);
    })
    .catch((err) => {
      res.status(500).json({ error: "Failed to create recipe" });
    });
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", (req, res) => {
  Recipe.find()
    .then((allRecipes) => {
      res.status(200).json(allRecipes);
    })
    .catch((err) => {
      res.status(500).json({ error: "Failed to get recipes" });
    });
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id", (req, res) => {
  const { id } = req.params;

  Recipe.findById(id)
    .then((recipe) => {
      if (recipe) {
        res.status(200).json(recipe);
      } else {
        res.status(404).json({ error: "Recipe not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "Error fetching recipe" });
    });
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id", (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  
  Recipe.create(updatedData)
    .then((updatedRecipe) => {
      res.status(200).json(updatedRecipe);
    })
    .catch((err) => {
      res.status(500).json({ error: "Failed to update recipe" });
    });
});

app.listen(PORT, () => {
  console.log(`My first app listening on port ${PORT}!`);
});


//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route

app.delete("/recipes/:id", (req, res) => {
  const { id } = req.params;

  Recipe.findByIdAndDelete(id)
    .then((deletedRecipe) => {
      if (!deletedRecipe) {
        return res.status(404).json({ error: "Recipe not found" });
      }
      res.status(200).json({ message: "Recipe deleted successfully" });
    })
    .catch((err) => {
      res.status(500).json({ error: "Failed to delete recipe" });
    });
});

// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
