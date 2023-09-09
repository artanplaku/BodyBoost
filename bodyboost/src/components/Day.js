import React from 'react';
import { useDrop } from 'react-dnd';
import { useTranslation } from 'react-i18next';
import WorkoutItem from './WorkoutItem';

const Day = ({
    day,
    workouts,
    moveWorkout,
    isDarkMode,
    setSelectedDay,
    selectedDay,
    handleSubmit,
    clickedExercises,
    handleCircleClick,
    handleEdit,
    handleDelete,
    title,
    setTitle,
    exercises,
    handleExerciseChange,
    isEditing,
    handleDeleteExercise,
    handleAddExercise
}) => {
    const [{ isOver }, drop] = useDrop({
        accept: 'WORKOUT',
        drop: (item, monitor) => {
            if (item.day !== day) {
                moveWorkout(item.id, item.day, day);
            }
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });

    const { t } = useTranslation();

    return (
        <div ref={drop} className={`day-row ${isDarkMode ? 'day-row-dark' : ''}`} key={day}>
            <div className="day-row-header">
                <h2>{t(`workouts.days.${day.toLowerCase()}`)}</h2>
                <div className="add-exercise-button" onClick={() => setSelectedDay(day)}>
                    <span>+</span>
                </div>
            </div>
            {selectedDay === day && (
                <form onSubmit={handleSubmit}>
                    <h2>{t('workouts.add_workout')} {selectedDay}</h2>
                    <input
                        type="text"
                        placeholder={t('workouts.muscle_target')}
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                    />
                    {exercises.map((exercise, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                placeholder={t('workouts.exercise_name')}
                                value={exercise.name}
                                onChange={(event) => handleExerciseChange(index, 'name', event.target.value)}
                            />
                            <input
                                type="number"
                                placeholder={t('workouts.sets')}
                                value={exercise.sets}
                                onChange={(event) => handleExerciseChange(index, 'sets', event.target.value)}
                            />
                            <input
                                type="number"
                                placeholder={t('workouts.reps')}
                                value={exercise.reps}
                                onChange={(event) => handleExerciseChange(index, 'reps', event.target.value)}
                            />
                            <input
                                type="number"
                                placeholder={t('workouts.weight')}
                                value={exercise.weight}
                                onChange={(event) => handleExerciseChange(index, 'weight', event.target.value)}
                            />
                            {isEditing && <button type="button" onClick={() => handleDeleteExercise(index)}>{t('workouts.delete_exercise')}</button>}
                        </div>
                    ))}
                    <button type="button" onClick={handleAddExercise}>{t('workouts.add_exercise')}</button>
                    <button type="submit">{isEditing ? t('workouts.update_workout') : t('workouts.create_workout')}</button>
                </form>
            )}
            {workouts.filter(workout => workout.day === day).map((workout) => (
                <WorkoutItem 
                    key={workout._id} 
                    workout={workout} 
                    day={day}
                    handleCircleClick={handleCircleClick}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    clickedExercises={clickedExercises}
                />
            ))}
        </div>
    );
};

export default Day;
