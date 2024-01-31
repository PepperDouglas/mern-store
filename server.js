
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://User:Userpassword@cluster0.2gk9qql.mongodb.net/MockStore?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'MockStore'
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});


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

const Order = mongoose.model('Order', {
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  user: String,
});

app.get('/', (req, res) => {
  res.send('Hello, this is the root endpoint!');
});

app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    
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
    const { searchTerm } = req.query;

    if(!searchTerm){
      return res.status(400).json({error: 'Search term needed'});
    }

    const insenSearchTerm = new RegExp(searchTerm, 'i');

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

app.patch('/updatecart', async (req, res) => {
  try {
    const { customer } = req.query;
    const { newOrder } = req.body;

    console.log("in server " + customer);

    const updatedCustomer = await Customer.findByIdAndUpdate(
      customer,
      { $push: { orders: newOrder } },
      { new: true }

    );
    
    if (!updatedCustomer) {
      return res.status(404).send('Customer not found');
    }

    res.json(updatedCustomer);
  } catch (error) {
    console.error('Error adding order to customer:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.patch('/updatestock', async (req, res) => {
  console.log("server enter stock");

  try {
    const { newstock } = req.body;
    for (const {id, amount} of newstock) {
      await Product.findOneAndUpdate(
        { id: id }, 
        { $inc: { stock: -amount } }
      );
    }

    res.json({ message: 'Stock updated' });
  } catch (error){

    console.error('Error updating product stocks', error);
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

    const newCustomer = new Customer({email, password, orders})
    await newCustomer.save();

    res.json(newCustomer);

  } catch (error){
    console.log('Error: ' + error);
  }

})

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
