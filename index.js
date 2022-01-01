const express = require('express')
const { MongoClient } = require('mongodb');
const cors= require('cors')
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();
const port = process.env.PORT || 5000

const app = express()
app.use(express.json())
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zrqkd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run(){
    try{
        await client.connect();
        const database= client.db("Hero-Rider-DB");
        const usersCollection = database.collection('users');
        console.log("Connected successfully to server");  
    //  Services Request GET API Method
    // app.get('/users', async(req,res)=>{
    //     const cursor = usersCollection.find({});
    //     const service = await cursor.toArray();
    //     res.json(service);
    // })
        // Single Product GET API Method
    // app.get('/service/:id', async(req,res)=>{
    //     const id= req.params.id;
    //     const query = {_id:ObjectId(id)}
    //     const singleService = await servicesCollection.findOne(query);
    //     res.json(singleService);
    // })
    app.post('/rider', async(req,res)=>{
      const rider = req.body;
      console.log(rider);
      const dataInsert= await usersCollection.insertOne(rider);
      res.json(dataInsert);
    })

    }
    finally{
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Welcome to Hero Rider Server Port: ${port}`)
})