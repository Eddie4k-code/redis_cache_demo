const express = require("express");
const cors = require("cors");
const { Redis } = require("ioredis");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

const redis = new Redis({
  host: "127.0.0.1",
  port: 6379,
});

// Map a key to a value in Redis
app.post('/set', async (req, res) => {
    const { key, value } = req.body;
    await redis.set(key, value);
    return res.sendStatus(200);

});

// Get a value from a key using Redis
app.post('/get', async (req, res) => {

    const { key } = req.body;
    const value = await redis.get(key);
    return res.json(value);

});


//Route to get product from dummy api
app.get("/product/:id", async (req, res) => {

    const {id} = req.params;

    const cachedProduct = await redis.get(id);

    if (cachedProduct) {
        return res.json(JSON.parse(cachedProduct));
    }



    const response = await axios.get(`https://dummyjson.com/products/${id}`);
    //Set data into cache

    await redis.set(id, JSON.stringify(response.data), "EX", 5);




    return res.json(response.data);



});



app.listen(4000, () => {
  console.log("Listening on port 4000");
});