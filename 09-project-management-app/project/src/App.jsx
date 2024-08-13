import ProjectSidebar from "./components/ProjectSidebar/ProjectSidebar.jsx";
import NewProject from "./components/NewProject/NewProject.jsx";
import NoProjectSelected from "./components/NoProjectSelected/NoProjectSelected.jsx";
import {useState} from "react";
import SelectedProject from "./components/SelectedProject/SelectedProject.jsx";

function App() {
    const [projects, setProjects] = useState({selectedProjectId: undefined, projects: [], tasks: []});

    const projectOnStart = () => setProjects(prevProjects => (
        {...prevProjects, selectedProjectId: null}));

    const projectOnAdd = projectData => {
        const newProject = {
            title: projectData.title,
            description: projectData.description,
            dueDate: projectData.dueDate,
            id: Math.random()
        }

        setProjects(prevProjects => (
            {
                ...prevProjects,
                selectedProjectId: undefined,
                projects: [...prevProjects.projects, newProject]
            }));
    }

    const projectOnCancel = () =>
        setProjects(prevProjects => (
            {...prevProjects, selectedProjectId: undefined}))

    const projectOnSelect = id =>
        setProjects(prevProjects => (
            {...prevProjects, selectedProjectId: id}))

    const projectOnDelete = () =>
        setProjects(prevProjects => (
            {
                ...prevProjects,
                selectedProjectId: undefined,
                projects: prevProjects.projects.filter(p => p.id !== prevProjects.selectedProjectId)
            }))

    const taskOnAdd = text => setProjects(prevProjects => {
        const newTask = {
            text: text,
            id: Math.random(),
            projectId: prevProjects.selectedProjectId
        }

        return ({
            ...prevProjects,
            tasks: [...prevProjects.tasks, newTask]
        })
    });

    const taskOnDelete = id => setProjects(prevProjects => (
        {...prevProjects, tasks: prevProjects.tasks.filter(t => t.id !== id)}))

    let content

    if (projects.selectedProjectId === null)
        content = (<NewProject onAdd={projectOnAdd} onCancel={projectOnCancel}/>)

    else if (projects.selectedProjectId === undefined)
        content = (<NoProjectSelected onStart={projectOnStart}/>)

    else {
        const selectedProject = projects.projects.find(p => p.id === projects.selectedProjectId)
        const selectedProjectTasks = projects.tasks.filter(t => t.projectId === projects.selectedProjectId)

        content = (
            <SelectedProject project={selectedProject} tasks={selectedProjectTasks} projectOnDelete={projectOnDelete}
                             taskOnAdd={taskOnAdd} taskOnDelete={taskOnDelete}></SelectedProject>)
    }

    return (
        <main className="h-screen my-8 flex gap-8">
            <ProjectSidebar onStart={projectOnStart} onSelect={projectOnSelect} projects={projects.projects}
                            selectedProjectId={projects.selectedProjectId}/>
            {content}
        </main>
    );
}

export default App;
