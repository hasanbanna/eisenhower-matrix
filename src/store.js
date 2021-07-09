import { groupBy } from "./utils";

const CATEGORIES = ["Do", "Decide", "Delegate", "Delete"];
function setCategory({ x, y }) {
  if (x < 0.5 && y < 0.5) {
    return CATEGORIES[3];
  } else if ((x > 0.5) & (y < 0.5)) {
    return CATEGORIES[2];
  } else if ((x < 0.5) & (y > 0.5)) {
    return CATEGORIES[1];
  } else if ((x > 0.5) & (y > 0.5)) {
    return CATEGORIES[0];
  }
}
export default {
  state: {
    tasks: [],
    categories: CATEGORIES,
    previousTextAreaInput: [],
    plainTextClipboardButton: {
      text: "copy as plain text",
      state: "disabled",
    },
    orgClipboardButton: {
      text: "copy as org",
      state: "disabled",
    },
  },
  get sortedtasks() {
    const copytasks = [...this.state.tasks];
    return copytasks.sort(
      (a, b) =>
        b.dataPoints.x + b.dataPoints.y - (a.dataPoints.x + a.dataPoints.y)
    );
  },
  get tasksByCategory() {
    return groupBy(this.sortedtasks, "category");
  },
  get tasks() {
    return this.state.tasks;
  },
  get chartData() {
    return {
      labels: this.state.tasks.map((task) => task.text),
      datasets: [
        {
          backgroundColor: "rgba(100, 100, 100, 0.9)",
          color: "white",
          borderColor: "black",
          pointRadius: 10,
          pointHoverRadius: 10,
          borderWidth: 0,
          radius: 4,
          hoverRadius: 5,
          data: this.state.tasks.map((task) => task.dataPoints),
        },
      ],
    };
  },
  get categories() {
    return this.state.categories;
  },
  get plainTextClipboardButton() {
    return this.state.plainTextClipboardButton;
  },
  get orgClipboardButton() {
    return this.state.orgClipboardButton;
  },
  commit(mutation, params = {}) {
    this.state = this.mutations[mutation](this.state, params);
  },
  mutations: {
    initTasks(state) {
      return {
        ...state,
        tasks: state.tasks.map((task) => ({
          ...task,
          category: setCategory(task.dataPoints),
        })),
      };
    },
    syncTasksWithTextAreaInput(state, textAreaInput) {
      if (textAreaInput === "") {
        return {
          ...state,
          tasks: [],
        };
      }
      const tasksFromInputTextArea = textAreaInput.split("\n");
      if (!state.tasks.length) {
        const taskTemp = [];
        tasksFromInputTextArea.forEach((text) => {
          taskTemp.push({
            text,
            dataPoints: {
              x: Math.random(),
              y: Math.random(),
            },
          });
        });
        return {
          ...state,
          tasks: taskTemp.map((task) => ({
            ...task,
            category: setCategory(task.dataPoints),
          })),
        };
      }
      if (state.tasks.length < tasksFromInputTextArea.length) {
        const tasksText = state.tasks.map((task) => task.text);
        const newtasks = tasksFromInputTextArea.filter(
          (task) => !tasksText.includes(task)
        );
        const tasksCopy = [...state.tasks];
        newtasks.forEach((text) => {
          tasksCopy.push({
            text,
            dataPoints: {
              x: Math.random(),
              y: Math.random(),
            },
          });
        });
        return {
          ...state,
          tasks: tasksCopy.map((task) => ({
            ...task,
            category: setCategory(task.dataPoints),
          })),
        };
      }
      return {
        ...state,
        tasks: state.tasks
          .map((task, index) => ({
            ...task,
            text: tasksFromInputTextArea[index],
          }))
          .slice(0, tasksFromInputTextArea.length),
      };
    },
    updateTaskDataPoints(state, { index, value }) {
      const tasksCopy = [...state.tasks];
      tasksCopy[index].dataPoints.x = value.x;
      tasksCopy[index].dataPoints.y = value.y;
      return {
        ...state,
        tasks: tasksCopy.map((task) => ({
          ...task,
          category: setCategory(task.dataPoints),
        })),
      };
    },
    updateAllButtonsState(state, btnState) {
      return {
        ...state,
        plainTextClipboardButton: {
          ...state.plainTextClipboardButton,
          state: btnState,
        },
        orgClipboardButton: {
          ...state.orgClipboardButton,
          state: btnState,
        },
      };
    },
    updateButtonState(state, { btn, btnState }) {
      return {
        ...state,
        [btn]: {
          ...state[btn],
          state: btnState,
        },
      };
    },
  },
};
