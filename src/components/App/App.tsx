import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { HomePage, AddRecipePage } from '../../pages';
import { ADD_RECIPE_ROUTE, RECIPE_BOARD_ROUTE } from '../../utils/routes';
import styles from './App.module.scss';
import { store } from '../../store';

export const App: React.ElementType = () => {
  return (
    <div className={styles.app} data-testid='app'>
      <Provider store={store}>
        <Router basename={window.location.pathname || ''}>
          <Routes>
            <Route path={RECIPE_BOARD_ROUTE} element={<HomePage />} />
            <Route path={ADD_RECIPE_ROUTE} element={<AddRecipePage />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
};
