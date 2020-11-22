import { check } from "express-validator";

const validateGetIncidentsList = () => {
  return [
    check("page", "Page must be numeric").isNumeric().optional({ nullable: true }),
    check("limit", "Limit must be numeric").isNumeric().optional({ nullable: true }),
    check("level", "Level must be numeric").isNumeric().optional({ nullable: true }),
    check("status", "Status must be numeric").isNumeric().optional({ nullable: true })
  ];
};

export { validateGetIncidentsList };
