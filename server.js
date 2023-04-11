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

app.post('/api/product/create', function(req, res) {

    fs.readFile(PRODUCTS_FILE, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        var products = JSON.parse(data);

        var newProduct = {
            id: Date.now(),
            name: req.body.name,
            price: req.body.price,
        };
        products.push(newProduct);
        fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 4), function(err) {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            res.json(products);
        });
    });
});

//SearchSuggestion
app.get('/api/searchSuggestion', function (req, res) {
    
    fs.readFile(PRODUCTS_FILE, function (err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        var cryptoFile = JSON.parse(data);
        const searchData = req.query.searchData;

        if (searchData == "")
            res.json(cryptoFile.filter(x => x.name));
        else {
            res.json(cryptoFile.filter(x => x.name.toLowerCase().startsWith(searchData)).map(x => x.name));
        }
    });
});





app.listen(app.get('port'), function() {
    console.log('Server started: http://localhost:' + app.get('port') + '/');
});