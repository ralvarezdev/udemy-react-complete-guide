import {useCallback, useEffect, useRef, useState} from 'react';

import Places from './components/Places/Places.jsx';
import {AVAILABLE_PLACES} from './data.js';
import Modal from './components/Modal/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import {sortPlacesByDistance} from "./loc.js";

const selectedPlacesId = JSON.parse(localStorage.getItem('selectedPlacesId')) || [];
const selectedPlaces = AVAILABLE_PLACES.filter(place => selectedPlacesId.indexOf(place.id) !== -1);

function App() {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const selectedPlace = useRef();
    const [availablePlaces, setAvailablePlaces] = useState([]);
    const [pickedPlaces, setPickedPlaces] = useState(selectedPlaces);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const {latitude, longitude} = position.coords;
            const sortedPlaces = sortPlacesByDistance(AVAILABLE_PLACES, latitude, longitude)
            setAvailablePlaces(sortedPlaces)
        })
    }, []);

    function handleStartRemovePlace(id) {
        setModalIsOpen(true)
        selectedPlace.current = id;
    }

    function handleStopRemovePlace() {
        setModalIsOpen(false)
    }

    function handleSelectPlace(id) {
        setPickedPlaces((prevPickedPlaces) => {
            if (prevPickedPlaces.some((place) => place.id === id)) {
                return prevPickedPlaces;
            }
            const place = AVAILABLE_PLACES.find((place) => place.id === id);
            return [place, ...prevPickedPlaces];
        });

        const selectedPlacesId = JSON.parse(localStorage.getItem('selectedPlacesId')) || [];
        if (selectedPlacesId.indexOf(id) !== -1)
            return;

        localStorage.setItem('selectedPlacesId', JSON.stringify([id, ...selectedPlacesId]))
    }

    const handleRemovePlace = useCallback(function () {
        setPickedPlaces((prevPickedPlaces) =>
            prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
        );
        setModalIsOpen(false)

        const selectedPlacesId = JSON.parse(localStorage.getItem('selectedPlacesId')) || [];
        localStorage.setItem('selectedPlacesId', JSON.stringify(selectedPlacesId.filter(id => id !== selectedPlace.current)))
    }, [])

    return (
        <>
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
                <Places
                    title="I'd like to visit ..."
                    fallbackText={'Select the places you would like to visit below.'}
                    places={pickedPlaces}
                    onSelectPlace={handleStartRemovePlace}
                />
                <Places
                    title="Available Places"
                    places={availablePlaces}
                    fallbackText="Sorting place by distance..."
                    onSelectPlace={handleSelectPlace}
                />
            </main>
        </>
    );
}

export default App;
