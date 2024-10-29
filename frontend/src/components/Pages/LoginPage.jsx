import React from 'react'
import axios from 'axios'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { useNavigate } from 'react-router-dom'

export default function Component() {
  const [showPassword, setShowPassword] = React.useState(false)
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [user_type, setuser_type] = React.useState('')
  const [message, setMessage] = React.useState('') // State for messages
  const [isSuccess, setIsSuccess] = React.useState(false) // Track if login is successful
  const navigate = useNavigate()

  const togglePasswordVisibility = () => setShowPassword(!showPassword)

  const handleSubmit = async (event) => {
    event.preventDefault() // Prevent the default form submission

    // Simple validation
    if (!email || !password || !user_type) {
      setMessage('Please fill in all fields.')
      setIsSuccess(false) // Not a success message
      return
    }

    try {
      console.log(email, password, user_type);
      
      const response = await axios.post('http://localhost:3000/api/users/login', {
        email,
        password,
        user_type,
      }, { withCredentials: true })

      // Handle successful response

      setMessage('Login successful!') // Set success message
      setIsSuccess(true) // Mark as successful

      // Navigate based on user type
      if (user_type === 'Job Seeker') {
        navigate('/jobSeekerHome')
      } else if (user_type === 'Employer') {
        navigate('/employerHome')
      }

    } catch (error) {
      // Handle error response
      console.error('Login failed:', error.response ? error.response.data : error.message)
      setMessage('Login failed. Please check your credentials.') // Set error message
      setIsSuccess(false) // Mark as not successful
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Login to Job Portal</CardTitle>
          <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="user_type">User Type</Label>
              <Select onValueChange={(value) => setuser_type(value)}>
                <SelectTrigger id="user_type">
                  <SelectValue placeholder="Select user type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Job Seeker">Job Seeker</SelectItem>
                  <SelectItem value="Employer">Employer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {message && (
              <div className={`mt-2 text-left ${isSuccess ? 'text-green-500' : 'text-red-500'}`}>
                {message}
              </div>
            )}
            <Button className="w-full bg-gradient-to-r from-gray-400 to-gray-600 hover:from-gray-500 hover:to-gray-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
              Log In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
