// Import necessary modules and components
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

// Define the TaskManager component
const TaskManager = () => {
  const dispatch = useDispatch(); // Access the dispatch function for Redux actions
  const tasks = useSelector((state) => state.tasks); // Access tasks from Redux state

  // Local state variables for task management
  const [taskTitle, setTaskTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [filter, setFilter] = useState("All");
  const [deadline, setDeadline] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskTitle, setEditingTaskTitle] = useState("");
  const [editingTaskPriority, setEditingTaskPriority] = useState("Medium");

  // Timer to automatically mark tasks as completed if deadlines pass
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      tasks.forEach((task) => {
        if (task.deadline && now >= task.deadline && !task.completed) {
          dispatch({ type: "TOGGLE_TASK", payload: task.id });
          toast.info(`Task "${task.title}" marked as complete by deadline.`);
        }
      });
    }, 1000); // Check every second

    return () => clearInterval(timer); // Cleanup timer on component unmount
  }, [tasks, dispatch]);

  // Add a new task
  const handleAddTask = () => {
    if (!taskTitle.trim()) {
      toast.error("Task title cannot be empty!");
      return;
    }
    const newTask = {
      id: Date.now(), // Generate unique ID
      title: taskTitle,
      priority,
      completed: false,
      deadline: deadline ? new Date(deadline).getTime() : null, // Convert deadline to timestamp
    };
    dispatch({ type: "ADD_TASK", payload: newTask }); // Dispatch add task action
    toast.success("Task added successfully!"); // Show success notification
    setTaskTitle(""); // Reset input fields
    setDeadline("");
  };

  // Delete a task
  const handleDeleteTask = (id) => {
    dispatch({ type: "DELETE_TASK", payload: id }); // Dispatch delete task action
    toast.info("Task deleted successfully!");
  };

  // Toggle task completion
  const handleToggleTask = (id) => {
    dispatch({ type: "TOGGLE_TASK", payload: id }); // Dispatch toggle task action
  };

  // Edit an existing task
  const handleEditTask = (id, title, priority) => {
    setEditingTaskId(id); // Set task being edited
    setEditingTaskTitle(title);
    setEditingTaskPriority(priority);
  };

  // Save task after editing
  const handleSaveEdit = (id) => {
    dispatch({
      type: "EDIT_TASK",
      payload: { id, title: editingTaskTitle, priority: editingTaskPriority },
    });
    toast.success("Task updated successfully!");
    setEditingTaskId(null); // Reset editing state
    setEditingTaskTitle("");
    setEditingTaskPriority("Medium");
  };

  // Filter and sort tasks based on completion and selected filter
  const filteredTasks = (
    filter === "All" ? tasks : tasks.filter((task) => task.priority === filter)
  ).sort((a, b) => a.completed - b.completed);

  return (
    <Box
      sx={{
        padding: 4,
        maxWidth: "800px",
        margin: "auto",
        backgroundColor: "#f9f9f9",
        borderRadius: 4,
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Header */}
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Typography
          variant="h4"
          gutterBottom
          textAlign="center"
          sx={{
            fontWeight: "bold",
            color: "#1976d2",
            letterSpacing: "2px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            padding: "10px 20px",
            borderRadius: "8px",
            backgroundColor: "#f5f5f5",
            display: "inline-block",
          }}
        >
          Task Manager
        </Typography>
      </Box>

      {/* Input fields for adding tasks */}
      <Box sx={{ display: "flex", gap: 2, marginBottom: 3 }}>
        <TextField
          label="Task Title"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          fullWidth
        />
        <Select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          displayEmpty
        >
          <MenuItem value="High">High</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="Low">Low</MenuItem>
        </Select>
        <Button variant="contained" color="primary" onClick={handleAddTask}>
          Add Task
        </Button>
      </Box>

      {/* Filter buttons */}
      <Box
        sx={{
          display: "flex",
          gap: 1,
          justifyContent: "center",
          marginBottom: 3,
        }}
      >
        <Button
          variant="outlined"
          onClick={() => setFilter("All")}
          color={filter === "All" ? "primary" : "default"}
        >
          All
        </Button>
        <Button
          variant="outlined"
          onClick={() => setFilter("High")}
          color={filter === "High" ? "primary" : "default"}
        >
          High
        </Button>
        <Button
          variant="outlined"
          onClick={() => setFilter("Medium")}
          color={filter === "Medium" ? "primary" : "default"}
        >
          Medium
        </Button>
        <Button
          variant="outlined"
          onClick={() => setFilter("Low")}
          color={filter === "Low" ? "primary" : "default"}
        >
          Low
        </Button>
      </Box>

      {/* Display tasks */}
      <Grid container spacing={2}>
        <AnimatePresence>
          {filteredTasks.map((task, index) => (
            <Grid item xs={12} key={task.id}>
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  backgroundColor: task.completed ? "#e0f7fa" : "white",
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
              >
                <Card
                  sx={{
                    padding: 2,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "160px",
                    borderLeft: task.completed
                      ? "4px solid #00796b"
                      : "4px solid #f44336",
                  }}
                >
                  <CardContent>
                    {/* Editing mode */}
                    {editingTaskId === task.id ? (
                      <Box sx={{ display: "flex", gap: 2 }}>
                        <TextField
                          value={editingTaskTitle}
                          onChange={(e) => setEditingTaskTitle(e.target.value)}
                          fullWidth
                        />
                        <Select
                          value={editingTaskPriority}
                          onChange={(e) =>
                            setEditingTaskPriority(e.target.value)
                          }
                          displayEmpty
                        >
                          <MenuItem value="High">High</MenuItem>
                          <MenuItem value="Medium">Medium</MenuItem>
                          <MenuItem value="Low">Low</MenuItem>
                        </Select>
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => handleSaveEdit(task.id)}
                        >
                          Save
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => setEditingTaskId(null)}
                        >
                          Cancel
                        </Button>
                      </Box>
                    ) : (
                      // Task display
                      <Tooltip title={task.title} arrow>
                        <Typography
                          noWrap
                          sx={{
                            cursor: "pointer",
                            color: task.completed ? "#004d40" : "#000",
                            textDecoration: task.completed
                              ? "line-through"
                              : "none",
                            fontWeight: task.completed ? "bold" : "normal",
                          }}
                          onClick={() => handleToggleTask(task.id)}
                        >
                          {index + 1}. {task.title} ({task.priority})
                        </Typography>
                      </Tooltip>
                    )}
                    {task.deadline && (
                      <Typography
                        sx={{
                          color: "#f57c00",
                          fontSize: "0.9rem",
                          fontStyle: "italic",
                        }}
                      >
                        Deadline: {new Date(task.deadline).toLocaleString()}
                      </Typography>
                    )}
                    <Typography
                      sx={{
                        color: task.completed ? "#00796b" : "#f44336",
                        fontSize: "0.9rem",
                        fontStyle: "italic",
                      }}
                    >
                      {task.completed ? "✅ Complete" : "⏳ Incomplete"}
                    </Typography>
                  </CardContent>
                  <Box
                    sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}
                  >
                    <IconButton
                      color="primary"
                      onClick={() =>
                        handleEditTask(task.id, task.title, task.priority)
                      }
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </AnimatePresence>
      </Grid>
    </Box>
  );
};

export default TaskManager;
