import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import Splash from "./components/HomePage/Splash/Splash"
import Recipes from "./components/HomePage/Recipes/Recipes";
import RecipePage from "./components/RecipePage/RecipePage"
import NoteForm from "./components/Forms/NoteForm/NoteForm"
import RecipeForm from "./components/Forms/RecipeForm/RecipeForm";
import { authenticate } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();


  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/recipes/:recipeId/notes/:noteId/edit">
          <NoteForm edit={true}/>
        </Route>
        <Route path="/recipes/:recipeId/notes/new" exact={true}>
          <NoteForm edit={false}/>
        </Route>
        <Route path="/recipes/:recipeId/edit" exact={true}>
          <RecipeForm edit={true}/>
        </Route>
        <Route path="/recipes/new" exact={true}>
          <RecipeForm edit={false}/>
        </Route>
        <Route path="/recipes/:recipeId" exact={true}>
          <RecipePage />
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true} >
          <SignUpForm />
        </Route>
        <Route path='/' exact={true} >
          <Splash />
          <Recipes />
        </Route>
        {/* <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute> */}
        <Route>
          <h1 id="app-404">404</h1>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
