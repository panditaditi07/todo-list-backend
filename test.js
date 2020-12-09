const AppError = require("./helpers/appErrorClass");
const err = new AppError(400, "Unsuccessful");
console.log(err);
