import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { getForms } from "../redux/actions/formsActions";
import Home from "../components/Home/Home";
import FormDetail from "../components/FormDetail/FormDetail";
import AddForm from "../components/FormCreate/AddForm";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getForms());
  }, [dispatch]);

  return (
    <>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/create' component={AddForm} />
        <Route path='/:id' component={FormDetail} />
        {/* <Route>
					<NotFound/>
				</Route> */}
      </Switch>
    </>
  );
}

export default App;
