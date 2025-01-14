// Initial state for the reducer
const initialState = {
  tasks: JSON.parse(localStorage.getItem("tasks")) || [], // Load tasks from localStorage or initialize as an empty array
};

// Reducer function to handle task-related actions
const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    // Add a new task
    case "ADD_TASK":
      return {
        ...state, // Preserve existing state
        tasks: [...state.tasks, action.payload], // Add the new task to the tasks array
      };

    // Delete a task by ID
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload), // Remove the task with the matching ID
      };

    // Toggle the completion status of a task
    case "TOGGLE_TASK":
      return {
        ...state,
        tasks: state.tasks.map(
          (task) =>
            task.id === action.payload
              ? { ...task, completed: !task.completed } // Toggle the completed flag
              : task // Leave other tasks unchanged
        ),
      };

    // Edit an existing task (update title and priority)
    case "EDIT_TASK":
      return {
        ...state,
        tasks: state.tasks.map(
          (task) =>
            task.id === action.payload.id
              ? {
                  ...task,
                  title: action.payload.title, // Update task title
                  priority: action.payload.priority, // Update task priority
                }
              : task // Leave other tasks unchanged
        ),
      };

    // Default case: return current state if action type is unrecognized
    default:
      return state;
  }
};

export default taskReducer;
