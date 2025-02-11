// error middleware
export const error_handler = (err, req, res) => {
  console.error(err.stack);

  return res.status(err.status || 500).json({
    success: false,
    message: err.message
  });
};
