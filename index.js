const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const multer = require('multer');
const userRoute = require('./routes/user');
const productRoute = require('./routes/product');
const productColorRoute = require('./routes/productColor')
const path = require('path');
const cors = require('cors');
//use dotenv:
dotenv.config();
const App = express();
App.use(express.json());
App.use(cors());
App.use("/api/images", express.static(path.join(__dirname, "/images")))
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(console.log('Connected to Mongodb')).catch(err => {
    console.log(err);
})
//upload file
// const storage = multer.diskStorage({
//     destination: (req,file,callback) => {
//         callback(null, "images");
//     },filename: (req,file,callback) => {
//         // console.log(req.body)
//         callback(null, req.body.name);
//     }
// })
// const upload = multer({storage: storage})
// App.post("/api/upload", upload.single("file"), (req,res) => {
//     res.status(200).json("File uploaded");
// })

App.use('/api/user', userRoute);
App.use('/api/product', productRoute);
App.use('/api/productcolor', productColorRoute);

const PORT = process.env.PORT || 5000;

App.listen(PORT, () => {
    console.log(`App running on localhost: ${PORT}`);
})