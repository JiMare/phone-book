import { Alert } from "@mui/material";
import React from "react";
import styled from "styled-components";

export const Notification = ({ notification }) => {
  if (!notification) return null;
  return (
    <StyledAlert severity={notification.type}>
      {notification.message}
    </StyledAlert>
  );
};

const StyledAlert = styled(Alert)`
  margin-top: 0.5rem;
`;
