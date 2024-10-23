const { connectDatabase } = require("../database/db");
const User = require("../models/user");

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    await connectDatabase();
    const { email } = event.pathParameters;

    console.log(`Attempting to delete user with email: ${email}`);

    // Find user by email and delete
    const deletedUser = await User.findOneAndDelete({ email });

    if (deletedUser) {
      console.log(`User deleted: ${deletedUser}`);
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "User deleted successfully" }),
      };
    } else {
      console.log(`No user found with email: ${email}`);
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
