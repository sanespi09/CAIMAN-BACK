const express = require('express');
const cors = require('cors');
const posts = require('./routes/posts');
const discos = require('./routes/discos');
const helmet = require('helmet');
const morgan = require('morgan');
// const ejs = require('ejs');

// init express server
const app = express();

app.use(express.static(__dirname + '/public'));

app.use(morgan( 'tiny' ));
app.use(helmet());
app.use(express.json());
app.use(cors());


////ROUTER////
app.use('/api/posts', posts);
app.use('/api/discos', discos);

////TEMPLATE ENGINE////
app.set('views', './templates');
app.set('view engine', 'ejs');

// ENV VARS & LISTEN
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`listening on port ${PORT}...`));
