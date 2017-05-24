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

router.get('/brand', home(db).getBrand);

router.get('/model', home(db).getModel);

router.get('/filter', home(db).getFilter);

router.post('/admin/edit/save', home(db).updateRecord);

router.post('/admin/new/save', home(db).saveRecord);

router.get('/admin/edit', home(db).getEditPage);

router.get('/admin/delete', home(db).deleteRecord);

router.get('/admin', home(db).getAdminPage);

router.get('*', home(db).getHomePage);




module.exports = router;
