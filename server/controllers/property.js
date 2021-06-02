import PropertyModel from "../models/property";

// Get all property data
export function getAllProperties(req, res) {
  PropertyModel.find()
    .select("propertyId propertyName")
    .then((properties) => {
      return res.status(200).json(properties);
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: err.message,
      });
    });
}

// Get rental income by propertyId
export function getRentalIncome(req, res) {
  const propertyId = req.query.propertyId;
  PropertyModel.find({ propertyId })
    .select("income")
    .then((properties) => {
      return res.status(200).json(properties);
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: err.message,
      });
    });
}

// Get rental by propertyId
export function getRental(req, res) {
  const propertyId = req.query.propertyId;
  PropertyModel.find({ propertyId })
    .select("income expense")
    .then((properties) => {
      return res.status(200).json(properties[0]);
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: err.message,
      });
    });
}

// create new propertyData
export function createProperty(req, res) {
  const property = new PropertyModel({
    propertyId: req.body.propertyId,
    propertyName: req.body.propertyName,
    income: {
      January: req.body.income.January,
      February: req.body.income.February,
      March: req.body.income.March,
      April: req.body.income.April,
      May: req.body.income.May,
      June: req.body.income.June,
      July: req.body.income.July,
      August: req.body.income.August,
      September: req.body.income.September,
      October: req.body.income.October,
      November: req.body.income.November,
      December: req.body.income.December,
    },
    expense: {
      January: req.body.expense.January,
      February: req.body.expense.February,
      March: req.body.expense.March,
      April: req.body.expense.April,
      May: req.body.expense.May,
      June: req.body.expense.June,
      July: req.body.expense.July,
      August: req.body.expense.August,
      September: req.body.expense.December,
      October: req.body.expense.December,
      November: req.body.expense.December,
      December: req.body.expense.December,
    },
  });
  return property
    .save()
    .then((newProperty) => {
      return res.status(201).json({
        success: true,
        message: "New property data created successfully",
        PropertyData: newProperty,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: error.message,
      });
    });
}
