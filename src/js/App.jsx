import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext.jsx';
import CharactersPage from './pages/CharactersPage.jsx';
import PlanetsPage from './pages/PlanetsPage.jsx';
import VehiclesPage from './pages/VehiclesPage.jsx';
import FavoritesList from './component/FavoritesList.jsx';

const App = () => {
  return (
    <FavoritesProvider>
      <Router>
        <div className="container mt-4">
          <Switch>
            <Route exact path="/" component={CharactersPage} />
            <Route path="/characters" component={CharactersPage} />
            <Route path="/planets" component={PlanetsPage} />
            <Route path="/vehicles" component={VehiclesPage} />
          </Switch>
          <FavoritesList />
        </div>
      </Router>
    </FavoritesProvider>
  );
};

export default App;
