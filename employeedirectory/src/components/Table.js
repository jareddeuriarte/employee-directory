import React from "react";
import API from "../utils/API";
import SearchBar from "./SearchBar";


//Search Rrsults table in Act 19 is = table.js -Namita

class Table extends React.Component {
    state = {
        employees: [],
        search: "",
    };

    // When this component mounts, search the API for random users
    componentDidMount() {
        this.searchEmployee();
    }

    searchEmployee = () => {
        API.search()
            .then(res => {
                //   console.log("API results", res.data.results)
                this.setState({ employees: res.data.results })
            }
            )
            .catch(err => console.log(err));
    };

    handleInputChange = event => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
          [name]: value
        });
      };

    render() {
        return (
            <div>Sample Table
                      <SearchBar 
                          search={this.state.search}
                          handleFormSubmit={this.handleFormSubmit}
                          handleInput={this.handleInputChange}
                        />
                      <hr/>
                <table class="table table-dark">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">First</th>
                            <th scope="col">Last</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.employees.map((employee, index) => (
                            <tr id={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{employee.name.first}</td>
                                <td>{employee.name.last}</td>
                            </tr>
                        ))}

                    </tbody>
                </table>

            </div>
        );
    }
}

export default Table;