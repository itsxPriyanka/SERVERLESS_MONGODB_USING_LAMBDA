// const { connectDatabase } = require("../database/db");
// const User = require("../models/user");

// module.exports.handler = async (event, context) => {
//   context.callbackWaitsForEmptyEventLoop = false;

//   try {
//     await connectDatabase();
//     const { email } = event.pathParameters;
//     const updateData = JSON.parse(event.body);

//     const updatedUser = await User.updateByEmail(email, updateData);

//     if (updatedUser) {
//       return {
//         statusCode: 200,
//         body: JSON.stringify(updatedUser),
//       };
//     } else {
//       return {
//         statusCode: 404,
//         body: JSON.stringify({ error: "User not found" }),
//       };
//     }
//   } catch (err) {
//     console.error(err);
//     return {
//       statusCode: err.statusCode || 500,
//       body: JSON.stringify({ error: err.message }),
//     };
//   }
// };














const { connectDatabase } = require("../database/db");
const User = require("../models/user");

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    await connectDatabase();
    const { email } = event.pathParameters;
    const updateData = JSON.parse(event.body);

    // Find user by email and update
    const updatedUser = await User.findOneAndUpdate(
      { email },       // filter
      updateData,      // update
      { new: true }    // options: return the updated document
    );

    if (updatedUser) {
      return {
        statusCode: 200,
        body: JSON.stringify(updatedUser),
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "User not found" }),
      };
    }
  } catch (err) {
    console.error(err);
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
