import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { Container, Title, SubTitle, Wrapper } from './App.styled';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  // збереження контактів в localStorage
  componentDidMount() {
    const contacts = localStorage.getItem('contacts'); // отримуємо дані localStorage.
    const parsedContacts = JSON.parse(contacts); // Перетворюємо дані з рядка JSON на об'єкт JavaScript.

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts }); // Встановлюємо отримані контакти в об'єкт "contacts".
    }
  }

  componentDidUpdate(_, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      //Порівнюємо поточні контакти з попереднім об'єктом контактів.
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
      //Якщо контакти змінилися, зберігаємо їх у localStorage.
    }
  }

  // Додавання нового контакту в список контактів
  addContact = contact => {
    const isInContacts = this.state.contacts.some(
      ({ name }) =>
        name.toLowerCase().trim() === contact.name.toLowerCase().trim()
    );
    // якщо контакт існує, виводимо повідомлення 
    if (isInContacts) {
      alert(`${contact.name} is already in contacts`);
      return;
    }
    this.setState(prevState => ({
      contacts: [{ id: nanoid(), ...contact }, ...prevState.contacts],
    }));
  };

  // зміна значення фільтра
  changeFilter = event => {
    this.setState({ filter: event.target.value.trim() });
  };

  // отримання відфільтрованнных контактів
  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  // Видалення контакту зі списку 
  removeContact = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(({ id }) => id !== contactId),
      };
    });
  };

  render() {
    const visibleContacts = this.getVisibleContacts();
    const { filter } = this.state;

    return (
      <Container>
        <Title>Phonebook</Title>

        <ContactForm onSubmit={this.addContact} />

        <SubTitle>Contacts</SubTitle>
        {this.state.contacts.length > 0 ? (
          // Фільтр для відображення контактів
          <Filter value={filter} onChangeFilter={this.changeFilter} />
        ) : (
          <Wrapper>Your phonebook is empty. Add first contact!</Wrapper>
        )}
        {this.state.contacts.length > 0 && (
          // Список контактів
          <ContactList
            contacts={visibleContacts}
            onRemoveContact={this.removeContact}
          />
        )}
      </Container>
    );
  }
}

export default App;