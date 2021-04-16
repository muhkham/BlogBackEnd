const model = require('../model/posts');

function getAll(req, res, next) {
  model
    .getAllPosts()
    .then((posts) => {
      res.send(posts);
    })
    .catch(next);
}

function get(req, res, next) {
  const id = req.params.id;
  model
    .getPost(id)
    .then((post) => {
      res.send(post);
    })
    .catch(next);
}

function post(req, res, next) {
  const newPost = req.body;
  const userId = req.user.id;
  newPost.owner = userId;
  model
    .createPost(newPost)
    .then((post) => {
      res.status(201).send(post);
    })
    .catch(next);
}

function put(req, res, next) {
  const postId = req.params.id;
  const userId = req.user.id;
  const newPost = req.body;
  model
    .getPost(postId)
    .then((post) => {
      if (post.owner !== userId) {
        const error = new Error('Unauthorized');
        error.status = 401;
        next(error);
      } else {
        model.updatePost(postId, newPost).then((post) => {
          res.status(200).send(post);
        });
      }
    })
    .catch(next);
}

function del(req, res, next) {
  const postId = req.params.id;
  const userId = req.user.id;
  model
    .getPost(postId)
    .then((post) => {
      if (post.owner !== userId) {
        const error = new Error('Unauthorized');
        error.status = 401;
        next(error);
      } else {
        model.deletePost(postId).then(() => {
          res.status(204).send();
        });
      }
    })
    .catch(next);
}

module.exports = { getAll, get, post, put, del };
