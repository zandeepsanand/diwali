const express = require("express");
const session = require('express-session');
const diwaliData = require('./src/model/Diwalidata');
const nodemailer = require('nodemailer');



const app = express();

const port = process.env.PORT || 8080;







app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));





app.set('view engine', 'ejs');
app.set('views', './src/views');
app.get('/', (req, res) => {
    res.render("index")
});
app.get('/home', (req, res) => {
    let name = req.query.name;
    res.render("home", {
        title: 'Happy Diwali',
        name: name
    });
});

app.get('/home/:id', function (req, res) {


    let id = req.params.id;
    console.log(id);
    diwaliData.findOne({ _id: id }, function (err, data) {
        console.log(err);

        console.log(data);

        res.render("home", { name: data.wname })


    })

});


app.post('/mail', function (req, res) {
    console.log(req.body);
    var item = {
        name: req.body.name,
        wname: req.body.wname,
        email: req.body.email,

    }
    var diwali = diwaliData(item);
    diwali.save().then((response) => {
        console.log(response);

        let mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'creationzv@gmail.com',
                pass: 'Vishnu@123'
            }
        });
    
        console.log("started mail");
        
    
        let mailDetails = {
            from: 'creationzv@gmail.com',
            to: response.email,
            subject: 'Diwali Wishes from ' + response.name,
            text: 'your friend is wishing u a happy diwali https://deepavaliwish.herokuapp.com/home/'+response._id
        };
        console.log(mailDetails);
        mailTransporter.sendMail(mailDetails, function (err, data) {
    
            if (err) {
                console.log(err);
                res.json({ success: false });
                console.log('Error Occurs! Bad Request');
            } else {
                res.json({ success: true, name: response.wname });
    
                console.log('Email sent successfully');
            }
        });
    }) // saving to database

  
});




app.listen(port, () => { console.log("server ready at " + port) });


