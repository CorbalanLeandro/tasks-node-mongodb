const { check } = require('express-validator');

module.exports = {
    newTask: [
        check('addTaskTitle').not().isEmpty().withMessage(`The task title can't be empty`),
        check('addTaskTitle').isLength({ min: 2, max: 15 }).withMessage('The task title must be longer than 2 and shorter than 15 characters'),
        check('addTaskDescription').not().isEmpty().withMessage(`The task description can't be empty`),
        check('addTaskDescription').isLength({ min: 2, max: 150 }).withMessage('The task description must be longer than 2 and shorter than 150 characters')
    ],
    editTask: [
        check('editTaskTitle').not().isEmpty().withMessage(`The task title can't be empty`),
        check('editTaskTitle').isLength({ min: 2, max: 15 }).withMessage('The task title must be longer than 2 and shorter than 15 characters'),
        check('editTaskDescription').not().isEmpty().withMessage(`The task description can't be empty`),
        check('editTaskDescription').isLength({ min: 2, max: 150 }).withMessage('The task description must be longer than 2 and shorter than 150 characters')
    ]

}    
