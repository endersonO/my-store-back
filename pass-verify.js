const bcrypt = require('bcrypt')

async function verifyPassword() {
  const myPassword = 'admin 123 .202'
  const hash = '$2b$10$T8lCeK8LKZIriFrMz9OHMem1vUOV3ohGkA7fW3yWu1LsiPK/hEPmq'
  const verify = await bcrypt.compare(myPassword, hash)
  console.log(verify)
}

verifyPassword()
