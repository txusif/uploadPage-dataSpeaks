import { useState } from "react";
import AWS from "aws-sdk";

import getCurrentTimestamp from "../utils";

const UploadExcel = () => {
  const [selectedFile, setSelectedFile] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const uploadToS3 = () => {
    if (!selectedFile) {
      alert("Please select a file");
      return;
    }

    const allowedExtensions = [".xls", ".xlsx"];
    const fileName = selectedFile.name;
    const fileExtension = fileName.slice(
      ((fileName.lastIndexOf(".") - 1) >>> 0) + 2
    );

    if (!allowedExtensions.includes(`.${fileExtension.toLowerCase()}`)) {
      alert("Please select an Excel file (.xls or .xlsx)!");
      return;
    }

    const s3 = new AWS.S3({
      accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
      region: process.env.REACT_APP_S3_REGION,
    });

    const timestamp = getCurrentTimestamp();
    console.log(timestamp);
    const timestampKey = `${timestamp}/${selectedFile.name}`;
    const latestKey = `latest/${selectedFile.name}`;

    const paramsTimestamp = {
      Bucket: "exceltrial",
      Key: timestampKey,
      Body: selectedFile,
    };

    const paramsLatest = {
      Bucket: "exceltrial",
      Key: latestKey,
      Body: selectedFile,
    };

    s3.upload(paramsTimestamp, (errTimestamp, dataTimestamp) => {
      if (errTimestamp) {
        console.error(
          `Error occurred while uploading file to timestamp key: ${errTimestamp}`
        );
        alert(`Error occurred while uploading file to timestamp key.`);
      } else {
        console.log("File uploaded to timestamp key:", dataTimestamp);
        alert("File uploaded to timestamp key successfully!");
      }
    });

    s3.upload(paramsLatest, (errLatest, dataLatest) => {
      if (errLatest) {
        console.error(
          `Error occurred while uploading file to latest key: ${errLatest}`
        );
        alert(`Error occurred while uploading file to latest key.`);
      } else {
        console.log("File uploaded to latest key:", dataLatest);
        alert("File uploaded to latest key successfully!");
      }
    });
  };

  return (
    <div>
      <input
        type="file"
        onChange={handleFileChange}
        accept=".xls, .xlsx"
        className="text-lg"
      />
      <button
        onClick={uploadToS3}
        className="bg-[#fff] text-sm py-2 px-3 rounded-[5px] font-bold cursor-pointer uppercase"
      >
        Upload
      </button>
    </div>
  );
};

export default UploadExcel;
