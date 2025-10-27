import { ref, readonly } from "vue"

interface User {
  id: string
  name: string
  email: string
}

const user = ref<User | null>(null)

// Initialize from localStorage
const storedUser = localStorage.getItem("currentUser")
if (storedUser) {
  user.value = JSON.parse(storedUser)
}

export function useAuthStore() {
  const login = async (email: string, password: string): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const foundUser = users.find((u: any) => u.email === email && u.password === password)

    if (foundUser) {
      const userWithoutPassword = { id: foundUser.id, name: foundUser.name, email: foundUser.email }
      user.value = userWithoutPassword
      localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword))
      return true
    }
    return false
  }

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem("users") || "[]")

    if (users.find((u: any) => u.email === email)) {
      return false
    }

    const newUser = {
      id: crypto.randomUUID(),
      name,
      email,
      password,
    }

    users.push(newUser)
    localStorage.setItem("users", JSON.stringify(users))

    const userWithoutPassword = { id: newUser.id, name: newUser.name, email: newUser.email }
    user.value = userWithoutPassword
    localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword))
    return true
  }

  const logout = () => {
    user.value = null
    localStorage.removeItem("currentUser")
  }

  return {
    user: readonly(user),
    login,
    signup,
    logout,
  }
}
