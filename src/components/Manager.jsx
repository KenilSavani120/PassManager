import React, { useState, useEffect } from "react";

function Manager() {
  const [showpass, setShowpass] = useState(false);
  const [form, setForm] = useState({
    site: "",
    username: "",
    password: "",
  });

  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("password");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
  };

  const savePassword = () => {
    const updatedPasswordArray = [...passwordArray, form];
    setPasswordArray(updatedPasswordArray);
    localStorage.setItem("password", JSON.stringify(updatedPasswordArray));
    console.log(...passwordArray, form);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
      </div>

      <div className="mycontainer">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-500">&lt;</span>
          Pass
          <span className="text-green-500">OP/&gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center ">
          Your Own Password Manager
        </p>

        <div className="flex flex-col p-4 text-black gap-5 items-center">
          <input
            placeholder="Enter Website URL"
            className="rounded-full border border-green-500 p-4 py-1 w-full"
            type="text"
            value={form.site}
            onChange={handleChange}
            name="site"
            id=""
          />
          <div className="flex w-full justify-between gap-8">
            <input
              placeholder="Enter User Name"
              className="rounded-full border border-green-500 p-4 py-1 w-full"
              type="text"
              value={form.username}
              onChange={handleChange}
              name="username"
              id=""
            />
            <div className="relative">
              <input
                placeholder="Enter Password"
                className="rounded-full border border-green-500 p-4 py-1 w-full"
                type={showpass ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                name="password"
                id=""
              />
              <button
                onClick={() => {
                  setShowpass(!showpass);
                }}
              >
                <span className="absolute right-1 top-0 bottom-0 pt-1 pr-1">
                  {showpass ? (
                    <img
                      className="w-6 cursor-pointer"
                      src="/hidden.png"
                      alt="eye"
                    />
                  ) : (
                    <img
                      className="w-6 cursor-pointer"
                      src="/eye.png"
                      alt="eye"
                    />
                  )}
                </span>
              </button>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="flex justify-center items-center bg-green-400 hover:bg-green-500 rounded-full px-4 py-2 w-fit gap-4 border border-2-green-900"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Add Password
          </button>
        </div>

        <div className="passwords">
          <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No Passwords</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-lg md:overflow-hidden">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td
                        className="py-2 border border-white text-center"
                        onClick={() => {
                          copyText(item.site);
                        }}
                      >
                        <div className="flex items-center justify-center">
                          {item.site}
                          <div className="size-7 cursor-pointer">
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/depeqmsz.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td
                        className="py-2 border border-white text-center"
                        onClick={() => {
                          copyText(item.username);
                        }}
                      >
                        <div className="flex items-center justify-center">
                          <span>{item.username}</span>
                          <div className="lordiconcopy size-7 cursor-pointer">
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/depeqmsz.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td
                        className="py-2 border border-white text-center"
                        onClick={() => {
                          copyText(item.password);
                        }}
                      >
                        <div className="flex items-center justify-center">
                          <span>{item.password}</span>
                          <div className="lordiconcopy size-7 cursor-pointer">
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/depeqmsz.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}

export default Manager;
