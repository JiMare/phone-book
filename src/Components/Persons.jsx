import React from "react";
import styled from "styled-components";
import { Button } from "@mui/material";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

export const Persons = ({ shownPersons, onDelete }) => {
  return (
    <StyledList>
      {shownPersons.map((person) => (
        <StyledPerson key={person.name}>
          <StyledContact>
            <StyledName>{person.name}</StyledName>
            <StyledNumberWrapper>
              <LocalPhoneIcon />
              <StyledNumber>{person.number}</StyledNumber>
            </StyledNumberWrapper>
          </StyledContact>
          <Button onClick={() => onDelete(person.id)}>Delete</Button>
        </StyledPerson>
      ))}
    </StyledList>
  );
};

const StyledList = styled.ul`
  list-style: none;
`;

const StyledPerson = styled.li`
  padding-block: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const StyledContact = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const StyledName = styled.p`
  color: #272727;
  font-weight: 600;
`;

const StyledNumberWrapper = styled.div`
  display: flex;
  gap: 0.2rem;
`;

const StyledNumber = styled.p`
  color: #d7d7d7;
`;
