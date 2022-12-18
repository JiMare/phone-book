import { Button, Card, CardHeader, TextField } from "@mui/material";
import { useState } from "react";
import { updatePerson } from "../services/persons";
import styled from "styled-components";

export const PersonForm = ({
  onAddPerson,
  persons,
  onUpdatePerson,
  showNotification,
}) => {
  const [newName, setNewName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const onChangeName = (e) => {
    setNewName(e.target.value);
  };

  const onChangePhone = (e) => {
    setPhoneNumber(e.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const personToUpdate = persons.find(
      (person) => person.name === newName.trim()
    );
    if (personToUpdate) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        updatePerson({ ...personToUpdate, number: phoneNumber })
          .then((personToUpdate) => onUpdatePerson(personToUpdate))
          .catch((error) =>
            showNotification({
              type: "error",
              message: error.response.data.error,
            })
          );
      }
    } else {
      onAddPerson({
        name: newName.trim(),
        number: phoneNumber,
      });
    }
    setNewName("");
    setPhoneNumber("");
  };

  return (
    <StyledCard>
      <CardHeader title="Add a new" />
      <StyledForm onSubmit={onSubmit}>
        <StyledInputs>
          <TextField
            label="Name:"
            size="small"
            value={newName}
            onChange={onChangeName}
          />

          <TextField
            label="Number:"
            size="small"
            value={phoneNumber}
            onChange={onChangePhone}
          />
        </StyledInputs>
        <StyledButton type="submit">Add</StyledButton>
      </StyledForm>
    </StyledCard>
  );
};

const StyledCard = styled(Card)`
  padding: 1rem;
  margin-block: 2rem;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const StyledInputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StyledButton = styled(Button)`
  margin-top: 0.5rem;
  align-self: flex-end;
`;
