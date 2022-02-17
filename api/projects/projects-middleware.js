// add middlewares here related to projects
const Projects = require('./projects-model');

const checkProjectId = (req, res, next) =>{
    const { id } = req.params;

    Projects.get(id)
        .then(result => {
            if (result === null || result === undefined){
                res.status(404).json ({message: `Could not find project : ${id}`})
            }else{
                req.project = result;
                next();
            }
        })
        .catch(err =>{
            next(err);
        })
};

const checkProject =(req, res, next) => {
    const { name, description, completed } = req.body;

    if (name === undefined || description === undefined || completed === undefined){
        res.status(400).json({message: 'These fields are required.'});
    }else {
        next();
    }
};

module.exports = {
    checkProjectId,
    checkProject,
};