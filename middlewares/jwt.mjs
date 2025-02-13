// import jwt from "jsonwebtoken";
// export const jwt_auth = (req, res, next) => {
//   const tokenHeader = req.headers.authorization;

//   if (!tokenHeader)
//     return res.status(401).json({ success: false, message: "aeseds" });

//   console.log("tokenHeader", tokenHeader);

//   const [_, token] = tokenHeader.split(" ");

//   console.log("token", token);

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
//     req.user = decoded;

//     next();
//   } catch (error) {
//     return res.status(401).json({ success: false, message: "sdf" });
//   }
// };
