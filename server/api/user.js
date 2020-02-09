import Express from 'express'
import multer from 'multer'
import path from 'path'
import User from '../../models/User'
import Collect from '../../models/Collect'
import config from '../../config/config';
import {MD5_SUFFIX,responseClient,md5} from '../util'

const router = Express.Router();
const upload = multer({dest:path.join(__dirname,'../../static/userAvatar')});

router.post('/login', upload.single(), (req, res) => {
    let {username, password} = req.body;
    User.findOne({
        username,
        password: md5(password + MD5_SUFFIX)
    }).then(userInfo => {
        if (userInfo) {
            //登录成功
            let data = {};
            data.username = userInfo.username;
            data.userType = userInfo.type;
            data.userId = userInfo._id;
            //登录成功后设置session
            req.session.userInfo = data;
            responseClient(res, 200, 1, '登录成功', data);
            return;
        }
        responseClient(res, 400, 0, '用户名密码错误');

    }).catch(err => {
        responseClient(res);
    })
});


router.post('/register', upload.single(), (req, res) => {
    let {username, password } = req.body;
    //验证用户是否已经在数据库中
    console.log(req.body);
    User.findOne({username})
        .then(data => {
            if (data) {
                responseClient(res, 200, 0, '用户名已存在');
                return;
            }
            //保存到数据库
            let user = new User({
                username: username,
                password: md5(password + MD5_SUFFIX),
                type: 'user'
            });
            user.save()
                .then(function () {
                    var collect = new Collect({
                        tag:'默认收藏夹',
                        createtime:new Date().toString(),
                        user:user._id,
                        defaultCollect:true
                    });
                    collect.save(()=>{
                        User.findOne({_id:user._id})
                            .then(userInfo=>{
                                let data = {};
                                data.username = userInfo.username;
                                data.userType = userInfo.type;
                                data.userId = userInfo._id;
                                responseClient(res, 200, 1, '注册成功', data);
                                return;
                            });
                    })                   
                })
        }).catch(err => {
        throw err;
        responseClient(res);
    });
});

//用户验证
router.get('/userInfo',function (req,res) {
    if( req.session && req.session.userInfo){
        responseClient(res, 200, 1, 'ok', req.session.userInfo)
    }else{
        //responseClient(res,200,1,'请重新登录',req.session.userInfo)
        responseClient(res,200, 0 ,'请重新登录',{});
    }
});

router.get('/loginout',function (req,res) {
    responseClient(res,200,1,'ok');
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;