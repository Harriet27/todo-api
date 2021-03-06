const { MongoClient, ObjectID, url } = require('../database').mongo;

module.exports = {
    getMovies : (req,res) => {
        MongoClient.connect(url, (err,client) => {
            if (err) {
                res.status(500).send(err.message);
            }
            let moviesCol = client.db('sample_mflix').collection('movies');
            moviesCol.find({
                title : req.query.title
                // title : {
                //     '$regex' : req.query.title,
                //     '$options' : 'i'
                // }
            }).limit(10).toArray((err,results) => {
                client.close();
                if (err) {
                    res.status(500).send(err.message);
                }
                res.status(200).send(results);
            })
        })
    },
    addMovies : (req,res) => {
        MongoClient.connect(url, (err,client) => {
            if (err) {
                res.status(500).send(err.message);
            }
            let moviesCol = client.db('sample_mflix').collection('movies');
            moviesCol.insertOne(req.body, (err,results) => {
                client.close();
                if (err) {
                    res.status(500).send(err.message);
                }
                res.status(200).send(results);
            })
        })
    },
    editMovies : (req,res) => {
        // 5e992d718f07440aca2b22b
        if (!req.body.unset) {
            req.body.unset = {"title" : ""}
        }
        MongoClient.connect(url, (err,client) => {
            if (err) {
                res.status(500).send(err.message);
            }
            let moviesCol = client.db('sample_mflix').collection('movies');
            moviesCol.updateOne({
                _id : new ObjectID(req.params.id)
            },{
                $set : req.body.set,
                $unset : req.body.unset
            },(err,results) => {
                client.close();
                if (err) {
                    res.status(500).send(err.message);
                }
                res.status(200).send(results);
            })
        })
    },
    deleteMovies : (req,res) => {
        MongoClient.connect(url, (err,client) => {
            if (err) {
                res.status(500).send(err.message);
            }
            let moviesCol = client.db('sample_mflix').collection('movies');
            moviesCol.deleteOne({
                _id : req.params.id
            }, (err,results) => {
                client.close();
                if (err) {
                    res.status(500).send(err.message);
                }
                res.status(200).send(results);
            })
        })
    }
}