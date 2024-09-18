```
/**
 * MongoDB tutorial
 * https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/
 *
_*
 * 
 * --------------------------
 * MongoDB Collection
 * --------------------------
 * 
 * 1. Create account
 * 2. create an user with password
 * 3. white list IP address
 * 4. database > connect > driver > Node > view full code
 * 5. change the password with URI
 * 
 * --------------------------------------------
 * 
 * 1. CREATE -- POST
 * 2. app.post('/user', async (req, res) => {})
 * 3. make the function async to use await inside it
 * 4. make sure you use the express.json() middleware
 * 5. access data from the body : const user = req.body;
 * 6. const result = await use.insertOne(user);
 * 7. res.send(result)
 *  
 * 
 * CLIENT
 * --------
 * 1. create fetch
 * 2. add second parameter as an object 
 * 3. provide method : 'POST'
 * 4. add headers : {'content-type' : 'application/json'}
 * 5. add body : JSON.Stringify(user)
 * 
 * 
 * -----------------
 * READ MANY
 * -----------------
 * 1. ceate a cursor = userCollection.find()
 * 2. const result = await cursor.toArray()
 * 
 * ------------------
 * DELETE
 * -----------------
 * 1. create app.delete('/user/:id', async (req,res) => {})
 * 2. specify unique objectId to delete the data
 * 3. create query = {_id : new ObjectId(id)}
 * 4. const result = await userCollection.deleteOne(query)
 * 
 * CLIENT
 * ------------
 * 1. create dynamic url with id
 * 2. mention the DELETE method and reload it  
 * 
 */
```