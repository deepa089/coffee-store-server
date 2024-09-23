const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 9001
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


// middle ware
app.use(cors());
app.use(express.json());

// console.log(process.env.DB_USER_NAME);

const uri = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@cluster0.zfkam.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const myDB = client.db("CoffeeHouse");
    const coffeeCollection = myDB.collection("Coffee_info");
    app.get('/coffees', async (req, res) => {
      console.log("Coffees Loading....")
      const cursor = coffeeCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });
    app.get('/updateCoffee/:id', async (req,res) =>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await coffeeCollection.findOne(query);
      res.send(result);
    })

    app.put('/updateCoffee/:id', async (req, res) => {
      const updateCoffee = req.body;
      const id = req.params.id
      console.log(updateCoffee);
      const query = { _id: new ObjectId(id) };
      const options = { upsert: true };
      // update the value of the 'quantity' field to 5
      const updateDocument = {
        $set: {
          nameCoffee : updateCoffee.nameCoffee,
          available : updateCoffee.available,
          supplier : updateCoffee.supplier,
          taste : updateCoffee.taste,
          categoryType : updateCoffee.categoryType,
          details : updateCoffee.details,
          photoUrl : updateCoffee.photoUrl,
        },
      }; 
      const result = await coffeeCollection.updateOne(query,updateDocument,options);
      res.send(result);
    })

    app.post('/coffee', async (req, res) => {
      const newCoffee = req.body;
      const result = await coffeeCollection.insertOne(newCoffee);
      res.send(result);
    })

    app.delete('/delete/:id',async (req,res)=>{
      const id = req.params.id ;
      const query = {_id : new ObjectId(id)}
      const result = await coffeeCollection.deleteOne(query);
      console.log(result)
      res.send(result);
    })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");


  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
app.get('/', (req, res) => {
  res.send('Coffee making server is running')
})

app.listen(port, () => {
  console.log("app listening running successfully")
})
