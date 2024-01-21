// server.js
//const express = require('express');
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
//const mongoose = require('mongoose');
//const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://User:Userpassword@cluster0.2gk9qql.mongodb.net/MockStore?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'MockStore'
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Product model
const ProductSchema = new mongoose.Schema({
  id: Number,
  title: String,
  description: String,
  price: Number,
  stock: Number,
  image: String,
  category: String
});

const Product = mongoose.model('Product', ProductSchema, 'Products');

const CustomerSchema = new mongoose.Schema({
  id: Number,
  name: String,
  email: String,
  password: String,
  orders: Array,
});

const Customer = mongoose.model('Customer', CustomerSchema, 'Customers');

// Order model
const Order = mongoose.model('Order', {
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  user: String,
});

// Routes
app.get('/', (req, res) => {
  res.send('Hello, this is the root endpoint!');
});

app.get('/products', async (req, res) => {
  try {
    console.log('Request received for /products');
    const products = await Product.find();
    console.log('Products retrieved:', products);
    
    if (products.length === 0) {
      return res.status(404).json({ error: 'No products found' });
    }

    return res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/products', async (req, res) => {
  const { name, price } = req.body;
  const newProduct = new Product({ title, price });
  await newProduct.save();
  res.json(newProduct);
});

app.get('/search', async (req, res) => {
  try {
    //get searchterm
    const { searchTerm } = req.query;

    //return if no term
    if(!searchTerm){
      return res.status(400).json({error: 'Search term needed'});
    }

    //regex to match lowercase as well
    const insenSearchTerm = new RegExp(searchTerm, 'i');

    //Mongoose finding either $OR on a regex
    const products = await Product.find({
      $or: [
        {title: {$regex : insenSearchTerm}},
        {description: {$regex: insenSearchTerm}}
      ]
    });

    res.json(products);


  } catch (error){
    console.error('Error searching products', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

app.get('/login', async (req, res) => {
  try {
    //will have to add if-paths for id's etc
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ error: 'Email parameter is required' });
    }

    const customer = await Customer.findOne({ email });

    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    res.json(customer);

  } catch (error){
    console.log('Error: ', error);
  }
})

app.get('/doescustomerexist', async (req, res) => {
  try {
    const { email } = req.query;
    
    if (!email) {
      return res.status(400).json({ error: 'Email parameter is required' });
    }
    const customer = await Customer.exists({ email });
    console.log(customer);
    if(!customer){
      return res.json(null);
    }

    res.json(customer);

  } catch (error) {
    console.log("Error: ", error);
  }

})

app.post('/registrer', async (req, res) => {
  try {
    const { email } = req.query;
    const { password } = req.query;
    const orders = [];

    if(!email || !password){
      return res.status(400).json({ error: 'Email and Password required' });
    }

    //Make new customer here
    const newCustomer = new Customer({email, password, orders})
    await newCustomer.save();

    res.json(newCustomer);


  } catch (error){
    console.log('Error: ' + error);
  }

})

app.get('/orders', async (req, res) => {
  const orders = await Order.find().populate('products');
  res.json(orders);
});

app.post('/orders', async (req, res) => {
  const { products, user } = req.body;
  const newOrder = new Order({ products, user });
  await newOrder.save();
  res.json(newOrder);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
