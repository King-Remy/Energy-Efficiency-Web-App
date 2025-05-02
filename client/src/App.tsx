import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import './index.css';
import NavigationScroll from './layout/NavigationScroll';
import Routes from './routes';
import { JWTProvider } from './contexts/JWTContext';

function App() {
  return (
    <Provider store={store}>
      <JWTProvider>
        <BrowserRouter>
          <NavigationScroll>
            <Routes />
          </NavigationScroll>
        </BrowserRouter>
      </JWTProvider>
    </Provider>
  );
}

export default App;