// const express = require('express');
// const router = express.Router();
// const handlers = require("./handlers");

// router.get('/', handlers.home)
// router.get('/new-user', handlers.newUser)
// router.post('/create-user', handlers.createUser)
// router.get('/all-posts', handlers.allPosts)
// router.use((req, res) => {
//   res.status(404).send(`<h1>Not found</h1>`)
// })

// module.exports = router;

const express = require('express');
const dogs = require('./handlers/posts');
const users = require('./handlers/users');
// const logger = require("./middleware/logger");
// const verifyUser = require("./middleware/auth");
const handleError = require('./middleware/error');

server.use(express.json());
server.use(logger);

const router = express.Router();

router.get('/posts', posts.getAll);
router.get('/posts/:id', posts.get);
router.post('/posts/', verifyUser, posts.post);
router.put('/posts/:id', verifyUser, posts.put);
router.delete('/posts/:id', verifyUser, posts.del);

router.post('/users', users.post);
router.post('/login', users.login);

router.use(handleError);

export default router;
