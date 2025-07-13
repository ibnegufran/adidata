const express=require('express');
const { addDataController, getDataController, updateDataController, deleteDataController, getByIdDataController } = require('../controller/dataController');
const requireSignIn = require('../middlewares/auth');
const router=express.Router();

router.post('/add',requireSignIn,addDataController);

router.get('/get',requireSignIn,getDataController);
router.get('/getById/:id',requireSignIn,getByIdDataController);


router.put('/update/:id',requireSignIn,updateDataController);

router.delete('/delete/:id',requireSignIn,deleteDataController);

module.exports=router