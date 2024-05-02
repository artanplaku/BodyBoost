import React, {useState} from 'react'
import { useDrag } from 'react-dnd';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const WorkoutItem = ({ workout, day, handleCircleClick, handleEdit, handleDelete, clickedExercises, isEditing, editingWorkoutId  }) => {

    const { t } = useTranslation();
    const [{ isDragging }, drag] = useDrag({
        type: 'WORKOUT',
        item: { id: workout._id, day: day },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    const handleEditClick = () => {
        handleEdit(workout);
    };

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
            <FontAwesomeIcon icon={faEdit} onClick={handleEditClick} />
            {isEditing && editingWorkoutId === workout._id && <FontAwesomeIcon icon={faTrashAlt} onClick={() => handleDelete(workout._id)} />}
            </div>
        </div>
    );
};


export default WorkoutItem