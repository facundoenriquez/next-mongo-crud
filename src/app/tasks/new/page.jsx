"use client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react"

const FormPage = () => {

    const [newTask, setNewTask] = useState({
        title: "",
        description: ""
    })

    const params = useParams()
    const router = useRouter()

    useEffect(() => {
        if (params.id) {
            getTask()
        }
    }, [])


    const getTask = async () => {
        try {
            const { data } = await axios.get(`/api/tasks/${params.id}`)
            setNewTask({
                title: data.title,
                description: data.description
            })
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (e) =>
        setNewTask({
            ...newTask,
            [e.target.name]: e.target.value
        })

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!params.id) {
            try {
                await axios.post(`/api/tasks`)
                router.push('/')
                router.refresh()
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                await axios.put(`/api/tasks/${params.id}`, newTask)
                router.push('/')
                router.refresh()
            } catch (error) {
                console.log(error)
            }
        }
    }

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            try {
                await axios.delete(`/api/tasks/${params.id}`)
                router.push("/");
                router.refresh();
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div className="min-h-[calc(100vh-7rem)] flex justify-center items-center">
            <form onSubmit={handleSubmit}>
                <header className="flex justify-between">
                    <h1 className="font-bold text-3xl">
                        {!params.id ? "Create Task" : "Update task"}
                    </h1>
                    {params.id && (
                        <button
                            className="bg-red-500 px-3 py-1 rounded-md"
                            onClick={handleDelete}
                        >
                            Delete
                        </button>
                    )}
                </header>
                <input
                    type="text"
                    placeholder="Task title"
                    name="title"
                    onChange={handleChange}
                    value={newTask.title}
                    autoFocus
                    className="bg-gray-800 border-2 w-full p-4 rounded-lg my-4"
                />

                <textarea
                    name="description"
                    placeholder="Task description"
                    onChange={handleChange}
                    value={newTask.description}
                    className="bg-gray-800 border-2 w-full p-4 rounded-lg my-4"
                    rows={3}
                ></textarea>

                <button className="bg-green-600 text-white font-semibold px-8 py-2 rounded-lg">
                    {params.id ? "Update" : "Save"}
                </button>
            </form>
        </div>
    )
}
export default FormPage