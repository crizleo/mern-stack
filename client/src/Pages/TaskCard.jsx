import { useTask } from "../context/TaskContext.jsx";
import { useNavigate } from "react-router-dom";

function TaskCard({ task, id }) {
  const { deleteTask, updateTask } = useTask();
  const navigate = useNavigate();

  const handleDone = (task) => {
    console.log("cambiando de estado");
    updateTask(task.id, { done: !task.done });
    task.done = !task.done;
  };

  return (
    <div key={id} className="bg-zinc-600 text-white rounded-md p-4">
      <header className="flex justify-between">
        <h2 className="text-sm font-bold">{task.title}</h2>
        <span>{task.done ? "✅" : "❌"}</span>
      </header>

      <p className="text-xs">{task.description}</p>

      <span>{task.createAt}</span>
      <div className="flex gap-x-2">
        <button
          className="bg-red-500 px-2 py-1 text-white"
          onClick={() => deleteTask(task.id)}
        >
          Delete
        </button>
        <button
          className="bg-slate-500 px-2 py-1 text-white"
          onClick={() => navigate(`/edit/${task.id}`)}
        >
          Edit
        </button>
        <button
          className="bg-green-500 px-2 py-1 text-white"
          onClick={() => handleDone(task)}
        >
          toggle task
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
