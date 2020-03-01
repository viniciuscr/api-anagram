/**
 * A simple middleware to handle nicier all errors
 * @param{ import("express").Errback} err
 * @param{ import("express").Request} req
 * @param{ import("express").Response} res
 * @param{ import("express").NextFunction} next
 */
function ErrorHandler(err, req, res, next) {
  return res.send({ error: err.message, params: req.query });
}
module.exports = ErrorHandler;
