import React from 'react';
import PropTypes from 'prop-types';
import { List, Item, Button } from './ContactList.styled';
import { ReactComponent as DeleteIcon } from '../icons/delete.svg';

// Компонент списка контактів
const ContactList = ({ contacts, onRemoveContact }) => (
  <List>
    {contacts.map(contact => (
      <Item key={contact.id}>
        {contact.name + ' : ' + contact.number}
        {
          // Кнопка видалення контакту
          <Button
            type="button"
            name="delete"
            onClick={() => onRemoveContact(contact.id)}
          >
            <DeleteIcon fill="#000000" width="20" height="20" />
            delete
          </Button>
        }
      </Item>
    ))}
  </List>
);

ContactList.propTypes = {
  contacts: PropTypes.object.isRequired,
  onRemoveContact: PropTypes.func.isRequired,
};

export default ContactList;