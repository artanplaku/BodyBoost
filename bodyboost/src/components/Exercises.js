import React, { useState, useEffect, useContext } from "react";
import '../styles/Exercises.scss';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../contexts/ThemeContext';

const Exercises = () => {
    const [selectedDifficulty, setSelectedDifficulty] = useState(null);
    const [selectedMuscle, setSelectedMuscle] = useState(null);
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDay, setSelectedDay] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [exercisesPerPage] = useState(10);
    const { isDarkMode } = useContext(ThemeContext);
    const { t } = useTranslation();

    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    const difficulties = ["beginner", "intermediate", "expert"];
    const muscles = [
      "abdominals",
      "hamstrings",
      "calves",
      "shoulders",
      "adductors",
      "glutes",
      "quadriceps",
      "biceps",
      "forearms",
      "abductors",
      "triceps",
      "chest",
      "lower back",
      "traps",
      "middle back",
      "lats",
      "neck",
    ];

    useEffect(() => {
        setLoading(true);
        const params = new URLSearchParams();
        if (selectedDifficulty !== null) {
            params.append('level', difficulties[selectedDifficulty]);
        }
        if (selectedMuscle !== null) {
            params.append('muscle', muscles[selectedMuscle]);
        }
        const url = `https://bodyboostbackend.onrender.com/api/exercises?${params.toString()}`;

        fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        })
        .then(res => {
            if (!res.ok) {
                throw new Error("Network response was not ok");
            }
            return res.json();
        })
        .then(data => {
            console.log(data)
            setExercises(data);
            setLoading(false);
        })
        .catch(err => {
            setError(err);
            setLoading(false);
        });
    }, [selectedDifficulty, selectedMuscle]);

    const handleDifficultyClick = index => {
        setSelectedDifficulty(prevSelectedDifficulty =>
            prevSelectedDifficulty === index ? null : index
        );
    };

    const handleMuscleClick = index => {
        setSelectedMuscle(prevSelectedMuscle =>
            prevSelectedMuscle === index ? null : index
        );
    };

    const handleDaySelect = (exerciseName, day) => {
        setSelectedDay({
            ...selectedDay,
            [exerciseName]: day
        });
    };

    const getDifficultyStyle = index => {
        return selectedDifficulty === index ? { backgroundColor: "lightgreen" } : {};
    };

    const getMuscleStyle = index => {
        return selectedMuscle === index ? { backgroundColor: "lightgreen" } : {};
    };

    const indexOfLastExercise = currentPage * exercisesPerPage;
    const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
    const currentExercises = exercises.slice(indexOfFirstExercise, indexOfLastExercise);
    const totalPages = Math.ceil(exercises.length / exercisesPerPage);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const renderPaginationButtons = () => {
        let pageNumbers = [];
        const pageThreshold = 2;  // How many pages before and after current page to show
        const startPage = Math.max(1, currentPage - pageThreshold);
        const endPage = Math.min(totalPages, currentPage + pageThreshold);

        if (startPage > 1) {
            pageNumbers.push(1);
            if (startPage > 2) pageNumbers.push('...');
        }
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) pageNumbers.push('...');
            pageNumbers.push(totalPages);
        }

        return pageNumbers.map(number => number === '...' ? <span key={number}>...</span> : (
            <button
                key={number}
                className={`page-item ${number === currentPage ? 'active' : ''}`}
                onClick={() => paginate(number)}
            >
                {number}
            </button>
        ));
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>An error occurred: {error.message}</div>;

    return (
        <div>
            <div className="exercises-container">
                <h1 className="difficulty-title">{t('exercises.difficulty')}</h1>
                <div className="difficulty-container">
                    {difficulties.map((level, index) => (
                        <div
                            key={level}
                            className={`difficulty-div ${isDarkMode ? 'difficulty-div-dark' : ''}`}
                            onClick={() => handleDifficultyClick(index)}
                            style={getDifficultyStyle(index)}
                        >
                            {t(`exercises.${level}`)}
                        </div>
                    ))}
                </div>
            </div>
            <div className="muscles-container">
                <h1 className="muscles-title">{t('exercises.muscles')}</h1>
                <div className="muscles-container-divs">
                    {muscles.map((muscle, index) => (
                        <div
                            key={muscle}
                            className={`muscle-div ${isDarkMode ? 'muscle-div-dark' : ''}`}
                            onClick={() => handleMuscleClick(index)}
                            style={getMuscleStyle(index)}
                        >
                            {t(`exercises.muscle_${muscle.replace(/\s+/g, '_')}`)}
                        </div>
                    ))}
                </div>
            </div>
            <ul>
                {currentExercises.map((exercise) => (
                    <div key={exercise._id} className={`exercise-card ${isDarkMode ? 'exercise-card-dark' : ''}`}>
                        <div className="exercise-content">
                            <div className="title-container">
                                <h2>{exercise.name}</h2>
                                <div className="add-circle" onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedDay({
                                        ...selectedDay,
                                        [exercise.name]: selectedDay[exercise.name] ? null : daysOfWeek[0]
                                    });
                                }}>
                                    +<span className="tooltip-text">{t('exercises.add_to_workouts')}</span>
                                </div>
                                {selectedDay[exercise.name] && (
                                    <div>
                                        <select
                                            value={selectedDay[exercise.name]}
                                            onChange={(e) => {
                                                e.stopPropagation(); 
                                                handleDaySelect(exercise.name, e.target.value);
                                            }}
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <option value="">{t('exercises.select_a_day')}</option>
                                            {daysOfWeek.map((day) => (
                                                <option key={day} value={day}>
                                                    {t(`exercises.day_${day.toLowerCase()}`)}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            </div>
                            <p>{t('exercises.difficulty')}: {exercise.level}</p>
                            <p>{t('exercises.muscle')}: {exercise.primaryMuscles.join(', ')}</p>
                            <p className="exercise-instructions">{t('exercises.instructions')}: {exercise.instructions.join('. ')}</p>
                        </div>
                        <div className="exercise-images">
                            {exercise.images.map((image, index) => (
                                <img
                                    className="exercise-image"
                                    key={index}
                                    src={`https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${image}`}
                                    alt={`${exercise.name} step ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </ul>
            <div className="pagination">
            {renderPaginationButtons()}
            </div>
        </div>
    );
};

export default Exercises;






