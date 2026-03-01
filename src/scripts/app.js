class ToDo {
  selectors = {
    root: "[data-js-todo]",
    newTaskForm: "[data-js-todo-new-task-form]",
    newTaskInput: "[data-js-todo-new-task-input]",
    searchTaskForm: "[data-js-todo-search-task-form]",
    searchTaskInput: "[data-js-todo-search-task-input]",
    totalTasks: "[data-js-todo-total-tasks]",
    deleteAllButton: "[data-js-todo-delete-all-button]",
    todoList: "[data-js-todo-list]",
    todoItem: "[data-js-todo-item]",
    itemCheckbox: "[data-js-todo-item-checkbox]",
    itemLabel: "[data-js-todo-item-label]",
    itemDeleteButton: "[data-js-todo-item-delete-button]",
    emptyMessage: "[data-js-todo-empty-message]"
  }

  stateClasses = {
    isVisible: "is-visible",
    isDisappearing: "is-disappearing"
  }

  localStorageKey = "todo-items"

  constructor() {
    this.rootElement = document.querySelector(this.selectors.root)
    this.newTaskFormElement = this.rootElement.querySelector(this.selectors.newTaskForm)
    this.newTaskInputElement = this.rootElement.querySelector(this.selectors.newTaskInput)
    this.searchTaskFormElement = this.rootElement.querySelector(this.selectors.searchTaskForm)
    this.searchTaskInput = this.rootElement.querySelector(this.selectors.searchTaskInput)
    this.totalTasksElement = this.rootElement.querySelector(this.selectors.totalTasks)
    this.deleteAllButtonElement = this.rootElement.querySelector(this.selectors.deleteAllButton)
    this.listElement = this.rootElement.querySelector(this.selectors.todoList)
    this.emptyMessageElement = this.rootElement.querySelector(this.selectors.emptyMessage)
    this.state = {
      items: this.getItemsFromLocalStorage(),
      filteredItems: null,
      searchQuery: ""
    }
    this.render()
  }

  getItemsFromLocalStorage() {
    const rawData = localStorage.getItem(this.localStorageKey)

    if(!rawData) return []

    try {
      const parsedData = JSON.parse(rawData)

      return Array.isArray(parsedData) ? parsedData : []
    } catch {
      console.error("Todo items parse error")
      return []
    }
  }

  saveItemsToLocalStorage() {
    localStorage.setItem(this.localStorageKey. JSON.stringify(this.state.items))
  }

  render() {
    this.totalTasksElement.textContent = this.state.items.length

    this.deleteAllButtonElement.classList.toggle(this.stateClasses.isVisible, this.state.items.length > 0)

    const items = this.state.filteredItems ?? this.state.items

    this.listElement.innerHTML = items.map(({id, title, isChecked}) => `
      <li class="todo__item todo-item" data-js-todo-item>
        <input class="todo-item__checkbox" id="${id}" type="checkbox" ${isChecked ? "checked" : ""} data-js-todo-item-checkbox>
        <label class="todo-item__label" for="${id}" data-js-todo-item-label>${title}</label>
        <button class="todo-item__delete-button" type="button" aria-label="Delete" title="Delete" data-js-todo-item-delete-button>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 5L5 15M5 5L15 15" stroke="#757575" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </li>
    `).join("")

    const isEmptyFilteredItems = this.state.filteredItems?.length === 0
    const isEmptyItems = this.state.items.length === 0

    this.emptyMessageElement.textContent = isEmptyFilteredItems ? "Task not found" : isEmptyItems ? "There are no tasks yet" : ""
  }

  addItem(title) {
    this.state.items.push({
      id: crypto?.randomUUID() ?? Date.now().toString(),
      title,
      isChecked: false
    })
    this.saveItemsToLocalStorage()
    this.render()
  }

  deleteItem(id) {
    this.state.items = this.state.items.filter((item) => item.id !== id)
    this.saveItemsToLocalStorage()
    this.render()
  }

  toggleCheckedState() {
    this.state.items = this.state.items.map((item) => {
      if(item.id === id) {
        return {...item, isChecked: !item.isChecked}
      }

      return item
    })
    this.saveItemsToLocalStorage()
    this.render()
  }
}