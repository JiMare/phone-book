import { Button } from "@mui/material";
import React from "react";
import { Modal } from "./UI/Modal";
import styled from "styled-components";

export const DeleteDialog = ({ id, persons, onConfirm, onCancel }) => {
  return (
    <Modal onConfirm={onCancel}>
      <StyledModal>
        <p>
          Do you really want to delete {persons.find((p) => p.id === id).name} ?
        </p>
        <StyledActions>
          <Button onClick={() => onConfirm(id)}>OK</Button>
          <Button onClick={onCancel}>Cancel</Button>
        </StyledActions>
      </StyledModal>
    </Modal>
  );
};

const StyledModal = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledActions = styled.div`
  align-self: flex-end;
`;
