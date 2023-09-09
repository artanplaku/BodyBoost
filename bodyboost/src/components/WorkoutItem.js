import React from 'react'
import { useDrag } from 'react-dnd';
import { useTranslation } from 'react-i18next';

const WorkoutItem = ({ workout, day, handleCircleClick, handleEdit, handleDelete, clickedExercises }) => {
    const { t } = useTranslation();
    const [{ isDragging }, drag] = useDrag({
        type: 'WORKOUT',
        item: { id: workout._id, day: day },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    return (
        <div ref={drag} key={workout._id} style={{ opacity: isDragging ? 0.5 : 1 }}>
            <h3>{workout.title}</h3>
            {workout.exercises.map((exercise, index) => (
                <div className="exercise-container" key={index}>
                    <span>{exercise.name} - {exercise.sets} {t('workouts.sets')} x {exercise.reps} {t('workouts.reps')} x {exercise.weight} lbs</span>
                    <div
                        className={`exercise-circle ${clickedExercises.has(`${workout._id}-${index}`) ? 'green-circle' : ''}`}
                        onClick={() => handleCircleClick(workout._id, index)}>
                    </div>
                </div>
            ))}
            <div className="button-container">
                <button onClick={() => handleEdit(workout)}>{t('workouts.edit')}</button>
                <button onClick={() => handleDelete(workout._id)}>{t('workouts.delete')}</button>
            </div>
        </div>
    );
};


export default WorkoutItem