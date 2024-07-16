import React from "react";
import { Dropdown } from "flowbite-react";

const DropdownComponent = ({ selectedType, setSelectedType }) => {
  return (
    <Dropdown color={"blue"} label={selectedType}>
      <Dropdown.Item onClick={() => setSelectedType("Суббуфер")}>
        Суббуфер
      </Dropdown.Item>
      <Dropdown.Item onClick={() => setSelectedType("Усилвател")}>
        Усилвател
      </Dropdown.Item>
      <Dropdown.Item onClick={() => setSelectedType("Среда")}>Среда</Dropdown.Item>
      <Dropdown.Item onClick={() => setSelectedType("Пищялка")}>
        Пищялка
      </Dropdown.Item>
    </Dropdown>
  );
};

export default DropdownComponent;
