const jwt = require("jsonwebtoken");

module.exports = (req, res, next) =>
{
  try
  {
    const token = req.headers.authorization.split(" ")[1];
    console.log("checking auth..");
    const decoded = jwt.verify(token, "secret key lel");
    req.userData = decoded;

    next();

  }
  catch (e)
  {
    console.log("incorrect auth")
    return res.status(401).json( {message: "Auth failed"} );
  }

}
