let posts = [
  {id: '1', topic: 'test1', text: 'test text1'},
  {id: '2', topic: 'test2', text: 'test text2'},
  {id: '3', topic: 'test3', text: 'test text3'},
];

const getPost = (req, res) => {
  res.json({posts, status: 'success'});
};

const getPostById = (req, res) => {
  const {id} = req.params;
  const [post] = posts.filter((el) => el.id === id);

  if (!post) {
    return res
        .status(400)
        .json({status: `failure, no post with id "${id}" found!`});
  }
  res.json({post, status: 'success'});
};

const addPost = (req, res) => {
  const {topic, text} = req.body;

  posts.push({
    id: new Date().getTime().toString(),
    topic,
    text,
  });

  res.json({status: 'success'});
};

const changePost = (req, res) => {
  const {topic, text} = req.body;
  posts.forEach((el) => {
    if (el.id === req.params.id) {
      el.topic = topic;
      el.text = text;
    }
  });
  res.json({status: 'success'});
};

const patchPost = (req, res) => {
  const {topic, text} = req.body;
  posts.forEach((el) => {
    if (el.id === req.params.id) {
      if (topic) {
        el.topic = topic;
      }
      if (text) {
        el.text = text;
      }
    }
  });
  res.json({status: 'success'});
};

const deletePost = (req, res) => {
  posts = posts.filter((el) => el.id !== req.params.id);
  res.json({status: 'success'});
};

module.exports = {
  getPost,
  getPostById,
  changePost,
  patchPost,
  deletePost,
  addPost,
};
