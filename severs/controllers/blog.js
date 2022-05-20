const BlogModal = require("../models/blog");

const getBlogs = async (req, res, next) => {
  BlogModal.find({})
    .then((item) => {
      res.status(200).json(item);
    })
    .catch((err) => console.log(err));
};

const getBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await BlogModal.find(id);
    res.status(200).json(blog);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};
const createBlog = async (req, res) => {
  const blog = req.body;
  const newBlog = new BlogModal({
    ...blog,
    createdAt: new Date().toISOString(),
  });

  try {
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};
// const postBlog = async (req, res) => {
//   const blog = req.body;
//   console.log(blog);
//   const newBlog = new BlogModal({
//     ...blog,
//     createdAt: new Date().toISOString(),
//   });
//   if (newBlog) {
//     newBlog.save();
//     res.status(201).json(newBlog);
//   } else {
//     res.status(404).json(error); //
//   }
//   return newBlog;
// };

const editBlog = function (req, res, next) {
  Items.updateOne({ _id: req.params.id }, req.body)
    .then((item) => res.status(200).json(item))
    .catch(next);
};

const deleteBlog = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No tour exist with id: ${id}` });
    }
    await BlogModal.findByIdAndRemove(id);
    res.json({ message: "Tour deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

const getBlogBySlug = function (req, res, next) {
  Items.findOne({ slug: req.params.slug })
    .then((item) => res.status(200).json(item))
    .catch(next);
};

module.exports = {
  getBlogs,
  getBlog,
  createBlog,
  editBlog,
  deleteBlog,
  getBlogBySlug,
};
