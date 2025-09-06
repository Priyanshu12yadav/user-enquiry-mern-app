import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { Button, Checkbox, Label, Textarea, TextInput } from "flowbite-react";
import { EnquiryList } from "./EnquiryList";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

export default function Enquiry() {
  let [enquiryList, setEnquiryList] = useState([]);
  let [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    _id: "",
  });

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      message: "",
      _id: "",
    });
  };

  // //let saveEnquiry = (e) => {
  //   e.preventDefault();
  //   console.log("Enquiry saved");
  //   //alert("Enquiry saved");

  //   //THIS IS THE CODE FOR CRUD OPERATION
  //   const formData = {
  //     name: e.target.name.value,
  //     email: e.target.email.value,
  //     message: e.target.message.value,
  //   };

  //   if(formData._id){
  //     axios.put(`http://localhost:9520/api/website/enquiry/update/${formData._id}`, formData)
  //     .then((res)=>{
  //       console.log(res.data)
  //       toast.success("Enquiry Updated Successfully")
  //       setFormData({
  //         name:"",
  //         email:"",
  //         message:"",
  //         _id:""
  //       })
  //       getAllenquiries()
  //     })

  //   }
  //   else{axios
  //     .post("http://localhost:9520/api/website/enquiry/insert", formData)
  //     .then((res) => {
  //       console.log(res.data);
  //       toast.success("Enquiry saved successfully!");
  //       setFormData({
  //         name: "",
  //         email: "",
  //         message: "",
  //       });
  //       getAllenquiries()
  //     });
  // };

let saveEnquiry = (e) => {
    e.preventDefault();
    console.log("Submitting form...");

    // The data, including the _id for updates, is already in the `formData` state.
    // We check the state variable directly.
    if (formData._id) {
      // This is an UPDATE operation
      axios.put(`http://localhost:9520/api/website/enquiry/update/${formData._id}`, formData)
        .then((res) => {
          console.log(res.data);
          toast.success("Enquiry Updated Successfully");
          setFormData({ name: "", email: "", message: "", _id: "" }); // Reset form
          getAllenquiries();
        })
        .catch(err => {
          console.error(err);
          toast.error("Failed to update enquiry.");
        });
    } else {
      // This is a CREATE (insert) operation
      axios.post("http://localhost:9520/api/website/enquiry/insert", formData)
        .then((res) => {
          console.log(res.data);
          toast.success("Enquiry saved successfully!");
          setFormData({ name: "", email: "", message: "", _id: "" }); // Reset form
          getAllenquiries();
        })
        .catch(err => {
          console.error(err);
          toast.error("Failed to save enquiry.");
        });
    }
  };

// Make sure axios is imported at the top of the file
    // import axios from "axios";
    

  let getAllenquiries = () => {
    axios.get("http://localhost:9520/api/website/enquiry/view")
      .then((res) => {
        return res.data;
      })
      .then(finalData => {
        if(finalData.status){
          setEnquiryList(finalData.enquiryList);
        }
      });
  };

  let getValue = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    let oldData = { ...formData };
    oldData[inputName] = inputValue;
    setFormData(oldData);
  };

  useEffect(() => {
    getAllenquiries();
  },[]);

  // ... imports and functions

return (
    <div className="bg-slate-50 min-h-screen text-slate-800">
      <ToastContainer />
      <header className="py-10">
        <h1 className="text-4xl md:text-5xl text-center font-bold text-slate-700">Enquiry Management</h1>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-[35%_auto] gap-8">
          
          {/* FORM CARD */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-5">
              {formData._id ? 'Edit Enquiry' : 'Add New Enquiry'}
            </h2>
            <form action="" onSubmit={saveEnquiry} className="space-y-4">
              <div>
                <label className="block mb-1.5 font-semibold text-slate-600" htmlFor="name">
                  Name:
                </label>
                <input
                  className="border border-slate-300 p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={getValue}
                  name="name"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block mb-1.5 font-semibold text-slate-600" htmlFor="email">
                  Email:
                </label>
                <input
                  className="border border-slate-300 p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={getValue}
                  name="email"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block mb-1.5 font-semibold text-slate-600" htmlFor="message">
                  Message:
                </label>
                <textarea
                  className="border border-slate-300 p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  id="message"
                  value={formData.message}
                  onChange={getValue}
                  name="message"
                  rows={4}
                  placeholder="Enter your message"
                ></textarea>
              </div>
              <div className="flex space-x-3 pt-2">
                <button
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-700 transition-colors"
                  type="submit"
                >
                  {formData._id ? 'Update Enquiry' : 'Save Enquiry'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="w-full bg-slate-200 text-slate-700 py-2 px-4 rounded-md font-semibold hover:bg-slate-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>

          {/* Pass props to EnquiryList */}
          <EnquiryList data={enquiryList} getAllenquiries={getAllenquiries} setFormData={setFormData} />
        </div>
      </main>
    </div>
  );
   
}
