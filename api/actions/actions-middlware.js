// add middlewares here related to actions

// add middlewares here related to projects
const Actions = require('./actions-model');

const checkActionId = (req, res, next) =>{
    const { id } = req.params;

  Actions.get(id)
        .then(result => {
            if (result === null || result === undefined){
                res.status(404).json ({message: `Could not find action: ${id}`})
            }else{
                req.action= result;
                next();
            }
        })
        .catch(err =>{
            next(err);
        })
};

const checkAction =(req, res, next) => {
    const { project_id, description, notes, completed } = req.body;

    if (name === undefined || description === undefined || notes === undefined ||completed === undefined){
        res.status(400).json({message: 'These fields are required.'});
    }else if(description.length >128){
        res.status(400).json({message: 'Description word count is 128 characters.'});
    } else {
        next();
    }
};

module.exports = {
    checkActionId,
    checkAction,
};
