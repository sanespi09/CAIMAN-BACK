const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();

const posts = JSON.parse(fs.readFileSync('assets/posts.json', 'utf8'));

////MULTER CONFIG////
// const imgStorage = multer.diskStorage({
//     destination: 'public/assets/posts/',
//     filename: function(req, file, cb){
//         cb(null, file.fieldname + posts.length + path.extname(file.originalname));
//     }
// })

const upload = multer();

////HELPER FUNCTIONS////
function writePosts(){
    fs.writeFile('./assets/posts.json', JSON.stringify(posts), err => {
        if(err) throw err;
        console.log('the file has been saved!');
    })
}

// function deleteImage

////HANDLE REQUESTS////

////GET////
router.get('/:name', (req, res) => {
    let postData = posts.find( e => e.postname === req.params.name );

    res.render("post", { title: postData.title, description: postData.content, image: postData.img});
})

router.get('/', (req, res) => {
    if(posts) res.send(posts);
    else res.status(404).send('the server found no posts file')
});

////POST////
router.post('/create', upload.none(), (req, res) => {

    if(req.body){

    let postData = {
        "id": posts.length,
        "title": req.body.title,
        "content": req.body.content,
        "imgUrl": req.body.img_url,
        "created": new Date().toLocaleDateString('en-US')
    }

    console.log(postData);

    posts.unshift(postData);

    writePosts();

    res.sendStatus(200);
    } else res.sendStatus(400);

});

//// DELETE ////
router.delete('/:id', (req, res) => {
    let post = posts.findIndex( e => e.id === Number(req.params.id));

    if(post != -1){
    posts.splice(post, 1);
    res.sendStatus(200);
    deleteImage(posts[post].imgUrl);
    writePosts();
    } else {
        res.status(400).send('The specified Post was not found');
    }        
})

module.exports = router;