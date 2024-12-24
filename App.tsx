import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import TaskCard from "./component/taskCard.tsx";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaCalendarAlt } from "react-icons/fa";

interface Task {
  id: string;
  task: string;
  completed: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskCount, setTaskCount] = useState(0);
  const [isToggled, setIsToggled] = useState(false);
  // const [selectedTask, setSelectedTask] = useState<string>("");
  const [isAddTaskFormVisible, setisAddTaskFormVisible] = useState(false);

  const handleAddTaskClick = () => {
    setisAddTaskFormVisible(!isAddTaskFormVisible);
  };

  const handleCancelForm = () => {
    setisAddTaskFormVisible(false);
  };

  const handleToggle = (taskId: string): void => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };
  const handleAddTask = (task: string, id: string) => {
    const newTask: Task = {
      id,
      task,
      completed: false,
    };

    setIsToggled(false);
    setTaskCount(taskCount + 1);
    setisAddTaskFormVisible(false);
    setTasks((prevTasks) => [...prevTasks, newTask]);
    console.log("Task: ", newTask);
  };

  const handleDelete = (taskToDelete: Task) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task !== taskToDelete));
    setTaskCount(taskCount - 1);
  };

  return (
    <>
      <div className="mainHeading">
        <div className="MainText">
          <h1>
            <FaCalendarAlt /> My to-do List
          </h1>
          <p>You have {taskCount} tasks </p>
        </div>
        <div>
          <button className="AddTaskButton" onClick={handleAddTaskClick}>
            <IoMdAddCircleOutline /> Add Task
          </button>
        </div>
      </div>
      {isAddTaskFormVisible ? (
        <TaskCard
          onAddTask={handleAddTask}
          onCancelFormSubmission={handleCancelForm}
        />
      ) : null}

      <div className="mainList">
        <ul className="listContainer">
          {tasks.map((task, index) => (
            <li key={index} className="listItem">
              <a>Task no. {index}</a>
              <p className="to-do">To do: </p>
              <p>{task.task}</p>
              <button
                onClick={() => handleToggle(task.id)}
                className={
                  task.completed ? "Status_buttons_is_active" : "Status_buttons"
                }
              >
                Completed
              </button>
              <button
                className="Status_buttons_delete"
                onClick={() => handleDelete(task)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
