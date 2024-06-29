import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [error,setError] = useState('');
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('')
        console.log(password,username)
        // loggin user 
        // use setError for any error
        // setError('Not connected to server')
       navigate('/user-dashboard')
    }
  return (
    <div className="flex flex-col justify-center items-center h-screen">
    <Card className="md:w-2/5 md:h-2/7 bg-slate-900 text-white">
      <CardHeader className="flex flex-col">
        <CardTitle className="text-2xl">Swachh</CardTitle>
        {error.length ? <CardDescription className="text-red-700">{error}</CardDescription>:
        <CardDescription>Login to access dashboards</CardDescription>
        }
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-5 pb-2" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3">
              <Label htmlFor="username" className="text-xl">Username</Label>
              <Input id="username" placeholder="Enter username" 
              className="text-slate-900 font-semibold text-lg outline-none"
              value={username}
              onChange={e=>setUsername(e.target.value)}
              />
        </div>
        <div className="flex flex-col gap-3">
              <Label htmlFor="password" className="text-xl">Password</Label>
              <Input id="password" placeholder="Enter password" 
              className="text-slate-900 font-semibold text-lg outline-none"
              value={password}
              onChange={e=>setPassword(e.target.value)}
              />
        </div>

        <Button className="bg-slate-700 hover:bg-slate-800">Login</Button>
        </form>
      </CardContent>
    </Card>
    </div>
  );
};

export default Login;
