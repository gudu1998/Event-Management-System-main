import "reflect-metadata";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from 'mongoose'
import adminRoutes from './routes/admin'
import profileRoutes from './routes/profile'

const app = express();
app.use(bodyParser.json({ limit: "5 Mb" }))

app.use('/', adminRoutes)
app.use('/', profileRoutes)


mongoose.connect('mongodb+srv://gudu1998:ab828066@cluster0.u9ogn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))

app.listen(4000, () => {
  console.log("Server is listening on port 5000")
})