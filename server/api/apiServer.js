/**
 * api请求server
 *
 * 0：成功
 * 1：数据不合法
 * 2：客户端数据错误
 * 3：后端错误
 */
import Express from 'express'
import config from '../../config/config'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import reload from 'reload'

const port = config.apiPort;

const app = new Express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(cookieParser('express_react_cookie'));
app.use(session({
    secret:'express_react_cookie',
    resave: true,
    saveUninitialized:true,
    cookie: {maxAge: 8640 * 1000 * 100 }//过期时间
}));

//前端页面路由
app.use('/', require('./main'));
//管理页面路由
app.use('/admin', require('./admin'));

//mongoose.Promise = require('bluebird');

mongoose.connect(`mongodb://${config.dbHost}:${config.dbPort}/react-blog`, function (err) {
    if (err) {
        console.log(err, "数据库连接失败");
        return;
    }
    console.log('数据库连接成功');

    app.listen(port, function (err) {
        if (err) {
            console.error('err:', err);
        } else {
            console.info(`===> api server is running at ${config.apiHost}:${config.apiPort}`)
        }
    });
});
