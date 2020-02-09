import Express from 'express'

const router = Express.Router();
import Tag from '../../models/Tag';
import {responseClient} from '../util'

//删除标签
router.get('/delTag', function (req, res) {
    let {name} = req.query;
    Tag.remove({name})
        .then(result => {
            if(result.result.n === 1){
                responseClient(res,200,0,'删除成功!')
            }else{
                responseClient(res,200,1,'标签不存在');
            }
        }).catch(err => {
        responseClient(res);
    });
});

//添加标签
router.post('/addTag', function (req, res) {
    let {name} = req.body;
    Tag.findOne({
        name
    }).then(result => {
        if (!result) {
            let tag = new Tag({
                name
            });
            tag.save()
                .then(data => {
                    responseClient(res, 200, 0, '添加成功', data);
                }).catch(err => {
                throw err
            })
        } else {
            responseClient(res, 200, 1, '该标签已存在');
        }
    }).catch(err => {
        responseClient(res);
    });
});


module.exports = router;