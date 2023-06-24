const express = require('express');
const routerTemplate = express.Router();

const { exampleController } =  require('../controllers/controllers.module');
const base = '/example-path'

//Routes
routerTemplate.post(`${base}`, (req, res) => { exampleController.createFunction(req, res); });
routerTemplate.post(`${base}/:id`, (req, res) => { exampleController.putFunction(req, res); });
routerTemplate.delete(`${base}/:id`, (req, res) => { exampleController.deleteById(res, req.params.id)})
routerTemplate.get(`${base}/:id`, (req, res) => { exampleController.findById(res, req.params.id)})

// export default routerTemplate;
module.exports  = {routerTemplate}
