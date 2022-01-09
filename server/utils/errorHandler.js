function createErrorMessage(error) {
  return error.message.includes('Path')
    ? 'Please fullfil all fields!'
    : Object.values(error.errors)[0]?.properties?.message;
}

function errorHandler(error, res, req) {
  if (error instanceof TypeError || error.name == 'MongoError') {
    console.log(`${req.method} >> ${req.baseUrl}: ${error.message}`);
    return res.status(500).json({ message: 'Something went wrong!' });
  } else {
    const message = createErrorMessage(error);
    res.status(400).json({ message });
  }
}

module.exports = {
  errorHandler,
};
