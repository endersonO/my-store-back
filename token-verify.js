const jwt = require('jsonwebtoken');

const secret = 'enderson';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY0Njk2NzExMn0.NJT1OsFo__o1x3O8DmBKzdg9S6duLACrmhYKVtZcYDo'

function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

const payload = verifyToken(token, secret)

console.log(payload)
