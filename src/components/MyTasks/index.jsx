import './index.css'
import { Component } from 'react'
import { v4 as uuidv4 } from 'uuid'

class MyTasks extends Component {
  defaultTag = 'HEALTH'

  constructor(props) {
    super(props)
    this.state = {
      tagsList: props.tagsList.map((each) => {
        const id = uuidv4()
        const { optionId, displayText } = each
        return { id, optionId, displayText, isActive: false }
      }),
      taskList: [],
      task: '',
      tag: this.defaultTag,
    }
  }

  handleAddTask = (event) => {
    event.preventDefault()
    const { task, tagsList, tag } = this.state
    const matchingTag = tagsList.find(
      (each) => each.optionId === tag
    ).displayText
    const id = uuidv4()

    this.setState((prevState) => ({
      task: '',
      tag: this.defaultTag,
      taskList: [...prevState.taskList, { task, tag: matchingTag, id }],
    }))
  }

  handleChangeTask = (event) => {
    this.setState({ task: event.target.value })
  }

  handleChangeTag = (event) => {
    this.setState({ tag: event.target.value })
  }

  handleFilter = (event) => {
    const selectedTag = event.target.value
    this.setState((prevState) => {
      const tagToUpdate = prevState.tagsList.find(
        (tag) => tag.displayText === selectedTag
      )
      if (tagToUpdate) {
        return {
          tagsList: prevState.tagsList.map((tag) =>
            tag.displayText === selectedTag
              ? { ...tag, isActive: !tag.isActive }
              : tag
          ),
        }
      }
    })
  }

  renderTaskList = () => {
    const { taskList, tagsList } = this.state
    const selectedTags = tagsList
      .filter((each) => each.isActive === true)
      .map((each) => each.displayText)

    let filteredTaskList
    if (selectedTags.length === 0) {
      filteredTaskList = taskList
    } else {
      filteredTaskList = taskList.filter((taskObj) =>
        selectedTags.some((tag) => taskObj.tag.includes(tag))
      )
    }

    return filteredTaskList.map((each) => {
      const { id, tag, task } = each
      return (
        <li key={id}>
          <p>{task}</p>
          <button type="button">{tag}</button>
        </li>
      )
    })
  }

  render() {
    const { tagsList, taskList, task, tag } = this.state
    return (
      <div className="main-container">
        <form id="task-form" onSubmit={this.handleAddTask}>
          <h1>Create a Task!</h1>
          <div>
            <label htmlFor="Task">Task</label>
            <input
              type="input"
              placeholder="Enter the task here"
              id="Task"
              onChange={this.handleChangeTask}
              value={task}
            />
          </div>
          <div>
            <label htmlFor="Tags">Tags</label>
            <select
              name="Tags"
              id="Tags"
              value={tag}
              onChange={this.handleChangeTag}
            >
              {tagsList.map((each) => {
                const { optionId, displayText } = each

                return (
                  <option key={optionId} value={optionId}>
                    {displayText}
                  </option>
                )
              })}
            </select>
          </div>
          <div>
            <button type="submit">Add Task</button>
          </div>
        </form>
        <div>
          <div>
            <h1>Tags</h1>
            <ul id="tagsSelector">
              {tagsList.map((each) => {
                const { displayText } = each
                const id = uuidv4()
                return (
                  <li key={id}>
                    <button
                      value={displayText}
                      onClick={this.handleFilter}
                      type="button"
                    >
                      {displayText}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
          <div>
            <h1>Tasks</h1>
            <ul id="taskList">
              {taskList.length === 0 ? (
                <p>No Tasks Added yet</p>
              ) : (
                this.renderTaskList()
              )}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MyTasks
