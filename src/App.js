import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import './App.css';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [contactToEdit, setContactToEdit] = useState(null);
  const [error, setError] = useState('');

  // Load contacts from local storage on component mount
  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (storedContacts) {
      setContacts(storedContacts);
    }
  }, []);

  // Save contacts to local storage whenever contacts state changes
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (contact) => {
    if (contacts.some((c) => c.email === contact.email || c.phone === contact.phone)) {
      setError('Contact already exists with the same email or phone.');
      return;
    }
    setContacts([...contacts, contact]);
    setError('');
  };

  const editContact = (updatedContact) => {
    const updatedContacts = contacts.map((contact) =>
      contact === contactToEdit ? updatedContact : contact
    );
    setContacts(updatedContacts);
    setContactToEdit(null);
    setError('');
  };

  const handleEditContact = (contact) => {
    setContactToEdit(contact);
  };

  const deleteContact = (index) => {
    const updatedContacts = contacts.filter((_, i) => i !== index);
    setContacts(updatedContacts);
  };

  return (
    <div className="App">
      <h1>Contact Management System</h1>
      <ContactForm
        addContact={addContact}
        editContact={editContact}
        contactToEdit={contactToEdit}
        error={error}
      />
      <ContactList
        contacts={contacts}
        editContact={handleEditContact}
        deleteContact={deleteContact}
      />
    </div>
  );
};

export default App;
