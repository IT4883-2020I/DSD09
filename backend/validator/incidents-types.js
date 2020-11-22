import { check } from "express-validator";

const validateCreateIncidentsList = () => {
  return [
    check("name", "Name is required").not().isEmpty(),
    check("type", "Type is required").not().isEmpty()
  ];
};

export { validateCreateIncidentsList };
