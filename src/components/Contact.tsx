import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { addContact, editContact, deleteContact } from './contactsSlice';
import Modal from './Modal';
import ContactList from './ContactList';

const Contact: React.FC = () => {
    // Accessing contacts from the Redux store
    const contacts = useSelector((state: RootState) => state.contacts.contacts);
    const dispatch = useDispatch();

    // State to control modal visibility and which contact is being edited or viewed
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [viewDetailsIndex, setViewDetailsIndex] = useState<number | null>(null);

    // Handles adding a new contact or editing an existing one
    const handleAddOrEditContact = (contact: { firstName: string; lastName: string; status: 'active' | 'inactive' }) => {
        if (editIndex !== null) {
            dispatch(editContact({ index: editIndex, contact }));
        } else {
            dispatch(addContact(contact));
        }
        closeModal(); 
    };

    // Opens the modal for creating a new contact or editing an existing one
    const openModal = (index: number | null = null) => {
        setEditIndex(index);
        setViewDetailsIndex(null); 
        setIsModalOpen(true);
    };

    // Closes the modal and resets the state
    const closeModal = () => {
        setEditIndex(null);
        setViewDetailsIndex(null);
        setIsModalOpen(false);
    };

    // Opens the modal to edit a contact
    const handleEditContact = (index: number) => {
        openModal(index);
    };

    // Deletes a contact from the list
    const handleDeleteContact = (index: number) => {
        dispatch(deleteContact(index));
    };

    // Opens the modal to view contact details
    const handleDetailsContact = (index: number) => {
        setViewDetailsIndex(index);
        setIsModalOpen(true);
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-4">
            <h1 className="text-4xl font-bold text-blue-600 text-center mb-6">Contacts</h1>
            <div className="bg-gray-100 p-4 sm:p-6 rounded shadow-md max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto">
                <ContactList
                    contacts={contacts}
                    onEdit={handleEditContact}
                    onDelete={handleDeleteContact}
                    onDetails={handleDetailsContact}
                />
                <div className="text-center mt-4">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => openModal()}
                    >
                        Create Contact
                    </button>
                </div>
                <Modal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onSave={handleAddOrEditContact}
                    title={
                        viewDetailsIndex !== null
                            ? "View Contact Details"
                            : editIndex !== null
                                ? "Edit Contact"
                                : "Create Contact"
                    }
                    initialContact={
                        viewDetailsIndex !== null
                            ? contacts[viewDetailsIndex]
                            : editIndex !== null
                                ? contacts[editIndex]
                                : undefined
                    }
                    isViewMode={viewDetailsIndex !== null}
                />
            </div>
        </div>
    );
};

export default Contact;
