import ReactDOM from 'react-dom/client';
import './index.css';
import { appRouter } from './App';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { store } from '../src/components/store';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  // used store to store the data of contacts and give the access of store to entire app
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      {/* To provide Routing for a application and rendering the approuter with sidebar and other components */}
      <RouterProvider router={appRouter} />
    </QueryClientProvider>
  </Provider>
);
