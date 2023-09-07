import { useState } from "react";
import styles from "../styles/Task.module.css";

const AddTask = ({ onAdd }) => {
  const [text, setText] = useState("");
  const [day, setDay] = useState("");
  const [reminder, setReminder] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!text) {
      alert("Please add task");
      return;
    }
    onAdd({ text, day, reminder });

    setDay("");
    setReminder(false);
    setText("");
  };

  return (
    <form className={`${styles.add_form}`} onSubmit={onSubmit}>
      <div className={styles.form_control}>
        <label>Task</label>
        <input
          type="text"
          placeholder="Add Taks"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className={`${styles.form_control} ${styles.form_control_check}`}>
        <label>Day and Time</label>
        <input
          type="text"
          placeholder="Add Day and Time"
          value={day}
          onChange={(e) => setDay(e.target.value)}
        ></input>
      </div>
      <div className={styles.form_control}>
        <label>Set Reminder</label>
        <input
          type="checkbox"
          checked={reminder}
          value={reminder}
          onChange={(e) => setReminder(e.currentTarget.checked)}
        ></input>
      </div>

      <input
        type="submit"
        value="Save Task"
        className={`${styles.btn} ${styles.btn_block}`}
      ></input>
    </form>
  );
};

export default AddTask;
