import { configureStore } from '@reduxjs/toolkit';  // Import the function to configure the Redux store
import { persistStore, persistReducer } from 'redux-persist';  
import storage from 'redux-persist/lib/storage';  // Import the default storage engine (localStorage)
import contactsReducer from './contactsSlice'; 

// Configuration object for redux-persist
const persistConfig = {
  key: 'root',  // The key to use for storing the state in local storage
  storage, 
};

const persistedReducer = persistReducer(persistConfig, contactsReducer);

// Create the Redux store with the persisted reducer
export const store = configureStore({
  reducer: {
    contacts: persistedReducer, 
  },
});

// TypeScript types for the state and dispatch functions
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
