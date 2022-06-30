const Article = require('../model/Article');

const getAllArticles = async (req, res) => {
    const a = await Article.find();
    if (!a) return res.status(204).json({ "message": "No document on requested data yet." });
    res.json(a);
}

const createNewArticle = async (req, res) => {
    if (
        !req?.body?.title ||
        !req?.body?.authors ||
        !req?.body?.abstract ||
        !req?.body?.keywords ||
        !req?.body?.doi
    ) {
        return res.status(400).json({ "error": "Title, authors, abstract, and keywords are required." });
    } try {
        const result = await Article.create({
            title: req.body.title,
            authors: req.body.authors,
            abstract: req.body.abstract,
            keywords: req.body.keywords,
            doi: req.body.doi
        });
        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}

const updateArticle = async (req, res) => {
    if (!req?.body?.doi) {
        return res.status(400).json({ "message": "A doi parameter is missing." });
    } try {
        const upd8 = await Article.findOneAndUpdate({ doi: req.body.doi }, {
            title: req.body.title,
            authors: req.body.authors,
            abstract: req.body.abstract,
            keywords: req.body.keywords,
        }).exec();
        if (!upd8) return res.status(304).json({ "message": "Article ID was not found." });
        res.json(upd8);
    } catch (err) {
        console.error(err);
    }
}

const deleteArticle = async (req, res) => {
    if (!req?.body?.doi) {
        return res.status(400).json({ "message": "A doi parameter is missing." });
    } try {
        const del = await Article.findOneAndDelete({ doi: req.body.doi }).exec();
        if (!del) return res.status(304).json({ "message": "Article ID was not found." });
        res.json(del);
    } catch (err) {
        console.error(err);
    }
}

const getArticlesByTitle = async (req, res) => {
    if (!req?.params?.title) {
        return res.status(400).json({ "message": "Title parameter is missing." });
    } try {
        // const searchByTitle = await (await Article.find()).filter({ title: res.params.title });
        const searchByTitle = await Article.findOne({ title: res.params.title });
        if (!searchByTitle) return res.status(304).json({ "message": "No titles matches the search item." });
        res.json(searchByTitle);
    } catch (err) {
        console.error(err);
    }
}
module.exports = {
    getAllArticles,
    createNewArticle,
    updateArticle,
    deleteArticle,
    getArticlesByTitle
}