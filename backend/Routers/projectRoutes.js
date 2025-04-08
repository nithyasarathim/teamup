const express = require('express');
const router = express.Router();
const { createProject, getMyProjects, fetchProject, updateProjectTasks, addTasks, ListProjects, updateProjectInfo } = require('../Controller/projectController');

router.post('/project-create', createProject);
router.post('/my-projects', getMyProjects);
router.get('/:id', fetchProject);
router.patch('/:id', updateProjectTasks);
router.patch('/info/:id', updateProjectInfo);
router.post('/:id/add', addTasks);
router.post('/explore', ListProjects);

module.exports = router;
