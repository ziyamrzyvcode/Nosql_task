const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product.model'); // Adjust the path as necessary
const app = express();
app.use(express.json());
app.use(express.static('public'));




app.get('/', (req, res) => {
    res.send('Hello World! hello');
});

app.get('/api/products', async (req, res) => {
    try{
        const products = await Product.find();
        res.status(200).json(products);
    } catch(err){
        console.error(err);
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/products', async (req, res) => {
    try{
        const product = await Product.create(req.body);
        res.status(200).json({ product });
    } catch(err){
        console.error(err);
        res.status(500).json({ message: error.message });
    }
});

app.get('/api/products/:id', async (req, res) => {
    try {
        const { id: productId } = req.params;
        const product = await Product.findOne({ _id: productId });
        if (!product) {
            return res.status(404).json({ message: `No product with id ${productId}` });
        }
        res.status(200).json({ product });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: error.message });
    }
});

app.put('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body, { new: true });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ product });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

// delete a person
app.delete('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ product });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

mongoose.connect('mongodb+srv://ziyamrzyv:Ziya582312@cluster0.pkyyv7a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
    console.log('Connected to MongoDB');
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
})
.catch(err => {
    console.error('Error connecting to MongoDB', err);
});