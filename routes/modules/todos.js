const express = require('express');
const router = express.Router();

const Todo = require('../../models/todo');

// new page
router.get('/new', (req, res) => {
    return res.render('new');
});

// 新增todo資料的 處理路由
router.post('/', (req, res) => {
    const name = req.body.name; // 從 req.body 拿出表單裡的 name 資料
    return Todo.create({ name }) // 存入資料庫
        .then(() => res.redirect('/')) // 新增完成後導回首頁
        .catch((error) => console.log(error));
});

// detail  因為在index.js裡面將detail路由定義為"./todos/{{this._id}}"
router.get('/:id', (req, res) => {
    const id = req.params.id;
    return Todo.findById(id)
        .lean()
        .then((todo) => res.render('detail', { todo }))
        .catch((error) => console.log(error));
});

// edit page
router.get('/:id/edit', (req, res) => {
    const id = req.params.id;
    return Todo.findById(id)
        .lean()
        .then((todo) => res.render('edit', { todo }))
        .catch((error) => console.log(error));
});

// update
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const { name, isDone } = req.body;
    return Todo.findById(id)
        .then((todo) => {
            todo.name = name;
            todo.isDone = isDone === 'on';
            return todo.save();
        })
        .then(() => res.redirect(`/todos/${id}`))
        .catch((error) => console.log(error));
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    return Todo.findById(id)
        .then((todo) => todo.remove())
        .then(() => res.redirect('/'))
        .catch((error) => console.log(error));
});

module.exports = router;
