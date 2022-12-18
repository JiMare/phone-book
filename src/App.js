import { useState, useEffect } from "react";
import { PersonForm } from "./Components/PersonForm";
import { Persons } from "./Components/Persons";
import { Filter } from "./Components/Filter";
import { getPersons, savePerson, deletePerson } from "./services/persons";
import { Notification } from "./Components/Notification";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import { Time } from "./Components/Time";
import { DeleteDialog } from "./Components/DeleteDialog";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filterKey, setFilterKey] = useState("");
  const [notification, setNotification] = useState(null);
  const [isAddCardOpen, setIsAddCardOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);

  useEffect(() => {
    getPersons().then((data) => setPersons(data));
  }, []);

  const onAddPerson = (newPerson) => {
    savePerson(newPerson)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        showNotification({
          type: "success",
          message: `added ${returnedPerson.name}`,
        });
      })
      .catch((error) =>
        showNotification({ type: "error", message: error.response.data.error })
      );
  };

  const onUpdatePerson = (updatedPerson) => {
    setPersons(
      persons.map((person) =>
        person.id === updatedPerson.id ? updatedPerson : person
      )
    );
  };

  const onDelete = (id) => {
    setIdToDelete(id);
    setIsModalOpen(true);
  };

  const onCloseDialog = () => {
    setIdToDelete(null);
    setIsModalOpen(false);
  };

  const onDeletePerson = (id) => {
    deletePerson(id).then(() => {
      setPersons((prev) => prev.filter((p) => p.id !== id));
    });
    onCloseDialog();
  };

  const showNotification = (notification) => {
    setNotification(notification);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const onFilterChange = (e) => {
    setFilterKey(e.target.value);
  };

  const onToggleAddCardOpen = () => {
    setIsAddCardOpen(!isAddCardOpen);
  };

  const filteredPersons = filterKey
    ? persons.filter(
        (person) =>
          (person.name.toLowerCase() === filterKey.toLowerCase()) |
          person.name.toLowerCase().split(" ").includes(filterKey.toLowerCase())
      ).length > 0
      ? persons
          .filter(
            (person) =>
              (person.name.toLowerCase() === filterKey.toLowerCase()) |
              person.name
                .toLowerCase()
                .split(" ")
                .includes(filterKey.toLowerCase())
          )
          .sort((a, b) => a.name.localeCompare(b.name))
      : persons.sort((a, b) => a.name.localeCompare(b.name))
    : persons.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <Container>
      {isModalOpen && (
        <DeleteDialog
          id={idToDelete}
          persons={persons}
          onConfirm={onDeletePerson}
          onCancel={onCloseDialog}
        />
      )}
      <Time />
      <MainTitle>Phonebook</MainTitle>
      <Filter onFilterChange={onFilterChange} filterKey={filterKey} />
      <Notification notification={notification} />
      <StyledIconButton onClick={onToggleAddCardOpen}>
        {isAddCardOpen ? <CloseIcon /> : <AddIcon />}
      </StyledIconButton>
      {isAddCardOpen && (
        <PersonForm
          onAddPerson={onAddPerson}
          persons={persons}
          onUpdatePerson={onUpdatePerson}
          showNotification={showNotification}
        />
      )}
      <ContactsTitle>My Contacts</ContactsTitle>
      <Persons shownPersons={filteredPersons} onDelete={onDelete} />
    </Container>
  );
};

export default App;

const Container = styled.div`
  max-width: 80%;
  margin: 0.5rem auto;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 2rem;
  border-radius: 0.8rem;
  @media only screen and (min-width: 900px) {
    & {
      max-width: 40%;
    }
  }
`;

const MainTitle = styled.h1`
  font-size: 2rem;
  color: #01303f;
  margin: 2rem 0 1rem 0;
`;

const ContactsTitle = styled.h2`
  font-size: 1.5rem;
  color: #01303f;
`;

const StyledIconButton = styled(IconButton)`
  align-self: flex-end;
  margin-top: 1rem;
  color: #1976d2;
`;
