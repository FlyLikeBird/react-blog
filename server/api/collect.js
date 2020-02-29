import Express from 'express'
import Collect from '../../models/Collect';
import config from '../../config/config'
const router = Express.Router();
import {MD5_SUFFIX,responseClient,md5} from '../util'

function getCollects(res, user){
    Collect.find({user})
        .populate({
            path:'content',
            populate:{ path:'tags', select:'tag'}
        })
        .then(data=>{
            responseClient(res, 200, 1, 'ok', data);
        })
        .catch(err=>{
            console.log(err);
        })
}

router.get('/getCollects',(req,res)=>{
    var { user } = req.query;
    getCollects(res, user);
})

router.get('/addIntoContent',(req, res)=>{
    var { uniquekey, collectId, isCancel } = req.query;
    var operation = isCancel ? '$pull' : '$push';
    Collect.updateOne({_id:collectId},{[operation]:{content:uniquekey}},(err,result)=>{
        responseClient(res, 200, 1, 'ok');
    })
})

router.get('/addCollect',(req, res)=>{
    var { user, tag, privacy } = req.query;
    var collect = new Collect({
        tag,
        createtime:new Date().toString(),
        privacy,
        user
    });
    collect.save()
        .then(()=>{
            Collect.findOne({_id:collect._id})
                .then(data=>responseClient(res, 200, 1, 'ok', data)) 
        })
        .catch(err=>{
            console.log(err);
        })
})

module.exports = router;