import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import './index.css';
import NavigationScroll from './layout/NavigationScroll';
import Routes from './routes';


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <NavigationScroll>
          <Routes />
        </NavigationScroll>
      </BrowserRouter>
    </Provider>
  );
}

export default App;