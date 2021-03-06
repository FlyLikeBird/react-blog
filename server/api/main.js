import Express from 'express'
import Tag from '../../models/Tag'
import Article from '../../models/Article'
import Comment from '../../models/Comment'
import {responseClient, selectContentByUniquekey } from '../util'
import mongooseOperation from '../mongooseOperation';

const router = Express.Router();


router.use('/user', require('./user'));
router.use('/comment',require('./comment'));
router.use('/collect', require('./collect'));
//获取全部标签
router.get('/getAllTags', function (req, res) {
    Tag.find(null).then(tags=> {
        var data = tags.map(item=>{
          var obj = {};
          obj.tag = item.tag;
          obj.content = item.content.length ;
          obj._id = item._id;
          return obj;
        });
        //console.log(data);
        responseClient(res, 200, 0, '请求成功', data);
    }).catch(err => {
        responseClient(res);
    })
});

//获取文章
router.get('/getArticles', function (req, res) {
    var { tag, isPublish, pageNum } = req.query;
    isPublish = isPublish === 'true' ? true : false;
    var searchCondition ;
    searchCondition = tag ? 
        {
            isPublish,
            tags:{$elemMatch:{$eq:tag}}
        }
        :
        { isPublish}
    let skip = (pageNum - 1) < 0 ? 0 : (pageNum - 1) * 10;
    let responseData = {
        total: 0,
        list: []
    };
    
    Article.count(searchCondition)
        .then(count => {
            responseData.total = count;
            Article.find(searchCondition, '_id title isPublish newstime comments author viewcount tags thumbnails content', {
                skip: skip,
                limit: 10
            })
            .populate({ path:'tags', select:'tag'})
            .then(articles => {
                var promises = []
                var data = articles.map(article=>{
                    article.content = selectContentByUniquekey(article.content);
                    var promise = new Promise((resolve,reject)=>{
                      Comment.find({related:article._id},(err,comments)=>{
                        resolve(comments.length);
                      })
                    })
                    promises.push(promise);
                    return article;
                })
                
                Promise.all(promises)
                  .then((comments)=>{
                      var list = data.map((article,index)=>{
                        article.comments = comments[index];
                        return article;
                      });
                      responseData.list = list;
                      responseClient(res, 200, 1, 'ok', responseData);
                  })
                
            }).catch(err => {
              throw err
            })
        }).catch(err => {
        responseClient(res);
    });
    
});

//获取文章详情
router.get('/getArticleDetail', (req, res) => {
    let _id = req.query.id;
    Article.updateOne({_id},{$inc:{viewcount:1}},(err,result)=>{
        Article.findOne({_id})
          .populate({path:'tags', select:'tag'})
          .populate({path:'auth', select:'username userImage description level userFans'})
          .then(doc=>{
              responseClient(res, 200, 1, 'ok', doc);
          })
          .catch(err=>{
              throw err;
          })
    })
});

//获取评论
router.get('/getArticleComments',(req, res)=>{
    var { id } = req.query;
    Comment.find({_id:id})
      .sort({date:1})
      .then(data=>{
         responseClient(res, 200, 0, 'success', data);
      })
})

module.exports = router;