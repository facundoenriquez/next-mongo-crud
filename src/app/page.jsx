import { connectDB } from "@/utils/mongoose"
import Task from "@/models/Task"
import TaskCard from "./components/taskCard"

async function loadTasks() {
    connectDB()
    const data = await Task.find()
    return data
}

const HomePage = async () => {
    const tasks = await loadTasks()
    return (
        <div className="grid grid-cols-3 gap-2">
            {tasks.map(task => (
                <TaskCard task={task} key={task._id} />
            ))}
        </div>
    )
}
export default HomePage