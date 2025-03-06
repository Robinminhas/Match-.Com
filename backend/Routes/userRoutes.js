import express from "express"
import User from "../Models/users.js"
import passport from "passport"
import localStrategy from "passport-local"
const router = express.Router()

passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

router.post('/new', async (req, res) => {
    try{
        const { profilePicture, fullname, bio , email, gender, password, username, follower, following } = req.body
        const newUser = {
            profilePicture,
            fullname,
            bio,
            email,
            gender,
            username,
            follower,
            following
        }
        const registered = await User.register(newUser, password)
        res.status(200).json('registered successfully')
    }catch(err){
        res.status(500).json({"failed to register" : err.message})
    }
})

router.post('/login', passport.authenticate('local'), (req, res) => {
    try{
        res.status(200).json('logged in successfully')
    }catch(err){
        res.status(500).json({"failed to login" : err.message})
    }
})

router.post('/logout' , (req, res) => {
    req.logout((err) => {
        if(err) {
            res.status(500).json({"failed to logout" : err.message})
            return
        }
        res.status(200).json('logged out successfully')
    })
})

router.put('/profile/edit/:id', async (req, res) => {
    try {
        const id = req.params.id
        const { profilePicture, fullname , username, bio} = req.body
        const updatedUser = await User.findByIdAndUpdate(id, { profilePicture, fullname, username, bio })
        res.status(200).json("profile updated successfully")
    } catch (error) {
        res.status(500).json({"failed to edit" : error.message})
    }
})


export default router
