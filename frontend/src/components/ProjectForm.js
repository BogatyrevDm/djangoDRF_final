import React from 'react'

class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { name: '', url: '' }
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleSubmit(event) {
        console.log(this.state.name)
        console.log(this.state.url)
        this.props.createProject(this.state.name, this.state.url)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label for="login">name</label>
                    <input type="text" className="form-control" name="name"
                        value={this.state.name} onChange={(event) => this.handleChange(event)} />
                </div>
                <div className="form-group"><label for="url">url</label>
                    <input type="url" className="form-control" name="url"
                        value={this.state.url} onChange={(event) => this.handleChange(event)} />
                </div>
                <input type="submit" className="btn btn-primary" value="Save" />
            </form>
        );
    }
}
export default ProjectForm