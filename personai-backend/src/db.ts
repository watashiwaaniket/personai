import mongoose, { Schema } from "mongoose";

const ObjectId = mongoose.Types.ObjectId;
const contentTypes = ['image', 'video', 'article', 'audio', 'twitter', 'youtube', 'note']; 

const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique : true},
    password: {type: String, required: true},
})

const tagSchema = new Schema({
    title: {type: String, required: true, unique: true}
})

const contentSchema = new Schema({
    link: { type: String, required: true },
    type: { type: String, enum: contentTypes, required: true },
    title: { type: String, required: true },
    tags: [{ type: ObjectId, ref: 'tag' }],
    userId: { type: ObjectId, ref: 'user', required: true },
    dateAdded: { type: String },
    context: { type: String, required: true}
})

const linkSchema = new Schema({
    hash: { type: String, required: true },
    userId: { type: ObjectId, ref: 'user', required: true, unique: true },
})

const userModel = mongoose.model('user', userSchema);
const tagModel= mongoose.model('tag', tagSchema);
const contentModel = mongoose.model('content', contentSchema);
const linkModel = mongoose.model('link', linkSchema);

export {
    userModel,
    tagModel,
    contentModel,
    linkModel
}