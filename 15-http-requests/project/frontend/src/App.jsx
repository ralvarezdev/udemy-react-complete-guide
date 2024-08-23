import {useCallback, useEffect, useRef, useState} from 'react';

import Places from './components/Places/Places.jsx';
import Modal from './components/Modal/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import AvailablePlaces from './components/AvailablePlaces/AvailablePlaces.jsx';
import {fetchUserPlaces, updateUserPlaces} from "./https.js";
import ErrorWarning from "./components/ErrorWarning/ErrorWarning.jsx";

function App() {
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(null);

    const selectedPlace = useRef();

    const [userPlaces, setUserPlaces] = useState([]);
    const [errorUpdatingPlaces, setErrorUpdatingPlaces] = useState(null);

    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        (async () => {
            setIsFetching(true)

            try {
                const responseJSON = await fetchUserPlaces()
                setUserPlaces(responseJSON.places)
            } catch (error) {
                setError({
                    message: error.message || "Failed to fetch user places, please try again later"
                })
            }
            setIsFetching(false)
        })()
    }, []);

    function handleStartRemovePlace(place) {
        setModalIsOpen(true);
        selectedPlace.current = place;
    }

    function handleStopRemovePlace() {
        setModalIsOpen(false);
    }

    function handleSelectPlace(selectedPlace) {
        setUserPlaces((prevPickedPlaces) => {
            if (!prevPickedPlaces)
                prevPickedPlaces = [];
            let pickedPlaces = prevPickedPlaces

            if (!prevPickedPlaces.some((place) => place.id === selectedPlace.id))
                pickedPlaces = [selectedPlace, ...prevPickedPlaces];

            (async () => {
                try {
                    await updateUserPlaces(pickedPlaces)
                } catch (error) {
                    setUserPlaces(prevPickedPlaces)
                    setErrorUpdatingPlaces({
                        message: error.message || "Failed to update user places, please try again later"
                    })
                }
            })()

            return pickedPlaces;
        })
    }

    const handleRemovePlace = useCallback(async function handleRemovePlace() {
        setUserPlaces((prevPickedPlaces) => {
            const pickedPlaces = prevPickedPlaces.filter((place) => place.id !== selectedPlace.current.id);

            (async () => {
                try {
                    await updateUserPlaces(pickedPlaces)
                } catch (error) {
                    setUserPlaces(prevPickedPlaces)
                    setErrorUpdatingPlaces({
                        message: error.message || "Failed to update user places, please try again later"
                    })
                }
            })()

            return pickedPlaces;
        });

        setModalIsOpen(false);
    }, []);

    const errorHandler = () => setErrorUpdatingPlaces(null)

    return (
        <>
            <Modal open={errorUpdatingPlaces} onClose={errorHandler}>
                {errorUpdatingPlaces && <ErrorWarning title="An error ocurred!" message={errorUpdatingPlaces.message}
                                                      onConfirm={errorHandler}/>}
            </Modal>

            <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
                <DeleteConfirmation
                    onCancel={handleStopRemovePlace}
                    onConfirm={handleRemovePlace}
                />
            </Modal>

            <header>
                <img src={logoImg} alt="Stylized globe"/>
                <h1>PlacePicker</h1>
                <p>
                    Create your personal collection of places you would like to visit or
                    you have visited.
                </p>
            </header>
            <main>
                {error === null ? (
                    <Places
                        title="I'd like to visit ..."
                        fallbackText="Select the places you would like to visit below."
                        isLoading={isFetching}
                        loadingText="Fetching your places..."
                        places={userPlaces}
                        onSelectPlace={handleStartRemovePlace}
                    />) : (
                    <ErrorWarning title="An error ocurred!" message={error.message}/>
                )}

                <AvailablePlaces onSelectPlace={handleSelectPlace}/>
            </main>
        </>
    );
}

export default App;
