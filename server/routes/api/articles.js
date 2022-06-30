const express = require('express');
const router = express.Router();
const ROLES_LIST = require('../../config/roles');
const { getAllArticles, createNewArticle, updateArticle, deleteArticle, getArticlesByTitle } = require('../../controller/articlesController');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    //get all articles, doesnt require admin
    .get(getAllArticles)
    //create operation that require admin
    .post(
        verifyRoles(ROLES_LIST.Admin),
        createNewArticle
    )
    //update operation that require admin
    .put(
        verifyRoles(ROLES_LIST.Admin),
        updateArticle
    )
    //delete operation that require admin
    .delete(
        verifyRoles(ROLES_LIST.Admin),
        deleteArticle
    )

router.route('/queryTitle')
    .get(getArticlesByTitle)

module.exports = router
