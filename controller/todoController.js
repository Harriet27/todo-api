const fs = require('fs');
const db = require('../database');
const { uploader } = require('../helper/uploader');

module.exports = {
    getTodo : (req,res) => {
        let sql = `select id, todo, imagePath from todo where userId = ${req.params.id}`;
        db.query(sql, (err,results) => {
            if(err){
                res.status(500).send(err.message)
            }
            res.status(200).send({
                dataList : results,
                status : 'Success',
                message : 'Fetch Successful'
            })
        })
    },
    addTodo : (req,res) => {
        try {
            const path = '/images';
            const upload = uploader(path, 'TDO').fields([{name : 'image'}]);
            upload(req,res, (err) => {
                const { image } = req.files;
                const { todo } = req.body;
                const imagePath = image ? `${path}/${image[0].filename}` : null;
                let sql = `insert into todo (todo, userId, imagePath) values ('${todo}', ${req.params.id}, '${imagePath}')`;
                db.query(sql, (err,results) => {
                    if (err) {
                        fs.unlinkSync(`./public${imagePath}`);
                        res.status(500).send(err.message);
                    }
                    res.status(200).send({
                        status : 'Created',
                        data : results,
                        message : 'Data Created'
                    });
                })
            })
        } catch (err) {
            res.status(500).send(err.message);
        }
    },
    editTodo : (req,res) => {
        let { todo } = req.body;
        let { id } = req.params;
        let sql = `select * from todo where id = ${id}`;
        db.query(sql, (err,results) => {
            if (err) res.status(500).send(err.message);
            let oldImagePath = results[0].imagePath;
            try {
                const path = '/images';
                const upload = uploader(path, 'TDO').fields([{name : 'image'}]);
                upload(req,res,(err) => {
                    if (err) res.status(500).send(err.message);
                    const { image } = req.files;
                    console.log(image);
                    const { todo } = req.body;
                    const imagePath = image ? `${path}/${image[0].filename}` : oldImagePath;
                    let sql = `update todo set todo = '${todo}', imagePath = '${imagePath}' where id = ${id}`;
                    db.query(sql, (err,results) => {
                        if (err) {
                            fs.unlinkSync(`./public${imagePath}`);
                            res.status(500).send(err.message);
                        }
                        if (image) {
                            fs.unlinkSync(`./public${oldImagePath}`);
                        }
                        res.status(200).send({
                            status : 'Success',
                            message : 'Edit data successfully'
                        });
                    })
                })
            } catch (err) {
                res.status(500).send(err.message);
            }
        })
        // let sql = `update todo set todo = '${todo}' where id = ${id}`;
        // db.query(sql, (err, update) => {
        //     if(err){
        //         res.status(500).send(err.message)
        //     }
        //     res.status(201).send({
        //         status : 'edited',
        //         message : 'Data Edited!' 
        //     })
        // })
    },
    deleteTodo : (req,res) => {
        let { id } = req.params;
        let sql = `delete from  todo where id = ${id}`;
        db.query(sql, (err, del) => {
            if(err){
                res.status(500).send(err.message)
            }
            res.status(201).send({
                status : 'deleted',
                message : 'Data Deleted!' 
            })
        })
    }
}