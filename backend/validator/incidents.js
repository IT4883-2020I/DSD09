import { check } from "express-validator";

const validateCreateIncident = () => {
  return [
    check("name", "Name is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
    check("location", "Location is required").not().isEmpty(),
    check("level", "Level must be numeric").isNumeric().optional({ nullable: true }),
    check("dueDate", "Invalid Due date").isISO8601("yyyy-mm-dd").optional({ nullable: true }),
    check("type", "Type is required").not().isEmpty(),
    check("type", "Type must be in LUOI_DIEN, CAY_TRONG, CHAY_RUNG, DE_DIEU").custom((a) => {
      return ["LUOI_DIEN", "CAY_TRONG", "CHAY_RUNG", "DE_DIEU"].includes(a);
    }),
    check("images", "Images must be Array of image url drive")
      .isArray()
      .optional({ nullable: true }),
    check("videos", "Videos must be Array of video url drive")
      .isArray()
      .optional({ nullable: true }),
    check("tags", "Tags must be array of string")
      .isArray()
      .custom((a) => {
        return a.every((e) => {
          return typeof e === "string" || e instanceof String;
        });
      })
      .optional({ nullable: true })
  ];
};

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

const validateUpdateIncident = () => {
  return [
    check("level", "Level must be numeric").isNumeric().optional({ nullable: true }),
    check("status", "Status must be numeric").isNumeric().optional({ nullable: true }),
    check("type", "Type must be in LUOI_DIEN, CAY_TRONG, CHAY_RUNG, DE_DIEU")
      .custom((a) => {
        return ["LUOI_DIEN", "CAY_TRONG", "CHAY_RUNG", "DE_DIEU"].includes(a);
      })
      .optional({ nullable: true }),
    check("loggedTime", "loggedTime must be numeric > 0")
      .isInt({ min: 0 })
      .optional({ nullable: true }),
    check("dueDate", "Invalid Due date").isISO8601("yyyy-mm-dd").optional({ nullable: true }),
    check("addImageIds", "addImageIds must be Array").isArray().optional({ nullable: true }),
    check("addVideoIds", "addVideoIds must be Array").isArray().optional({ nullable: true }),
    check("deleteImageIds", "deleteImageIds must be Array").isArray().optional({ nullable: true }),
    check("deleteVideoIds", "deleteVideoIds must be Array").isArray().optional({ nullable: true }),
    check("tags", "Tags must be array of string")
      .isArray()
      .custom((a) => {
        return a.every((e) => {
          return typeof e === "string" || e instanceof String;
        });
      })
      .optional({ nullable: true }),
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

export { validateGetIncidentsList, validateUpdateIncident, validateCreateIncident };
