export const createBlog = async (req, res) => {
  const { title, content, shortDescription, tags } = req.body;

  if (req.file) {
    console.log(req.file);
  }

  res.send("Hello");
};
