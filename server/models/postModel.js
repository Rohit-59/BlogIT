import mongoose from "mongoose";
import { type } from "os";

const postSchema = new mongoose.Schema({
        userId: {
          type: String,
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
        title: {
          type: String,
          required: true,
          unique: true,
        },
         image:{
           type: String,
           default:'https://www.elegantthemes.com/blog/wp-content/uploads/2020/02/blogging-trends-2020.jpg'
        },
         category: {
        type: String,
        default: 'uncategorized',
        },
       slug: {
         type: String,
         required: true,
         unique: true,
      },
    },
    { timestamps: true }
  );

const Post = mongoose.model('Post',postSchema);

export default Post;