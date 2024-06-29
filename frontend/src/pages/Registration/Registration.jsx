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

const Registration = () => {
    const [error, setError] = useState('');
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [pincode, setPincode] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        navigate('/login');
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        console.log(name, email, password, phone, address, pincode);
        navigate('/user-dashboard');
    };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Card className="md:w-2/5 md:h-2/7 bg-slate-900 text-white">
        <CardHeader className="flex flex-col">
          <CardTitle className="text-base">Swachh</CardTitle>
          {error.length ? (
            <CardDescription className="text-xs text-red-700">{error}</CardDescription>
          ) : (
            <CardDescription className="text-xs">Register to create an account</CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-2 pb-2" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <Label htmlFor="name" className="text-base">Name</Label>
              <Input
                id="name"
                placeholder="Enter name"
                className="text-slate-900 text-sm outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="text-base">Email</Label>
              <Input
                id="email"
                placeholder="Enter email"
                className="text-slate-900 text-sm outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="password" className="text-base">Password</Label>
              <Input
                id="password"
                placeholder="Enter password"
                type="password"
                className="text-slate-900 text-sm outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="phone" className="text-base">Phone</Label>
              <Input
                id="phone"
                placeholder="Enter phone number"
                className="text-slate-900 text-sm outline-none"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="address" className="text-base">Address</Label>
              <Input
                id="address"
                placeholder="Enter address"
                className="text-slate-900 text-sm outline-none"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="pincode" className="text-base">Pincode</Label>
              <Input
                id="pincode"
                placeholder="Enter pincode"
                className="text-slate-900 text-sm outline-none"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
              />
              </div>
             <div className="flex gap-2">
                            <Button className="bg-slate-700 hover:bg-slate-800" type="submit">Register</Button>
                            <Button className="bg-slate-700 hover:bg-slate-800" type="button" onClick={handleLogin}>Login</Button>
            </div>
            </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Registration;
