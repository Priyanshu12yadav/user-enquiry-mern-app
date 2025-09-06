import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableHeadCell,
  TableBody,
  TableCell,
} from "flowbite-react";
import axios from "axios";
import { toast } from "react-toastify";

// export function EnquiryList({ data, onDelete, getAllenquiries, setFormData}) {
//   let deleteRow=(delid)=>{
//     axios.delete(`http://localhost:9520/api/website/enquiry/delete/${delid}`)
//     .then((res)=>{
//       toast.success("Enquiry deleted successfully!");
//     alert(delid);
//     getAllenquiries();
//     })
//   }
// let editRow=(editid)=>{
  //   axios.get(`http://localhost:9520/api/website/enquiry/single/${editid}`)
  //   .then((res)=>{
  //     let data=res.data
  //     setFormData(data.enquiry)
  //   })
  //   alert(edited);
  // }

export function EnquiryList({ data, getAllenquiries, setFormData }) {
  let deleteRow = (delid) => {
    // Add a confirmation dialog before proceeding
    if (window.confirm("Are you sure you want to delete this record?")) {
      axios.delete(`http://localhost:9520/api/website/enquiry/delete/${delid}`)
        .then((res) => {
          toast.success("Enquiry deleted successfully!");
          getAllenquiries();
        })
        .catch(err => {
          console.error(err);
          toast.error("Failed to delete enquiry.");
        });
    }
  };

  let editRow = (editid) => {
    axios.get(`http://localhost:9520/api/website/enquiry/single/${editid}`)
      .then((res) => {
        let data = res.data;
        setFormData(data.enquiry);
      });
  };
  
return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-5">Current Enquiries</h2>
      <div className="overflow-x-auto">
        <Table hoverable> 
          <TableHead>
            <TableHeadCell>Sr No</TableHeadCell>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Email</TableHeadCell>
            <TableHeadCell>Message</TableHeadCell>
            <TableHeadCell><span className="sr-only">Actions</span></TableHeadCell>
          </TableHead>

          <TableBody className="divide-y">
            {
              data.length >= 1 ? 
                data.map((item, index) => (
                  <TableRow key={item._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <TableCell className="font-medium text-slate-600">{index + 1}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.message}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <button onClick={() => editRow(item._id)} className='font-medium text-blue-600 hover:underline'>Edit</button>
                        <button onClick={() => deleteRow(item._id)} className='font-medium text-red-600 hover:underline'>Delete</button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              :
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6 text-slate-500">
                    No Enquiries Found
                  </TableCell>
                </TableRow>
            }
          </TableBody>
        </Table>
      </div>
    </div>
  );

}
