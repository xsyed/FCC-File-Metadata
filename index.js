const express = require('express')
require('dotenv').config()
const app = express()
const multer = require('multer')

const upload = multer() 

app.use(express.static('public'))
app.get('/', async (req,res) => {
    res.sendFile(__dirname + '/views/index.html');
})

app.post('/api/fileanalyse', upload.single('upfile'), async (req,res) => {
    try{
        if(req.file !== undefined){
            let sobj = {}
            sobj.name = req.file.originalname;
            sobj.type = req.file.mimetype;
            sobj.size = req.file.size;
            res.send(sobj)
        }
    } catch(e){
        res.status(500).send(e)
    }
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server running on ${PORT} port`)
})
