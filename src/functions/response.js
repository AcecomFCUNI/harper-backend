const response = (res, status, err, message) => {
  res.send(status, {
    err: err,
    message
  })
}

export { response }
