// Write your "actions" router here!
// Write your "projects" router here!
const express = require('express');

const Actions= require('./actions-model');
const { checkActionId, checkAction } = require('./actions-middlware');

const router = express.Router();

router.get('/', (req, res, next) => {

    Actions.get()
    .then(actions =>{
        res.status(200).json(actions);
    })
    .catch(err =>{
        next(err);
    });
});

router.get('/:id', checkActionId, (req, res) => {
   res.status(200).json(req.action);
});

router.post('/', checkAction, (req, res, next) => {

    Actions.insert(req.body)
    .then(action =>{
        res.status(200).json(action);
    })
    .catch(err =>{
        next(err);
    });
});

router.put('/:id', checkActionId, checkAction, (req, res, next)=> {
    const { id } = req.params;

    Actions.update(id, req.body)
        .then(action =>{
            res.status(200).json(action);
        })
        .catch(err => {
            next(err);
        });

});

router.delete('/:id', checkActionId, (req, res, next)=>{
    const { id } = req.params;

    Actions.get(id)
        .then(action =>{
            res.status(200).json(action);
            return Projects.remove(id);
        })
        .catch(err =>{
            next(err);
        });
});


module.exports = router;
