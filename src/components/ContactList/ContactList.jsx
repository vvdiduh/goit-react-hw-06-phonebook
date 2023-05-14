import styles from './contact-list.module.css';
import propTypes from 'prop-types';

const ContactList = ({ contacts, deleteContact }) => {
  const elements = contacts.map(contact => (
    <li key={contact.id} id={contact.id} className={styles.item}>
      <span className={styles.span}>{contact.name}:</span>
      <span>{contact.number}</span>
      <button className={styles.btn} onClick={() => deleteContact(contact.id)}>
        Видалити
      </button>
    </li>
  ));
  return (
    <>
      {contacts.length > 0 ? (
        <ul className={styles.list}>{elements} </ul>
      ) : (
        <h2>
          Додайте контакти до телефонної книги
        </h2>
      )}
    </>
  );
};

ContactList.propTypes = {
  contacts: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.string.isRequired,
      name: propTypes.string.isRequired,
      number: propTypes.string.isRequired,
    })
  ),
  deleteContact: propTypes.func.isRequired,
};

export default ContactList;
