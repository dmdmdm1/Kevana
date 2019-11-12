import React from 'react';
import axios from 'axios'
import AddProject from './AddProject';

class ProjectList extends React.Component {

  state = {
    projects: [],
    isLoading: true
  }

  getAllProjects = () => {
    // real-world scenarios would have to use pagination here
    axios.get('/api/projects').then((response) => {
      // use console.log !
      console.log("response.data : " + JSON.stringify(response.data))

      this.setState({ projects: response.data, isLoading: false }) // this triggers a re-render

    })
  }

  componentDidMount() {
    this.getAllProjects()
  }

  // addProjectHandler = (newProject) => {
  //   this.getAllProjects()
  //   // // task : re-render the project list including the new project
  //   // this.setState({
  //   //   projects: [...this.state.projects, newProject]
  //   // })
  // }

  render() {
    return (
      <div>
        <div id="project-list-container">
          <h1>Projects</h1>
          {this.state.isLoading ? <h2>Loading...</h2> : null}
          {(!this.state.isLoading && this.state.projects.length === 0) ? <h2>no projects so far...</h2> : null}
          {this.state.projects.map(p =>
            <div key={p._id}>Title: {p.title} -- Desc: {p.description}</div>
          )}
        </div >
        <AddProject addProject={this.getAllProjects} />
      </div>
    );
  }

}

export default ProjectList;
