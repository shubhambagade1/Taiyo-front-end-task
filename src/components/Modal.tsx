import React, { useState, useEffect } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (contact: { firstName: string; lastName: string; status: 'active' | 'inactive' }) => void;
    title: string;
    initialContact?: { firstName: string; lastName: string; status: 'active' | 'inactive' };
    isViewMode?: boolean;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSave, title, initialContact, isViewMode }) => {
    // Local state for managing the contact form data
    const [contact, setContact] = useState<{ firstName: string; lastName: string; status: 'active' | 'inactive' }>({
        firstName: '',
        lastName: '',
        status: 'active',
    });

    // Sync form data with initialContact when modal opens or initialContact changes
    useEffect(() => {
        if (initialContact) {
            setContact(initialContact);
        } else {
            setContact({ firstName: '', lastName: '', status: 'active' });
        }
    }, [initialContact, isOpen]);

    // Updates contact state when form inputs change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setContact(prevContact => ({ ...prevContact, [name]: value }));
    };

    // Handles form submission to save the contact
    const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (event.currentTarget.checkValidity()) {
            onSave(contact); 
            onClose(); 
        }
    };

    if (!isOpen) return null; 

    return (
        <>
            <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
            <div className="fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out">
                <div className="bg-white p-6 rounded shadow-lg max-w-md w-full transform transition-all">
                    <h2 className="text-xl font-bold mb-4">{title}</h2>
                    <form onSubmit={handleSave}>
                        <div className="mb-4">
                            <label className="block text-gray-700" htmlFor="firstName">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={contact.firstName}
                                onChange={handleChange}
                                readOnly={isViewMode}
                                required
                                className="border rounded p-2 w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700" htmlFor="lastName">Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={contact.lastName}
                                onChange={handleChange}
                                readOnly={isViewMode}
                                required
                                className="border rounded p-2 w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <span className="block text-gray-700">Status</span>
                            <div className="flex items-center">
                                <label className="inline-flex items-center mr-4">
                                    <input
                                        type="radio"
                                        name="status"
                                        value="active"
                                        checked={contact.status === 'active'}
                                        onChange={handleChange}
                                        disabled={isViewMode}
                                        className="form-radio"
                                    />
                                    <span className="ml-2">Active</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="status"
                                        value="inactive"
                                        checked={contact.status === 'inactive'}
                                        onChange={handleChange}
                                        disabled={isViewMode}
                                        className="form-radio"
                                    />
                                    <span className="ml-2">Inactive</span>
                                </label>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
                                onClick={onClose}
                            >
                                Close
                            </button>
                            {!isViewMode && (
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Save
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Modal;
