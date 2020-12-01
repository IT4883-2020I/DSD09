import { check } from "express-validator";

const validateCreateIncidentTag = () => {
  return [
    check("name", "Name is required").not().isEmpty(),
    check("type", "Type must be in LUOI_DIEN, CAY_TRONG, CHAY_RUNG, DE_DIEU").custom((a) => {
      return ["LUOI_DIEN", "CAY_TRONG", "CHAY_RUNG", "DE_DIEU"].includes(a);
    })
  ];
};

export { validateCreateIncidentTag };
