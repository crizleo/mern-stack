import { Formik, Form } from "formik";
import { useTask } from "../context/TaskContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function TasksForm() {
  const { createTask, getTask, updateTask } = useTask();
  const params = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        const task = await getTask(params.id);
        console.log(task);
        setTask({ title: task.title, description: task.description });
      }
    };
    loadTask();
  }, []);

  return (
    <div>
      <Formik
        initialValues={task}
        enableReinitialize={true}
        onSubmit={async (values, actions) => {
          if (params.id) {
            updateTask(params.id, values);
          } else {
            createTask(values);
            actions.resetForm();
          }
          navigate("/");
        }}
      >
        {({ handleChange, handleSubmit, values, isSubmitting }) => (
          <Form
            onSubmit={handleSubmit}
            className="bg-slate-300 max-w-sm rounded-md p-4 mx-auto mt-10"
          >
            <h1 className="text-xl font-bold uppercase text-center">
              {params.id ? "Edit Task" : "Create Task"}
            </h1>
            <label className="block">title</label>
            <input
              className="px-2 py-1 rounded-sm w-full"
              type="text"
              name="title"
              id="title"
              placeholder="write a title"
              onChange={handleChange}
              value={values.title}
            />

            <label className="block">description</label>
            <textarea
              className="px-2 py-1 rounded-sm w-full"
              type="text"
              name="description"
              id="description"
              rows="3"
              placeholder="Write a descriptipo"
              onChange={handleChange}
              value={values.description}
            ></textarea>

            <button
              className="block bg-indigo-500 px-2 py-1 text-white w-full rounded-md"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving.." : "Save"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default TasksForm;
