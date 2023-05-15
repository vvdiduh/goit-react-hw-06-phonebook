import React, { useEffect, useState } from 'react';

import styles from './app.module.css';
import Form from './Form/Form';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem('my-contacts'));
    if (savedContacts) {
      setContacts(savedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('my-contacts', JSON.stringify(contacts));
  }, [contacts]);

  const onAddContact = ({ name, number }) => {
    const newContact = { name, number, id: contacts.length + 1 };
    setContacts([...contacts, newContact]);
  };

  const handleChangeFilter = e => {
    const { value } = e.currentTarget;
    setFilter(value);
  };

  const doubleContact = name => {
    return contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
  };

  const onDeleteContact = id => {
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    setContacts(updatedContacts);
  };

  useEffect(() => {
    const filtered = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredContacts(filtered);
  }, [contacts, filter]);

  return (
    <div className={styles.container}>
      <h1>Телефонна книга</h1>
      <Form onSubmit={onAddContact} doubleContact={doubleContact} />
      <h2>Список контактів</h2>
      <Filter onChange={handleChangeFilter} filter={filter} />
      <ContactList
        contacts={filteredContacts}
        deleteContact={onDeleteContact}
      />
    </div>
  );
};

export default App;
