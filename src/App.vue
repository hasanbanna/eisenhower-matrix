<template>
  <div id="app">
    <div class="grid-container">
      <div class="tasks">
        <task-list
          v-for="(category, index) in categories"
          :key="index"
          :title="category"
          :tasks="tasksByCategory[category]"
        >
        </task-list>
      </div>
      <div class="chart-wrapper">
        <EisenHowerMatrix
          v-if="chartData"
          :chart-data="chartData"
          @data-value-change="handleDataChange"
        />
      </div>
      <div class="inputs-wrapper">
        <textarea
          id="tasks-input-area"
          cols="30"
          rows="10"
          v-model="tasksTextInput"
          placeholder="Enter a list of tasks"
        ></textarea>
        <div class="button-wrapper">
          <button :disabled="!tasksTextInput.length" @click="handleAddTodo">
            add tasks
          </button>
          <clipboard-button
            @on-click="
              handleOnClipboardButtonClick('plainTextClipboardButton', 'plain')
            "
            @on-success="handleSuccessButton('plainTextClipboardButton')"
            v-bind="plainTextClipboardButtonProps"
          />
          <clipboard-button
            @on-click="
              handleOnClipboardButtonClick('orgClipboardButton', 'org')
            "
            @on-success="handleSuccessButton('orgClipboardButton')"
            v-bind="orgClipboardButtonProps"
          />
          <button @click="handleClear">clear tasks</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EisenHowerMatrix from "./components/EisenHowerMatrix.vue";
import TaskList from "./components/TaskList.vue";
import store from "./store.js";
import Vue from "vue";
import ClipboardButton from "./components/ClipboardButton.vue";
import { copyToClipboardAs } from "./utils";
export default {
  name: "App",
  components: {
    EisenHowerMatrix,
    TaskList,
    ClipboardButton,
  },
  data() {
    return {
      store: [],
      tasksTextInput: "",
    };
  },
  methods: {
    handleClear() {
      this.tasksTextInput = "";
      this.store.commit("syncTasksWithTextAreaInput", "");
      this.store.commit("updateAllButtonsState", "disabled");
    },
    handleAddTodo() {
      this.store.commit("syncTasksWithTextAreaInput", this.tasksTextInput);
      this.store.commit("updateAllButtonsState", "");
    },
    handleDataChange({ index, value }) {
      this.store.commit("updateTaskDataPoints", { index, value });
    },
    handleOnClipboardButtonClick(btn, format) {
      copyToClipboardAs(format, this.tasksByCategory);
      this.store.commit("updateButtonState", { btn, btnState: "success" });
    },
    handleSuccessButton(btn) {
      setTimeout(() => {
        this.store.commit("updateButtonState", { btn, btnState: "" });
      }, 750);
    },
  },
  mounted() {
    this.store = Vue.observable(store);
    this.store.commit("initTasks");
    this.tasksTextInput = this.store.tasks.map((todo) => todo.text).join("\n");
  },
  watch: {
    tasksTextInput(value) {
      if (value === "") {
        this.store.commit("syncTasksWithTextAreaInput", "");
        this.store.commit("updateAllButtonsState", "disabled");
      }
    },
  },
  computed: {
    categories() {
      return this.store.categories;
    },
    tasksByCategory() {
      if (this.store.tasksByCategory) {
        return this.store.tasksByCategory;
      }
      return {};
    },
    tasks() {
      return this.store.tasks;
    },
    chartData() {
      return this.store.chartData;
    },
    plainTextClipboardButtonProps() {
      return this.store.plainTextClipboardButton;
    },
    orgClipboardButtonProps() {
      return this.store.orgClipboardButton;
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");
* {
  font-family: Roboto, Avenir, Helvetica, Arial, sans-serif;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  font-size: 18px;
}
.grid-container {
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 20px;
  margin: 0 auto;
  width: 1060px;
}
.inputs-wrapper {
  display: grid;
  grid-column: span 2;
  grid-template-columns: 4fr 1fr;
  grid-gap: 20px;
}
.button-wrapper {
  display: grid;
  grid-gap: 20px;
}

.tasks {
  padding: 0px 20px;
  border: 1px solid #ddd;
  display: grid;
  border-radius: 3px;
}
.chart-wrapper {
  width: 700px;
}
#tasks-input-area {
  border-radius: 3px;
  border: 1px solid #ddd;
  padding: 20px;
  resize: none;
}
</style>
