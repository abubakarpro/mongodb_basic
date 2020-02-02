const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("connect to db"))
  .catch(err => console.error("could not connect to mongodb...", err));

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  img: { type: String, required: true },
  desc: { type: String, required: true }
});

const Posts = mongoose.model("Posts", postSchema);

async function createPosts() {
  const post = new Posts({
    title: "about database",
    img: "sdfsdfsdfsd",
    desc: "sssssssssssssssssssssssdkdjhfksjdhfjsdfjs"
  });

  try {
    const result = await post.save();
    console.log(result);
  } catch (ex) {
    console.log(ex.message);
  }
}
//createPosts();

async function getpost() {
  //comprision query operations
  //eq (equal)
  //ne (not equal)
  //gt (greater than)
  //gte (greater than or equal to)
  //lt (less than)
  //lte (less than or equal to)
  // in
  //nin (not in)

  ////////////////// Examples //////////////////////
  //.find({ price: { $gte: 10, $lte: 20 } }); find price which greater then 10 and less then 20
  //.find({ price: { $in: [10, 20, 30] } });  find price which is either 10,20 or 30

  //Logical query operations
  //or
  //and

  ///////////////Examples /////////////////////////

  //.find().or([{title : "first post "},{ title:"1st post"}]);
  //.find().and([{title: "first post"},{ desc:"sdfsfsdff"}]);

  const result = await Posts;
  //.find({ title: "my second post" });

  console.log("this is result :", result);
}

async function reqularQuery() {
  //find all posts which have word post in its title
  const posts = await Posts.find({ title: /.*post.*/i })

    //start with new word
    .find({ title: /^post/ })

    //ends with post word
    .find({ title: /post$/i });

  console.log(posts);
}

async function paginationQuerySkip() {
  //assume
  const pageNumber = 2;
  const pageSize = 10;

  const posts = Posts.find({ title: "posts" })
    .skip((pageNumber - 1) * pageSize)
    .sort({ name: 1 });

  console.log(posts);
}

async function getPostById(id) {
  console.log("getPostById", id);
  const result = await Posts.findById(mongoose.Types.ObjectId(id));

  //if (!result) return;

  console.log("result:", result);
}

getPostById("5debf97d8d8bc1018ee2232");

async function directUpdatePost(id) {
  const updatedPost = await Posts.findByIdAndUpdate(id, {
    title: "recently updated post"
  });

  console.log(updatedPost);
}

// directUpdatePost("5debf70edfd63d19943cba1c");

async function remove(id) {
  const post = await Posts.findByIdAndRemove(id);
  console.log(post);
}

// remove("5defa5026f4d881af42ed641");
