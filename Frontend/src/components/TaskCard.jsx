function TaskCard({ task }) {
  return (
    <div className="task-card">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Status: {task.completed ? "Completed" : "Pending"}</p>
    </div>
  );
}
export default TaskCard;