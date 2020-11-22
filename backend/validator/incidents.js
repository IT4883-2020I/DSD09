import { check } from "express-validator";

const validateGetIncidentsList = () => {
  return [
    check("offset", "Page must be numeric > 0").isInt({ min: 0 }).optional({ nullable: true }),
    check("limit", "Limit must be numeric > 0").isInt({ min: 0 }).optional({ nullable: true }),
    check("level", "Level must be numeric").isNumeric().optional({ nullable: true }),
    check("status", "Status must be numeric").isNumeric().optional({ nullable: true }),
    check("dueDateMin", "Invalid Due date").isISO8601("yyyy-mm-dd").optional({ nullable: true }),
    check("dueDateMax", "Invalid Due date").isISO8601("yyyy-mm-dd").optional({ nullable: true }),
    check("assignee", "Assignee must be array of number")
      .isArray()
      .custom((a) => {
        return a.every((e) => {
          return Number.isInteger(e);
        });
      })
      .optional({ nullable: true })
  ];
};

export { validateGetIncidentsList };
