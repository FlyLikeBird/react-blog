var Article = require('../models/Article');
var Comment = require('../models/Comment');
var User = require('../models/User');
var Tag = require('../models/Tag');
var config = require('../config/config.js');
//var secret = require('../src/utils/secret');
//  去掉article里面的 <div id="title"></div>
function clearArticleTitle(){
   var pattern1 = /<div id="title">[\s\S]*?<\/div>/g;
   var pattern2 = /<div class="article-src-time">[\s\S]*?<\/div>/g;
   Article.find({},(err, articles)=>{
      for(var i=0,len=articles.length;i<len;i++){
          (function(i){
              var article = articles[i];
              var prevContent = article.content;
              var nextContent = prevContent.replace(pattern1, '').replace(pattern2,'');
              Article.updateOne({_id:article._id},{$set:{content:nextContent}},(err)=>{});
          })(i)
      }
   })
}

function _addSingleArticle(articleId, tags){
    var length = Math.floor(Math.random()*5);
    var arr = [];
    var allPromise = [];
    for(var i=0;i<=length;i++){      
        var random = tags[Math.floor((Math.random()*(tags.length)))];
        if(!arr.includes(random)){
            arr[i] = random;
            var promise = new Promise((resolve)=>{
              Tag.updateOne({_id:random}, {$push:{content:articleId}},(err,result)=>{
                resolve();
              })
            });
            allPromise.push(promise);
        } else {
          i--;
        }
    }

    Promise.all(allPromise)
      .then(()=>{
          Article.updateOne({_id:articleId},{$set:{tags:arr}},(err,result)=>{});
      })
}

function addTagsToArticles(){
    Article.find({},(err,articles)=>{
        Tag.find({},(err,tags)=>{
            var tags = tags.map(item=>item._id);
            articles.map(article=>{
                _addSingleArticle(article._id, tags);
            })
        })
        
    })
}

function _singleArticleDoc(id){
    var arr = [];
    for(var i=0;i<3;i++){
        var filename = 'http://localhost:'+config.port+'/thumbnails/img'+Math.floor(Math.random()*168)+'.jpeg';
        arr.push(filename);
    }    
    Article.updateOne({_id:id},{$set:{thumbnails:arr}},(err,result)=>{
      //console.log(result);
    })

}

function addThumbnails(){ 
  Article.find({},(err,articles)=>{
      for(var i=0,len=articles.length;i<len;i++){
          _singleArticleDoc(articles[i]._id);
      }
  }) 
}


function _createUser(i, resolve){
    var date = new Date().toString();
    var user = new User({
        username:`测试用户0${i<10?0+i:i}`,
        password:secret.encrypt('123'),
        registerTime:date
    });
    user.save()
      .then(()=>{
          resolve(user);
      })
}
//  生成20个测试用户
function createTestUsers(num, resolve){
    var afterUsersCreated = [];
    for(var i=0;i<num;i++){
        (function(i){
            var promise = new Promise((resolve,reject)=>{
                _createUser(i, resolve);
            });
            afterUsersCreated.push(promise);
        })(i)     
    }
    Promise.all(afterUsersCreated)
      .then(users=>{
          resolve(users);
      })
}


function createComment(user, articleId, resolve){
    var { username, userImage } = user;
    var date = new Date().toString();
    var comment = new Comment({
        username:username,
        avatar:userImage,
        commentType:'news',
        date,
        content:`测试内容test---${username}`,
        uniquekey:articleId
    });
    comment.save()
      .then(()=>{
          resolve()
      })
}

function writeToArticle(users, articleId, resolve){
    var afterCommentCreated = [];
    for(var i=0,len=users.length;i<len;i++){
        (function(i){
            var user = users[i];
            var promise = new Promise((resolve, reject)=>{
                createComment(user, articleId, resolve);
            });
            afterCommentCreated.push(promise);
        })(i)
    }
    Promise.all(afterCommentCreated)
      .then(()=>{
          resolve();
      })
}

function createTestData(num){
    var promise = new Promise((resolve,reject)=>{
        createTestUsers(num, resolve);
    });

    promise.then(users=>{
        Article.find({},(err,articles)=>{
            var afterWriteToArticles = [];
            for(var i=0,len=articles.length;i<len;i++){
                (function(i){
                    var articleId = articles[i].articleId;
                    var promise = new Promise((resolve,reject)=>{
                        writeToArticle(users, articleId, resolve);
                    });
                    afterWriteToArticles.push(promise);
                })(i)
            }
            Promise.all(afterWriteToArticles)
              .then(()=>{
                  console.log('testData is finished!');
              })
            
        })
    })

}

module.exports = {
    clearArticleTitle,
    addTagsToArticles,
    addThumbnails,
    createTestData,
}