// Write your "projects" router here!
const express = require('express');

const Projects= require('./projects-model');
const { checkProjectId, checkProject } = require('./projects-middleware');

const router = express.Router();

router.get('/', (req, res, next) => {

    Projects.get()
    .then(projects =>{
        res.status(200).json(projects);
    })
    .catch(err =>{
        next(err);
    });
});

router.get('/:id', checkProjectId, (req, res) => {
   res.status(200).json(req.project);
});

router.post('/', checkProject, (req, res, next) => {

    Projects.insert(req.body)
    .then(project =>{
        res.status(200).json(project);
    })
    .catch(err =>{
        next(err);
    });
});

router.put('/:id', checkProjectId, checkProject, (req, res, next)=> {
    const { id } = req.params;

    Projects.update(id, req.body)
        .then(project =>{
            res.status(200).json(project);
        })
        .catch(err => {
            next(err);
        });

});

router.delete('/:id', checkProjectId, (req, res, next)=>{
    const { id } = req.params;

    Projects.get(id)
        .then(project =>{
            res.status(200).json(project);
            return Projects.remove(id);
        })
        .catch(err =>{
            next(err);
        });
});

router.get('/:id/actions', checkProjectId, (req, res, next)=>{
    const { id } = req.params;

    Projects.getProjectActions(id)
        .then(actions =>{
            res.status(200).json(actions);
        })
        .catch(err =>{
            next(err);
        });
});

module.exports = router;