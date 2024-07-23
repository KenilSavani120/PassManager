import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

function Manager() {
  const [showpass, setShowpass] = useState(false);
  // it is for showing and hiding passwords
  const [form, setForm] = useState({
    site: "",
    username: "",
    password: "",
  });
  // it is form useState saving passwords in form

  const [passwordArray, setPasswordArray] = useState([]);
  // it is for saving passwords in array
  const navigate = useNavigate();
  // it is for navigating to other pages

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/");
      return;
    }
    let passwords = localStorage.getItem("password");

    try {
      const parsedPasswords = JSON.parse(passwords);
      if (Array.isArray(parsedPasswords)) {
        setPasswordArray(parsedPasswords);
      }
    } catch (e) {
      console.error("Error parsing passwords from localStorage", e);
      setPasswordArray([]);
    }
  }, [navigate]);
  // it is for checking if user is logged in or not
  // it is for getting passwords from local storage and setting them in passwordArray

  const copyText = (text) => {
    toast("Copied to Clipboard!", {
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
  };
  // it is for copying passwords to clipboard

  const savePassword = () => {
    const updatedPasswordArray = [...passwordArray, { ...form, id: uuidv4() }];
    setPasswordArray(updatedPasswordArray);
    localStorage.setItem("password", JSON.stringify(updatedPasswordArray));
    setForm({
      site: "",
      username: "",
      password: "",
    });
  };
  // it is for saving passwords to local storage and passwordArray

  const deletePassword = (id) => {
    const updatedPasswordArray = passwordArray.filter((item) => item.id !== id);
    setPasswordArray(updatedPasswordArray);
    localStorage.setItem("password", JSON.stringify(updatedPasswordArray));
  };
  // it is for deleting passwords from local storage and passwordArray

  const editPassword = (id) => {
    const passwordToEdit = passwordArray.find((item) => item.id === id);
    setForm(passwordToEdit);
    const updatedPasswordArray = passwordArray.filter((item) => item.id !== id);
    setPasswordArray(updatedPasswordArray);
    localStorage.setItem("password", JSON.stringify(updatedPasswordArray));
  };
  // it is for editing passwords from local storage and passwordArray
  // it's also jump to savePassword function

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  // it is for handling changes in form fields

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
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        {" "}
        // this is for grid bg , used form ibelick
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center">
          <span className="text-green-500">&lt;</span>
          Pass
          <span className="text-green-500">OP/&gt;</span>{" "}
          {/* logo and MAIN NAME*/}
        </h1>
        <p className="text-green-900 text-base md:text-lg text-center mt-2">
          Your Own Password Manager
        </p>

        <div className="flex flex-col p-4 text-black gap-5 items-center mt-6">
          <input
            placeholder="Enter Website URL" // for website url field
            className="rounded-full border border-green-500 p-2 w-full max-w-md"
            type="text"
            value={form.site} // it goes or submit data to in from for saving in localstorage
            onChange={handleChange}
            name="site"
          />
          <div className="flex flex-col md:flex-row w-full max-w-md gap-4">
            <input
              placeholder="Enter User Name"
              className="rounded-full border border-green-500 p-2 w-full"
              type="text"
              value={form.username} // it goes or submit data to in from for saving in localstorage
              onChange={handleChange}
              name="username"
            />
            <div className="relative w-full">
              <input
                placeholder="Enter Password"
                className="rounded-full border border-green-500 p-2 w-full pr-10"
                type={showpass ? "text" : "password"} // of hide is selected than it is act like text otherwise password
                value={form.password} // it goes or submit data to in from for saving in localstorage
                onChange={handleChange}
                name="password"
              />
              <button
                onClick={() => setShowpass(!showpass)} // it is for showing and hinding password
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <img
                  className="w-5 h-5"
                  src={showpass ? "/hidden.png" : "/eye.png"}
                  alt="toggle password visibility"
                />
              </button>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="flex justify-center items-center bg-green-400 hover:bg-green-500 rounded-full px-6 py-2 mt-4"
          >
            {/* save btn used form load icon*/}
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
              style={{ width: "25px", height: "25px" }}
            ></lord-icon>
            <span className="ml-2">Save</span>
          </button>
        </div>

        <div className="passwords mt-8">
          <h2 className="font-bold text-xl md:text-2xl py-4">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No Passwords</div>}{" "}
          {/* if pass is saved than shows password otherwise shows no passwords*/}
          {passwordArray.length > 0 && (
            <div className="overflow-y-auto max-h-96">
              <table className="table-auto w-full rounded-lg">
                {/* table for showing passwords*/}
                <thead className="bg-green-800 text-white">
                  <tr>
                    <th className="py-2 px-4">Site</th>
                    <th className="py-2 px-4">Username</th>
                    <th className="py-2 px-4">Password</th>
                    <th className="py-2 px-4">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-green-100">
                  {passwordArray.map((item, index) => (
                    <tr key={index}>
                      {/* index showing how many passwords are saved*/}
                      <td className="py-2 px-4 border border-white">
                        <div className="flex items-center justify-between">
                          <span className="truncate mr-2">{item.site}</span>
                          {/* truncate = it's hide the overflow of element , text overflow to ellipsis for hiding extra texts and it's shows ..., white space is nowrap */}
                          <button onClick={() => copyText(item.site)}>
                            {/*this is copy btn */}
                            <lord-icon
                              src="https://cdn.lordicon.com/depeqmsz.json"
                              trigger="hover"
                              style={{ width: "20px", height: "20px" }}
                            ></lord-icon>
                          </button>
                        </div>
                      </td>
                      <td className="py-2 px-4 border border-white">
                        <div className="flex items-center justify-between">
                          <span className="truncate mr-2">{item.username}</span>
                          <button onClick={() => copyText(item.username)}>
                            <lord-icon
                              src="https://cdn.lordicon.com/depeqmsz.json"
                              trigger="hover"
                              style={{ width: "20px", height: "20px" }}
                              // Double curly is used for inline css style
                            ></lord-icon>
                          </button>
                        </div>
                      </td>
                      <td className="py-2 px-4 border border-white">
                        <div className="flex items-center justify-between">
                          <span className="truncate mr-2">{item.password}</span>
                          <button onClick={() => copyText(item.password)}>
                            <lord-icon
                              src="https://cdn.lordicon.com/depeqmsz.json"
                              trigger="hover"
                              style={{ width: "20px", height: "20px" }}
                            ></lord-icon>
                          </button>
                        </div>
                      </td>
                      <td className="py-2 px-4 border border-white">
                        <div className="flex justify-center space-x-2">
                          <button onClick={() => editPassword(item.id)}>
                            <lord-icon
                              src="https://cdn.lordicon.com/gwlusjdu.json"
                              trigger="hover"
                              style={{ width: "20px", height: "20px" }}
                            ></lord-icon>
                          </button>
                          <button onClick={() => deletePassword(item.id)}>
                            <lord-icon
                              src="https://cdn.lordicon.com/jmkrnisz.json"
                              trigger="hover"
                              style={{ width: "20px", height: "20px" }}
                            ></lord-icon>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Manager;
