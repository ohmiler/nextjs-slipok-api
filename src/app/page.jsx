"use client"

import { useState, useEffect } from 'react'
import Image from "next/image";

export default function Home() {

  const [slipOkData, setSlipOkData] = useState([]);
  const [files, setFiles] = useState("");

  const handleFile = (e) => {
    setFiles(e.target.files[0]);
  }

  console.log("Select files: ", files);

  const handleSubmit = async (e) => {

    e.preventDefault();

    const formData = new FormData();
    formData.append("files", files);

    try {

      const res = await fetch("", {
        method: "POST",
        headers: {
          "x-authorization": ""
        },
        body: formData
      })

      if (res.ok) {
        console.log("Request successful");
      } else {
        throw new Error("Failed to send a request");
      }

      const data = await res.json();
      setSlipOkData(data.data)
      console.log("Slipok data: ", data);

    } catch(error) {
      console.log("Error during fetching data: ", error);
    }

  }

  
  return (
    <main className='container mx-auto my-5'>
      <h3 className='text-3xl'>NextJS & SlipOk เช็คสลิปโอนเงินอัตโนมัติด้วย AI</h3>
      <form onSubmit={handleSubmit}>
        <input className='block my-3' type="file" accept='image/*' onChange={handleFile} />
        <button className='bg-gray-500 text-white p-2 rounded-md' type='submit'>Check Slip</button>
        <img src={files && URL.createObjectURL(files)} alt="slip" width={300} />
        <hr className='my-3' />
        {/* {slipOkData?.success === true ? (
          <p className='bg-green-500 text-white p-3 rounded-md'>สลิปโอนเงินถูกต้อง</p>
        ) : (
          <p className='bg-red-500 text-white p-3 rounded-md'>สลิปโอนเงินไม่ถูกต้อง</p>
        )}
        <p>ผู้รับโอนเงิน: {slipOkData?.receiver?.displayName}</p>
        <p>ธนาคารผู้รับเงิน: {slipOkData?.receivingBank === "004" ? "ธนาคารกสิกรไทย" : null}</p>
        <p>ธนาคารผู้โอนเงิน: {slipOkData?.sendingBank === "002" ? "ธนาคารกรุงเทพ" : null}</p> */}
        <p>วันที่โอนเงิน : {slipOkData?.transDate}</p>
        <p>เวลาที่โอนเงิน : {slipOkData?.transTime}</p>
        <p>จำนวนเงิน: {slipOkData?.amount}</p>
      </form>
    </main>
  );
}
