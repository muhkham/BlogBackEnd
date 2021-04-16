const db = require('../database/init.sql');

function getAllPosts() {
  return db.select('posts');
}

function getPost(id) {
  const filter = (post) => post.id === parseInt(id);
  return db.select('posts', filter).then((rows) => {
    if (!rows.length) throw new Error(`No post with id '${id}' found`);
    return rows[0];
  });
}

function createPost(post) {
  const id = Date.now();
  return db.insert('posts', { id, ...post });
}

function updatePost(id, newPost) {
  const filter = (post) => post.id === parseInt(id);
  return db.update('posts', newPost, filter);
}

function deletePost(id) {
  const filter = (post) => post.id !== parseInt(id);
  return db.del('posts', filter);
}

module.exports = {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
};
