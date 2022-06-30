const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    authors: {
        type: String,
        required: true
    },
    abstract: {
        type: String,
        required: true
    },
    keywords: {
        type: String,
        required: true
    },
    doi: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Article', articleSchema);