const users = [
    {
        email:"user@gmail.com",
        password:"password",
        name: "user"
    }
]

export const getUserByEmail = email => {
    const found = users.find(user => user.email === email)
    return found;
} 