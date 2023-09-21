import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
  const data = req.headers.authorization;
  const split = data.split(" ")
  const token = split[1]

  if( token ) {
      jwt.verify(token, "secret", (err) => {
          if (err) return res.sendStatus(403)
          next()
      })
  } else {
      res.sendStatus(401)
  }
}