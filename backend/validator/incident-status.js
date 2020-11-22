import { check } from "express-validator";

const validateCreateIncidentStatus = () => {
  return [check("name", "Name is required").not().isEmpty()];
};

export { validateCreateIncidentStatus };
