import jwt from "jsonwebtoken";

export default function getdatafromthetoken(request) {
  try {
    const token = request.cookies.get('token')?.value || '';
    const decodedtoken = jwt.verify(token, 'yourSecretKeyHere');
   
    return decodedtoken.id;
  } catch (error) {
    console.log(error);
  }
}
