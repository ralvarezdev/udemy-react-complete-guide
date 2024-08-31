import './App.css'
import ToDos from "./components/ToDos/ToDos.tsx";
import NewToDo from "./components/NewToDos/NewToDo.tsx";
import {TodosContextProvider} from "./store/todos-context.tsx";

function App() {
    return (
        <TodosContextProvider>
            <NewToDo/>
            <ToDos/>
        </TodosContextProvider>
    )
}

export default App
