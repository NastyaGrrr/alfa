import React from 'react';
import './App.css';
// @ts-ignore
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { paths } from "./pages/paths";
import store from './store';
import Error from './pages/error';
import { Provider } from 'react-redux';
import List from "./pages/list";

function App() {
  return (
      <div className="App">
      <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact path={paths.index}  component={() => <Redirect to={paths.list} />} />
                <Route exact path={paths.list}  component={() => <List />} />
                <Route path='*' component={() => <Error />}/>
                </Switch>
        </BrowserRouter>
      </Provider>
      </div>
  );
}

export default App;


