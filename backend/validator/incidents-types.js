import { check } from "express-validator";

const validateCreateIncidentType = () => {
  return [
    check("name", "Name is required").not().isEmpty(),
    check("type", "Type is required").not().isEmpty()
  ];
};

export { validateCreateIncidentType };
