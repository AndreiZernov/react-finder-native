import React from "react";
import styled from "styled-components";
import { NotificationIcon } from "./Icons";
import { useDataItems } from "../contexts/dataItemsContext";

const NotificationButton = () => {
  const { coursesDataNew } = useDataItems();
  return (
    <Container>
      <NotificationIcon />
      <Cover>
        <Text>{coursesDataNew.length}</Text>
      </Cover>
    </Container>
  );
};

export default NotificationButton;

const Container = styled.View`
  width: 44px;
  height: 44px;
  justify-content: center;
  align-items: center;
`;

const Cover = styled.View`
  width: 16px;
  height: 16px;
  background: #3c4560;
  position: absolute;
  top: 0px;
  right: 5px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  border: 1px solid white;
`;

const Text = styled.Text`
  color: white;
  font-size: 12px;
  font-weight: 700;
`;
