const { request } = require('express');
const express = require ('express');
const app = express();
const PORT= process.env.PORT || 4000;

//SET UP MONGOOSE
const mongoose = require ('mongoose');
const connectionString = 'mongodb+srv://TheHood:Ledzep00@interndetails.mduts.mongodb.net/test?retryWrites=true&w=majority';

app.use(express.json());

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then ( () => {
    console.log('MongoDB connected...')
})

.catch(err => console.log(err))

//Create database schema
const internDetailsSchema = new mongoose.Schema({
    name: String,
    email: String,
    country: String
})

const Intern = mongoose.model('Intern', internDetailsSchema)

//POST request
app.post('/intern', function( req, res) {
    Intern.create({
        name: req.body.name,
        email: req.body.email,
        country: req.body.country
    }, (err, newIntern) => {
        if (err) {
            return res.status(500).json ({message: err})
        } else {
            return res.status(200).json({ message: 'new intern added', newIntern})
        }
    })
})

//GET request
app.get('/intern', (req, res) => {
    //fetch all interns
    Intern.find({}, (err, newIntern)=>{
        if (err) {
            return res.status (500).json({message: err})
        } else {
            return res.status (200).json({message: newIntern})
        }
    })
    
})
//PUT request
app.put('/intern/:id', (req, res) => {
    Intern.findByIdAndUpdate(req.params.id, {
        country: req.body.country
    }, (err, newIntern) => {
        if (err) {
            return res.status(500).json({message: err})
        } else if (!newIntern) {
            return res.status(404).json({message: 'intern not found'})
        } else {
            newIntern.save((err, savedIntern) => {
                if (err) {
                    return res.status(400).json({message: err})
                } else {
                    res.status(200).json({message:'intern updated successfully'})
                }
            })
        }
    })
})

//DELETE request
app.delete('/intern/:id', (req, res) => {
    Intern.findByIdAndDelete(req.params.id, (err, newIntern) => {
        if (err) {
            return res.status(500).json({message : err})
        } else if (!newIntern){
            return res.status(404).json({message: 'intern not found...'})
        } else {
            return res.status(200).json({message:'intern deleted successfully...'})
        }
    })
})


app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`)
});

