const Note = require('../models/note')
// const Comment = require('../models/comment');
const router = require('express').Router();


// Create
  router.post('/', async(req, res) => {
    try{
      const createdNote = await Note.create(req.body)
      res.status(200).json(createdNote)
    }catch(error){
      console.error(error)
      res.status(400).json({ message: error.message })
    }
  })


// Read
  /* Index */
    router.get('/', async (req, res) => {
      try{
        const foundNotes = await Note.find({})
        res.status(200).json(foundNotes)
      }catch(error){
        console.error(error);
        res.status(400).json({ message: error.message });
      }
    })
  /* Show */
  router.get('/:id', async (req, res) => {
    try{
      const foundNote = await Note.findById(req.params.id)
      res.status(200).json(foundNote)
    }catch(error){
      console.error(error);
      res.status(400).json({ message: error.message });
    }
  })

  /* Update */
  router.put('/:id', async (req, res) => {
    try {
      const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true })
      res.status(200).json(updatedNote)
    }catch(error){
      console.error(error);
      res.status(400).json({ message: error.message })
    }
  })

  /* Add Comment */
  // Create A Comment
  // Take said comment and add it to the comment array of the ....
  // ....Note in question
  // Send back a relevant response


  /*
    const createdComment = await Comment.create(req.body)
    const updatedNote = await Note.findByIdAndUpdate()

  */
  router.put('/:id/addComment', (req, res) => {
    //store the query
    const createCommentQuery = Comment.create(req.body)
    // actually run query
    createCommentQuery.exec((err, createdComment) => {
      if (err){
        console.error(err);
        res.status(400).json({ message: err.message});
      } else {
        const updateNoteQuery = Note.findByIdAndUpdate(req.params.id, { $addToSet: { comments: createdComment._id }}, { new: true })
        // actually run it
        updateNoteQuery.exec((err, updatedNote) => {
              if(err){
                console.error(err);
                res.status(400).json({ message: err.message })
              } else {
                res.status(200).json(createdComment)
              }
        })
      }
    })
  })

// Delete

router.delete('/:id', async (req, res) => {
  try{
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedNote);
  } catch(error){
    console.error(error);
    res.status(400).json({ message: error.message})
  }
})

module.exports = router;
