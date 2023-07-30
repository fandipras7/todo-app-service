const express = require('express')
const router = express.Router()
const activityController = require('../controller/activity')

router.post('/', activityController.addActivity)
router.get('/', activityController.getActivity)
router.get('/:id', activityController.detailActivity)
router.put('/:id', activityController.updateActivity)
router.delete('/:id', activityController.deleteActivity)

module.exports = router
