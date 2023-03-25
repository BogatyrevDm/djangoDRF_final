import React from 'react'

class ToDoForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { text: '', project: props.projects[0].id, user: props.users[0].id, active: false }
    }

    handleChange(event) {
        let value = event.target.value
        if (event.target.name === "active") {
            value = event.target.checked
        }

        this.setState(
            {
                [event.target.name]: value
            }
        );
    }

    handleSubmit(event) {
        this.props.createToDo(this.state.text, this.state.project, this.state.user, this.state.active)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label for="text">text</label>
                    <input type="text" className="form-control" name="text"
                        value={this.state.text} onChange={(event) => this.handleChange(event)} />
                </div>
                <div className="form-group">
                    <label for="project">project</label>
                    <select name="project" className='form-control'
                        onChange={(event) => this.handleChange(event)}>
                        {this.props.projects.map((item) =>
                            <option
                                value={item.id}>{item.name}
                            </option>)}
                    </select>
                </div>

                <div className="form-group">
                    <label for="user">user</label>
                    <select name="user" className='form-control'
                        onChange={(event) => this.handleChange(event)}>
                        {this.props.users.map((item) =>
                            <option
                                value={item.id}>{item.name}
                            </option>)
                        }
                    </select>
                </div>

                <div className="form-group"><label for="active">active</label>
                    <input type="checkbox" className="form-control" name="active"
                        value={this.state.active} onChange={(event) => this.handleChange(event)} />
                </div>
                <input type="submit" className="btn btn-primary" value="Save" />
            </form>
        );
    }
}
export default ToDoForm