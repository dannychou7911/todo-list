const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const routes = require('./routes');

// 載入設定檔，要寫在 express-session 以後
const usePassport = require('./config/passport');
// Mongoose 連線設定只需要「被執行」，不需要接到任何回傳參數繼續利用，所以這裡不需要再設定變數。
require('./config/mongoose');

const app = express();

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');

// session
app.use(
    session({
        secret: 'ThisIsMySecret',
        resave: false,
        saveUninitialized: true,
    })
);

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }));

// method-override要設置在最靠近路由清單的上方
app.use(methodOverride('_method'));

// 呼叫 Passport 函式並傳入 app，這條要寫在路由之前
usePassport(app);

// 路由抽出後，統一使用
app.use(routes);

// 設定 port 3000
app.listen(3000, () => {
    console.log('App is running on http://localhost:3000');
});
