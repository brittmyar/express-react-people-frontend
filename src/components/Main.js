import { Route, Switch } from "react-router-dom";
import Index from "../pages/Index";
import Show from "../pages/Show";
import { useEffect, useState } from "react";

const Main = (props) => {
    const [people, setPeople] = useState(null);

    // const URL = "http://localhost:4000/people/";

    const URL = "https://express-react-peeps.herokuapp.com/people"

    const getPeople = async () => {
        const response = await fetch(URL);
        const data = await response.json();
        setPeople(data);
    };

    const createPeople = async (person) => {
        // make post request to create people
        await fetch(URL, { // fetch built in, makes an http request 
            method: "POST", // default is get so have to define
            headers: { 
                "Content-Type": "Application/json",
            },
            body: JSON.stringify(person),
        });
        // update list of people
        getPeople();
    };

    const updatePeople = async (person, id) => {
        // make put request to create people
        await fetch(URL + id, {
            method: "PUT",
            headers: {
                "Content-Type": "Application/json",
            },
            body: JSON.stringify(person),
        });
        getPeople();
    };

    const deletePeople = async id => {
        // make delete request to create people
        await fetch(URL + id, {
            method: "DELETE",
        });
        // update list of people
        getPeople();
    };

    useEffect(() => 
    {getPeople()}, []);

    return (
        <main>
            <Switch>
                <Route exact path="/">
                    <Index
                        people={people}
                        createPeople={createPeople}
                    />
                </Route>
                <Route
                    path="/people/:id"
                    render={(renderProps) => (
                        <Show
                            people={people}
                            updatePeople={updatePeople}
                            deletePeople={deletePeople}
                            {...renderProps}
                        />
                    )}
                />
            </Switch>
        </main>
    )
}

export default Main;

