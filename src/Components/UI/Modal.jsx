import { Card } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const Backdrop = (props) => {
  return <StyledBackdrop onClick={props.onConfirm} />;
};

const ModalOverlay = (props) => {
  return (
    <StyledModal>
      <div>{props.children}</div>
    </StyledModal>
  );
};

const portalElement = document.getElementById("overlays");

export const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

const StyledBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 20;
  background-color: rgba(0, 0, 0, 0.75);
`;

const StyledModal = styled.div`
  position: fixed;
  top: 20vh;
  left: 5%;
  width: 90%;
  background-color: white;
  padding: 1rem;
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  z-index: 30;
  animation: slide-down 300ms ease-out forwards;
  @keyframes slide-down {
    from {
      opacity: 0;
      transform: translateY(-3rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @media (min-width: 768px) {
    width: 40rem;
    left: calc(50% - 20rem);
  }
`;
