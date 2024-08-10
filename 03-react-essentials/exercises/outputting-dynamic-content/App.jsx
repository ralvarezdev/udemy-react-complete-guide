import React from 'react';

export const userData = {
    firstName: 'Ramón', // feel free to replace the name value
    lastName: 'Álvarez', // feel free to replace the name value
    title: 'Developer', // feel free to replace the title value
};

// Edit the User component code to output the userData data
export function User() {
    return (
        <div id="user" data-testid="user">
            <h2>
                {userData.firstName} {userData.lastName}
            </h2>
            <p>{userData.title}</p>
        </div>
    );
}

// DON'T edit the App component code
function App() {
    return (
        <div id="app">
            <h1>Time to Practice</h1>
            <p>Welcome on board of this course! You got this 💪</p>
            <User/>
        </div>
    );
}

export default App;
