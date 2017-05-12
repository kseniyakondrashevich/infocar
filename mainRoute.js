/**
 * Created by User on 02.05.2017.
 */

const express = require('express');
const home = require('./handlers');
const db = require('./database');
const router = express.Router();

router.use(function (req, res, next) {
    console.log('handler for all requests was called');
    next();
});


router.get('/tableData', home(db).getMainTable);

router.get('/car', home(db).getCar);

router.get('/search', home(db).getSearch);

router.get('/filterData', home(db).getFilterData);

router.get('/filter', home(db).getFilter);

router.get('/admin', home(db).getAdminPage);

router.get('/admin/edit', home(db).getEditPage);

router.get('/admin/delete', home(db).deleteRecord);

router.get('*', home(db).getHomePage);




module.exports = router;
