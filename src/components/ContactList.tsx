import React from 'react';

// Defines the shape of a contact object
interface Contact {
    firstName: string;
    lastName: string;
    status: 'active' | 'inactive';
}

// Defines the props for the ContactList component
interface ContactListProps {
    contacts: Contact[];
    onEdit: (index: number) => void;
    onDetails: (index: number) => void;
    onDelete: (index: number) => void;
}

const ContactList: React.FC<ContactListProps> = ({ contacts, onEdit, onDetails, onDelete }) => {
    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Contact List</h2>
            {contacts.length === 0 ? (
                <p className="text-center text-gray-500">No contacts found. Please add a contact.</p>
            ) : (
                <ul className="list-disc list-inside mb-4">
                    {contacts.map((contact, index) => (
                        <li key={index} className="mb-2 p-4 border rounded shadow-sm list-none">
                            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
                                <p className="font-semibold text-gray-700 mb-2 sm:mb-0">{contact.firstName} {contact.lastName}</p>
                                <div className="flex flex-col sm:flex-row sm:justify-end mt-2 sm:mt-0">
                                    <button
                                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded mb-2 sm:mb-0 sm:mr-2 text-sm sm:text-base"
                                        onClick={() => onDetails(index)}
                                    >
                                        View Details
                                    </button>
                                    <button
                                        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded mb-2 sm:mb-0 sm:mr-2 text-sm sm:text-base"
                                        onClick={() => onEdit(index)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm sm:text-base"
                                        onClick={() => onDelete(index)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ContactList;
