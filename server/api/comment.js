import Express from 'express'
import multer from 'multer'
import path from 'path';
import fs from 'fs'
import Comment from '../../models/Comment';
import config from '../../config/config'
const router = Express.Router();
import {MD5_SUFFIX,responseClient,md5} from '../util'

var createFolder = function(folder){
    try{
        fs.accessSync(folder); 
    }catch(e){
        fs.mkdirSync(folder);
    }  
}

var uploadFolder = path.join(__dirname,  '../../static/comments');
createFolder(uploadFolder);
// 通过 filename 属性定制
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadFolder);    // 保存的路径，备注：需要自己创建
    },
    filename: function (req, file, cb) {
        // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
        //console.log(file);
        let type = file.mimetype;       
        cb(null, file.fieldname + '-' + Date.now() +  '.'+type.slice(6,type.length) );  
    }
});

var upload = multer({storage});

function getComments(res, uniquekey, pageNum=1, sort='time'){
    var skip = (pageNum - 1) < 0 ? 0 : (pageNum - 1) * 10;
    var filter = { related: uniquekey, isSub:false };
    var sortCondition;
    switch(sort){
        case 'time':
            sortCondition = { _id:1};
            break;
        case 'timeInvert':
            sortCondition = { _id:-1};
            break;
        default :
            sortCondition = { _id : 1}
    }
    var data = {
        total:0,
        comments:[]
    };
    Comment.count(filter)
        .then(count=>{
            Comment.find(filter)
                .populate({
                    path:'fromUser',
                    select:'username userImage'
                })
                .populate({
                    path:'likeUsers.user',
                    select:'username userImage'
                })
                .populate({
                    path:'dislikeUsers.user',
                    select:'username userImage'
                })
                .populate({
                    path:'replies',
                    populate : [
                        { path:'likeUsers.user', select:'username userImage'},
                        { path:'dislikeUsers.user', select:'username userImage'},
                        { path: 'fromUser', select:'username userImage'},
                        { 
                            path:'replyTo',
                            select:'fromUser',
                            populate:{ path:'fromUser', select:'username'}

                        }
                    ]
                })
                .sort(sortCondition)
                .skip(skip)
                .limit(10)
                .then(comments=>{                    
                    data.total = count;
                    data.comments = comments ;                   
                    responseClient(res, 200, 1, 'ok', data);
                })
        })
}

function getOneComment(res, commentid){
    Comment.findOne({_id:commentid})
        .populate({
            path:'fromUser',
            select:'username userImage'
        })
        .populate({
            path:'likeUsers.user',
            select:'username userImage'
        })
        .populate({
            path:'dislikeUsers.user',
            select:'username userImage'
        })
        .populate({
            path:'replyTo',
            select:'fromUser',
            populate:{ path:'fromUser', select:'username'}                        
        })
        .then(doc=>{
            console.log(doc);
            responseClient(res, 200, 1, 'ok', doc);
        })
}

router.get('/getComments',(req,res)=>{
    var { uniquekey, pageNum, sort } = req.query;
    getComments(res, uniquekey, pageNum, sort);

})

router.post('/addComment',upload.array('images'),(req, res)=>{
    var { content, uniquekey, user } = req.body;
    var images = [];
    var date = new Date().toString();
    if(req.files){
        req.files.forEach(item=>{
            var imgUrl = `http://${config.host}:${config.port}/comments/${item.filename}`;
            images.push(imgUrl);
        });
    }
    var comment = new Comment({
        fromUser:user,
        date,
        related:uniquekey,
        onModel:'Article',
        isSub:false,
        content,
        images
    });

    comment.save()
        .then(()=>{
            getComments(res, uniquekey);
        })
})

router.post('/addReply',upload.array('images'),(req, res)=>{
    var { commentid, parentcommentid, uniquekey, user, content } = req.body;
    var images = [];
    var date = new Date().toString();
    if(req.files){
        req.files.forEach(item=>{
            var imgUrl = `http://${config.host}:${config.port}/comments/${item.filename}`;
            images.push(imgUrl);
        });
    }
    var comment = new Comment({
        fromUser:user,
        replyTo:commentid,
        parent:parentcommentid ? parentcommentid : commentid ,
        date,
        related:uniquekey,
        onModel:'Article',
        isSub:true,
        images,
        content,
        fromSubTextarea : parentcommentid ? true : false 
    });
    comment.save()
        .then(()=>{
            var finalCommentid = parentcommentid ? parentcommentid : commentid ;
            Comment.updateOne({_id:finalCommentid},{$push:{replies:comment._id}},(err,result)=>{
                getOneComment(res, comment._id);
            })           
        })
})

router.get('/operateComment',(req,res)=>{
    var { commentid, userid, action, isCancel } = req.query;
    var date = new Date().toString();
    var option = isCancel ? { $pull :{[action+'Users']:{user:userid}} }: {$push:{[action+'Users']:{user:userid, date}}};
    Comment.updateOne({_id:commentid}, option, (err,result)=>{
        Comment.findOne({_id:commentid})
            .populate({ path:'likeUsers.user', select:'username userImage'})
            .populate({ path:'dislikeUsers.user', select:'username userImage'})
            .then(doc=>{
                responseClient(res, 200, 1, 'ok');
            })
            .catch(err=>{
                throw err;
                responseClient(res);
            })
    })

})
module.exports = router;