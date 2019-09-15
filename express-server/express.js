const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

// variables
const loginUsers = require('./data/login-users');
const jwtToken = require('./data/jwt');
const movies = require('./data/movies');
const moviesByLikes = require('./data/movies-by-likes');
const newMovie = require('./data/new-movie');

/* create new express app */
const app = express();

/* prevent cross-origin error */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(cors());

/* parse the body of the request */
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);

/* user login */
app.post('/authenticate', (req, res) => {
    const body = req.body;
    const user = loginUsers.data.loginUsers.find((user) => user.email === body.email);

    const error = {
        message: 'Invalid username and password combination',
    };

    if (!user || body.password !== user.password) {
        return res.status(400).json(error);
    }

    // generate jwt
    jwtToken.data.jwt.accessToken = jwt.sign(
        {
            name: user.username,
            identity: {
                scope: 'admin_user',
            },
        },
        'secret',
        {
            expiresIn: '365d',
        },
    );

    // verify jwt
    jwt.verify(jwtToken.data.jwt.accessToken, 'secret', (error, decoded) => {
        console.error('error ', error);
        console.log('decoded ', decoded);
    });

    return res.json(jwtToken);
});

/* movies */
app.get('/movies', (req, res) => {
    if (req.query === '') {
        res.status(400).json({
            message: 'The req.query is empty',
        });
    }

    if (req.query.sort === 'publicationDate,desc') {
        res.json(moviesByDate);
    } else if (req.query.sort === 'likesCount,desc') {
        res.json(moviesByLikes);
    } else if (req.query.sort === 'hatesCount,desc') {
        res.json(moviesByHates);
    } else {
        res.json(movies);
    }
});

app.get('/movies/:id', (req, res) => {
    if (req.query === '') {
        res.status(400).json({
            message: 'The req.query is empty',
        });
    }

    const moviesById = movies.data.filter((movie) => {
        return movie.publisherId === req.params.id;
    });
    res.json(moviesById);
});

app.post('/movies', (req, res) => {
    const movie = newMovie.data;

    // movies.data.push(movie);
    return res.json(movie);
});

app.post('/movies/:id', (req, res) => {
    const votedMovie = movies.data.find((movie) => movie.id === req.params.id);

    return res.json(votedMovie);
});

/** for serving static files */
app.use(express.static(__dirname));

/* express server runs at port :3002 */
app.listen(3002, () => {
    console.info('Express mock server listening on port 3002!');
});

module.exports = app;
