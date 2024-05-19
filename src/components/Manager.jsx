import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    useEffect(() => {
        const passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords));
        }
    }, []);
    

    const copyPassword = (text) => {
        toast('Copied to clipboard!!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        navigator.clipboard.writeText(text);
    }

    const showPassword = () => {
        passwordRef.current.type = "text"
        if (ref.current.src.includes("Icons/hide.png")) {
            ref.current.src = "Icons/eye.png"
            passwordRef.current.type = "password"
        }
        else {
            ref.current.src = "Icons/hide.png"
            // passwordRef.current.type="password"
        }

    }
    const savePassword = () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            const newPasswordArray = [...passwordArray, { ...form, id: uuidv4() }];
            setPasswordArray(newPasswordArray);
            localStorage.setItem("passwords", JSON.stringify(newPasswordArray)); // Corrected key
            console.log(...passwordArray, form);
            setform({ site: "", username: "", password: "" });
            toast('Password saved!!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            toast('Fields must not be empty!');
        }
    }
    

    const deletePassword = (id) => {
        console.log("Deleting password with id: " + id);
        const updatedPasswordArray = passwordArray.filter(item => item.id !== id);
        setPasswordArray(updatedPasswordArray);
        localStorage.setItem("passwords", JSON.stringify(updatedPasswordArray)); // Corrected key
    }
    
    const editPassword = (id) => {
        console.log("Editing password with id: "+id)
        setform(passwordArray.filter(i=>i.id === id)[0]);
        setPasswordArray(passwordArray.filter(item=> item.id!== id))
        
    }
    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            {/* Same as */}
            <ToastContainer />
            <div className="absolute inset-0 -z-10 h-full w-full bg-blue-50 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div></div>

            <div className="p-2 pt-10 md:mycontainer min-h-[87.2vh]">
                <h1 className='text-4xl text font-bold text-center'>
                    <span className="text-green-600">&lt;</span>
                    Pass
                    <span className='text-green-600'>OP/ &gt;</span></h1>
                <p className='text-green-700 text-lg text-center'>Your own Password Manager</p>

                <div className='text-white flex flex-col p-4 gap-9 items-center'>
                    <input value={form.site} onChange={handleChange} name='site' placeholder='Enter Website URL' className='rounded-full border border-blue-500 w-full text-black p-4 py-1' type="text" />

                    <div className="flex flex-col md:flex-row w-full gap-9 justify-between">
                        <input value={form.username} onChange={handleChange} name='username' placeholder='Enter Email or Username' className='rounded-full border border-blue-500 w-full text-black p-4 py-1' type="text" />
                        <div className="relative">

                            <input ref={passwordRef} value={form.password} onChange={handleChange} name='password' placeholder='Enter Password' className='rounded-full border border-blue-500 w-full text-black p-4 py-1' type="password" />
                            <span className='absolute right-1 top-1 cursor-pointer' onClick={showPassword}>
                                <img ref={ref} className='p-1' width={26} src="Icons/eye.png" alt="" />
                            </span>
                        </div>
                    </div>

                    <button onClick={savePassword} className='flex justify-center items-center gap-3 bg-blue-200 rounded-full px-4 py-2 w-fit border-blue-500 border hover:bg-blue-300 text-black font-semibold'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover"
                        >
                        </lord-icon>
                        Add Password
                    </button>
                </div>
                <div className="container">
                    <h2 className='font-bold text-2xl pb-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No passwords to show</div>}
                    {passwordArray.length != 0 && <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-10">
                        <table className="w-full text-sm rtl:text-right text-gray-500 dark:text-gray-400 text-center">
                            <thead className="text-xs text-gray-700 uppercase bg-blue-300 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3 border border-white">
                                        Website URL
                                    </th>
                                    <th scope="col" className="px-6 py-3 border border-white">
                                        Username
                                    </th>
                                    <th scope="col" className="px-6 py-3 border border-white">
                                        Passwords
                                    </th>
                                    <th scope="col" className="px-6 py-3 border border-white">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {passwordArray.map((item, index) => {
                                    return <tr key={index} className="odd:bg-blue-50 even:bg-blue-100 border-b">
                                        <td className="px-6 py-4 border border-white">
                                            <div className='flex justify-center items-center'>

                                                <a href={item.site} target='_blank'>{item.site}</a>
                                                <div className='lordiconcopy size-7 cursor-pointer px-2 pt-1' onClick={() => { copyPassword(item.site) }}>
                                                    <lord-icon
                                                        style={{ "width": "25px", "height": "25px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover" >
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 border border-white">
                                            <div className='flex justify-center items-center'>
                                                {item.username}
                                                <div className='lordiconcopy size-7 cursor-pointer px-2 pt-1' onClick={() => { copyPassword(item.username) }}>
                                                    <lord-icon
                                                        style={{ "width": "25px", "height": "25px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover" >
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 border border-white">
                                            <div className='flex justify-center items-center'>
                                                {item.password}
                                                <div className='lordiconcopy size-7 cursor-pointer px-2 pt-1' onClick={() => { copyPassword(item.password) }}>
                                                    <lord-icon
                                                        style={{ "width": "25px", "height": "25px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover" >
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 border border-white">
                                            <span className='cursor-pointer mx2' onClick={() => { editPassword(item.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/gwlusjdu.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px" }}>
                                                </lord-icon>
                                            </span>
                                            <span className='cursor-pointer mx2' onClick={() => { deletePassword(item.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px" }}>
                                                </lord-icon>
                                            </span>
                                        </td>

                                    </tr>
                                })}

                            </tbody>
                        </table>
                    </div>}


                </div>
            </div >
        </>

    )
}

export default Manager