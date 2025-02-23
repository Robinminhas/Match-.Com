import express from "express"
import 'dotenv/config'
import mongoose from "mongoose"
import userRoutes from "./Routes/userRoutes.js"
import passport from "passport"
import cookieParser from "cookie-parser"
import session from "express-session"


const app = express()
const port = process.env.PORT || 8000
main().then(() => { console.log("Connection successfull") }).catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/MatchApp');
}

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: true,
  saveUninitialized: true,
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/user', userRoutes)
app.get('/', (req, res) => {
  res.send('Hello from the server!')
})
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
