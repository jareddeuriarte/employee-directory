import React from "react";
import API from "../utils/API";
import SearchBar from "./SearchBar";


//Search Results table in Act 19 is = table.js -Namita

class Table extends React.Component {

    state = {
        employees: [],
        search: "",
        ascending: true
    };

    // When this component mounts, search the API for random users
    componentDidMount() {
        this.searchEmployee();
    }

    searchEmployee = () => {
        API.search()
            .then(res => {
                // console.log("API results", res.data.results)
                this.setState({ employees: res.data.results })
            }
            )
            .catch(err => console.log(err));
    };

    handleInputChange = event => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: value });


    };

    //Filtering Employees
    handleFormSubmit = event => {
        // Preventing the default behavior of the form submit (which is to refresh the page)
        event.preventDefault();

        console.log(this.state.search)

        const filteredEmp = this.state.employees.filter(employee =>
            employee.name.first.toLowerCase() === this.state.search.toLowerCase() ||
            employee.name.last.toLowerCase() === this.state.search.toLowerCase()
        )
        console.log("Filtered Emp", filteredEmp);
        //updating the employee state variable with the new filtered value. The original employee state value came from the API call and componantDidMount()
        this.setState({ employees: filteredEmp })

        //reset Values 
        if (this.state.search === "") {
            this.searchEmployee()
        }
    };

    sortEmployees = event => {
        event.preventDefault();
        console.log(this.state.ascending)
        if (this.state.ascending === true) {
            this.setState({ ascending: false })
        } else {
            this.setState({ ascending: true })
        }
        const sortedList = this.state.employees.sort((a, b) => {
            //In case of Ascending 
            if (this.state.ascending === true) {
                if (a.name.first < b.name.first) {
                    return -1;
                }
                if (a.name.first > b.name.first) {
                    return 1;
                }
                return 0;

            }else { 
                //In case of Descending 
                if (a.name.first < b.name.first) {
                    return 1;
                }
                if (a.name.first > b.name.first) {
                    return -1;
                }
                return 0;
            }

         })
        console.log("Sort List:", sortedList)

    }

    render() {
        return (
            <div>
                <SearchBar
                    search={this.state.search}
                    handleFormSubmit={this.handleFormSubmit}
                    handleInput={this.handleInputChange}
                />
                <hr />
                <table className="table table-dark">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">First<span onClick={this.sortEmployees}> &#9661; </span></th>
                            <th scope="col">Last</th>
                            <th scope="col">Email</th>
                            <th scope="col">DOB</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.employees.map((employee, index) => (
                            <tr id={index} key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{employee.name.first}</td>
                                <td>{employee.name.last}</td>
                                <td>{employee.email}</td>
                                <td>{employee.dob.date.substring(0, 10)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        );
    }
}

export default Table;