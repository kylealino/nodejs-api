const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/productModel')
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
//main page /
app.get('/',(req,res)=>{
    res.send('Hello Main Page')
})

//redirect to another page
app.get('/test',(req,res)=>{
    res.send('Hello test page')
})

//add product
app.post('/product',async(req,res)=>{
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message})
    }
})

//get all saved data
app.get('/product', async(req,res)=>{
    try {
        const product = await Product.find({});
        res.status(200).json(product)

    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message})
    }
})

//get by id
app.get('/product/:id',async(req,res)=>{
    try {
        const {id}= req.params;
        const product = await Product.findById(id);
        res.status(200).json(product)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message})
    }
})

//update based on id and selected request
app.put('/product/:id',async(req,res)=>{
    try {
        const {id}= req.params;
        const product = await Product.findByIdAndUpdate(id,req.body);
        if (!product) {
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message})
    }
})

//delete

app.delete('/product/:id', async(req,res)=>{
    try {
        const {id}= req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({message:`cannot find any product with id ${id}`})
        }
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message})
    }
})

mongoose.connect('mongodb+srv://kylealino:m3User2_2023@devkyleapi.bqcnsfe.mongodb.net/?retryWrites=true&w=majority')
.then(()=>{
    console.log('connected to mongodb')
    app.listen(3000, ()=>{
        console.log(`Node api is running on port 3000`)
    })
}).catch((error)=>{
    console.log(error)
})