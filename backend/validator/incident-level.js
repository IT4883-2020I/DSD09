import { check } from "express-validator";

const validateCreateIncidentLevel = () => {
  return [check("name", "Name is required").not().isEmpty()];
};

export { validateCreateIncidentLevel };
