import React from 'react';

const ContactList = ({ contacts, editContact, deleteContact }) => {
  return (
    <div>
      <h2>Contact List</h2>
      <ul>
        {contacts.map((contact, index) => (
          <li key={index} className="contact-item">
            <div className="contact-details">
              <strong>{contact.name}</strong>
              <span>{contact.email}</span>
              <span>{contact.phone}</span>
            </div>
            <div className="contact-actions">
              <button onClick={() => editContact(contact)}>Edit</button>
              <button onClick={() => deleteContact(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
