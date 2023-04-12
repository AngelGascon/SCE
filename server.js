var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();


var PRODUCTS_FILE = path.join(__dirname, 'src/assets/js/components/product-data.json');

app.set('port', (process.env.PORT || 3000));
app.use('/', express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();//edwsaf
});

app.get('/api/products', function(req, res) {
    fs.readFile(PRODUCTS_FILE, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        res.json(JSON.parse(data));
    });
});


app.get('/api/product/:id', function(req, res) {

    fs.readFile(PRODUCTS_FILE, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }

        var json = JSON.parse(data);

        for(var i = 0; i <= json.length; i++)
        {
            if(json[i]['id'] == req.params.id)
            {
                res.json(json[i]);
                break;
            }
        }
    });
});

const paypal = require('paypal-rest-sdk'); //npm install paypal-rest-sdk

paypal.configure({
    'mode': 'sandbox',
    'client_id': 'AUcp7NI6Je5_u5RSRMYduQI41v4qyiahyWjSU3y-Eg5vnrlwljiIDHnOFrbT8UEpWE4FS4_E4ktyCOOT',
    'client_secret': 'EMvMotybEmL7NmnnHbHoPVZ_sfxw8xny-ldAcU1KMq-cVnbWo_IBNodRZYc3NzmCpSvMGpDHGlUmJt9R'
});


app.get('/api/makePurchase', function (req, res) {
    const price = req.query.price;

    const paymentData = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "transactions": [{
            "amount": {
                "total": price,
                "currency": "USD"
            },
            "description": "Compra en línea"
        }],
        "redirect_urls": {
            "return_url": "http://localhost:3000/purchase",
            "cancel_url": "http://localhost:3000/cancel"
        }
    };
    
    paypal.payment.create(paymentData, (error, payment) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error al crear el pagament');
        } else {
            const redirectUrl = payment.links.find((link) => link.rel === 'approval_url').href;
            console.log(payment);
            res.send({ redirectUrl });
        }
    });
});

app.get('/purchase', function (req, res) {
    const paymentId = req.query.paymentId;
  
    paypal.payment.get(paymentId, function (error, payment) {
      if (error) {
        console.log(error);
      } else {
        // Obtener información adicional del pago
        const payer = payment.payer.payer_info;
        const amount = payment.transactions[0].amount;
  
        // Crear un objeto con la información del pago
        const paymentInfo = {
          email: payer.email,
          firstName: payer.first_name,
          lastName: payer.last_name,
          amount: amount.total,
          currency: amount.currency
        };
  
        console.log(paymentInfo);
        
        res.redirect(`http://localhost:8080//payment/1?paymentData=${JSON.stringify(paymentData)}`);

      }
    });
  });
  
 
app.get('/cancel', function (req, res) {
    res.redirect(`http://localhost:8080`);
});


app.listen(app.get('port'), function() {
    console.log('Server started: http://localhost:' + app.get('port') + '/');
});