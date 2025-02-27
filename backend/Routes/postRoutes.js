import express from "express"
import Post from "../Models/post.js"

const router = express.Router()

router.get('/all', async (req, res) => {
    try {
        const posts = await Post.find()
        res.status(200).json(posts)
    } catch (error) {
        res.status(401).json({ error: error.message })
    }
})
router.post('/new', async (req, res) => {
    try {
        const { postUrl, caption, user, likes, comments, createdAt } = req.body
        const newPost = new Post({
            postUrl,
            caption,
            user,
            likes,
            comments,
            createdAt
        })
        await newPost.save()
        res.status(201).json("Post created successfully!")
    } catch (error) {
        res.status(401).json({ error: error.message })
    }
})

router.delete('/:id/delete', async (req, res) => {
    try {
        const id = req.params.id
        const deletedPost = await Post.findByIdAndDelete(id)
        res.status(200).json(deletedPost)
    } catch (error) {
        res.status(401).json({ error: error.message })
    }
})

export default router