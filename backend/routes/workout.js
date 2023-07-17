const express = require('express');
const {
    createWorkout,
    getWorkouts,
    getWorkout,
    delteWorkout,
    updateWorkout
} = require('../controllers/workoutControllers');

const router = express.Router();


// GET all workouts
router.get('/', getWorkouts);

// GET a single workouts
router.get('/:id', getWorkout);

// POST a new workout
router.post('/', createWorkout);

// DELETE a workout
router.delete('/:id', delteWorkout);

// UPDATE a workout
router.patch('/:id', updateWorkout);


module.exports = router;