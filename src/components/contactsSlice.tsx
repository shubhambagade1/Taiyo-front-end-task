import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Defines the shape of a contact object
interface Contact {
    firstName: string;
    lastName: string;
    status: 'active' | 'inactive'; 
}

// Defines the shape of the contacts slice state
interface ContactsState {
    contacts: Contact[];  
}

// Initial state for the contacts slice
const initialState: ContactsState = {
    contacts: [], 
};

// Create a slice for managing contacts
const contactsSlice = createSlice({
    name: 'contacts', 
    initialState,
    reducers: {
        // Add a neew contact
        addContact: (state, action: PayloadAction<Contact>) => {
            state.contacts.push(action.payload); 
        },
        // update
        editContact: (state, action: PayloadAction<{ index: number; contact: Contact }>) => {
            state.contacts[action.payload.index] = action.payload.contact; 
        },
        // delete
        deleteContact: (state, action: PayloadAction<number>) => {
            state.contacts.splice(action.payload, 1);
        },
        // set the entire contacts array to a new array
        setContacts: (state, action: PayloadAction<Contact[]>) => {
            state.contacts = action.payload;
        },
    },
});

// Export actions to be used in components for dispatching
export const { addContact, editContact, deleteContact, setContacts } = contactsSlice.actions;

// Export the reducer to be used in the store
export default contactsSlice.reducer;
