import Header from "./Header";
import Tasks from "./Tasks";
import AddTask from "./AddTask";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "../styles/Task.module.css";
import axios from "axios";
import { useMutation, useQuery } from "react-query";

const fetchTasks = async (values) => {
  return await axios.get(`http://localhost:8080/api/tasks?q=${values.email}`);
};

function TaskComponent() {
  const location = useLocation();
  const values = location.state;
  console.log(values);
  const [showAddTask, setShowAddTask] = useState(false);

  const { data, isLoading } = useQuery("tasks", () => fetchTasks(values));

  console.log(data?.data);

  const mutation = useMutation({
    mutationFn: (newTask) => {
      return axios.post("http://localhost:8080/api/register-tasks", newTask);
    },
  });

  if (mutation.isLoading || isLoading) {
    return <h1>Loading...</h1>;
  }
  //add task
  const addTask = (task) => {
    const { email } = values;
    const id = Math.floor(Math.random() * 10000) + 1;
    const newTask = { id, ...task, email };
    // setTasks([...tasks, newTask]);
    mutation.mutate(newTask);
  };

  //delete task
  // const deleteTask = (id) => {
  //   setTasks(tasks.filter((task) => task.id !== id));
  // };

  //toggle reminder
  // const toggleReminder = (id) => {
  //   setTasks(
  //     tasks.map((task) =>
  //       task.id === id ? { ...task, reminder: !task.reminder } : task
  //     )
  //   );
  // };

  return (
    <div className={styles.container}>
      <Header
        showAdd={showAddTask}
        onAdd={() => setShowAddTask(!showAddTask)}
      />

      {showAddTask && <AddTask onAdd={addTask} />}

      {data?.data.length > 0 ? (
        <Tasks
          tasks={data?.data}
          // onToggle={toggleReminder}
          // onDelete={deleteTask}
        />
      ) : (
        "No Tasks To Show."
      )}
    </div>
  );
}

// class App extends React.Component{
//   render(){
//     return <h1>Hello from a class.</h1>
//   }
// }

export default TaskComponent;
