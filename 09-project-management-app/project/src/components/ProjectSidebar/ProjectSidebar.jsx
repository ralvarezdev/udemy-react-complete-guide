import Button from "../Button/Button.jsx";

export default function ProjectSidebar({onStart, projects, onSelect, selectedProjectId}) {
    const selectClasses = "w-full text-left px-2 py-1 rounded-sm my-1 hover:text-stone-200 hover:bg-stone-800"

    return (
        <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
            <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">Your Projects</h2>
            <Button onClick={onStart}>+ Add Project</Button>
            <ul className="mt-8">

                {projects.map(project => {
                    const highlightClasses = selectedProjectId === project.id ? "bg-stone-800 text-stone-200" : " text-stone-400"

                    return (
                        <li key={project.id}>
                            <button className={[selectClasses, highlightClasses].join(" ")}
                                    onClick={() => onSelect(project.id)}>{project.title}
                            </button>
                        </li>)
                })}
            </ul>
        </aside>
    )
}