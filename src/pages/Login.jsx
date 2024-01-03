import {
    Card,
    Input,
    Button,
    Typography
} from "@material-tailwind/react";
import Navbar from "../components/Navbar";
import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MdError } from "react-icons/md"

const Login = () => {
    const navigate = useNavigate();
    const [name, SetName] = useState("")
    const [password, SetPassword] = useState("")
    const [valid, setValid] = useState(false)
    const [show, setShow] = useState(false)
    const handleClick = () => {
        fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: name,
                password: password,
            })
        })
            .then(
                res => res.json()
            )
            .then(data => {
                if (data.token) {
                    sessionStorage.setItem("token", data.token);
                    setValid(true);
                    setShow(false)
                    navigate('/home');
                } else {
                    setShow(true)
                    setValid(false);
                }
            })
            .catch(error => {
                setValid(false);
                console.error('Login failed:', error);
            });

    }
    /* Use this to login
    username: 'kminchelle',
    password: '0lelplR', */

    useEffect(() => {

        const token = sessionStorage.getItem("token");
        if (valid && token) {
            setShow(false)
            navigate('/home');
        }
        console.log(valid)
    }, [valid]);

    return (
        <div>

            <div className="flex justify-center items-center h-screen bg-gray-100">

                <Card className="p-10" shadow={true}>
                    <Typography variant="h4" color="blue-gray">
                        Sign In
                    </Typography>
                    <Typography color="gray" className="mt-1 font-normal">
                        Nice to meet you! Please enter your details .
                    </Typography>
                    <Typography color="red" className={show ? "mt-5 flex gap-1 font-semibold items-center" : "hidden"}>
                        <MdError />Incorrect username or password
                    </Typography>
                    <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                        <div className="mb-1 flex flex-col gap-6">
                            <Typography variant="h6" color="blue-gray" className="-mb-3"                >
                                Your Name
                            </Typography>
                            <Input
                                size="lg"
                                placeholder="your name"
                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                                onChange={(e) => { SetName(e.target.value) }}
                            />

                            <Typography variant="h6" color="blue-gray" className="-mb-3">
                                Password
                            </Typography>
                            <Input
                                type="password"
                                size="lg"
                                placeholder="********"
                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                                onChange={e => SetPassword(e.target.value)}
                            />
                        </div>
                        <Button className="mt-6" fullWidth onClick={handleClick}>
                            sign up
                        </Button>
                    </form>
                </Card>
            </div>
        </div>
    )
}

export default Login