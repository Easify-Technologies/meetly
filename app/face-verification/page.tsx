"use client";

import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import Image from "next/image";

export default function Page() {
  const webcamRef = useRef(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  // 📁 Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
    setStatus(""); // clear old status
  };

  // 📸 Capture from webcam
  const capturePhoto = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (!imageSrc) return alert("No image captured!");
    const file = dataURItoFile(imageSrc, "user_photo.jpg");
    setSelectedFile(file);
    setPreview(imageSrc);
    setStatus(""); // clear old status
  };

  // 🚀 Submit for verification
  const handleVerify = async () => {
    if (!selectedFile) return alert("Please capture or upload a photo first!");

    setLoading(true);
    setStatus("Verifying...");

    try {
      const formData = new FormData();
      formData.append("user_image", selectedFile);

      const res = await axios.post("/api/verify-face", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.verified) {
        setStatus(`✅ ${res.data.message}`);
      } else {
        setStatus(`❌ ${res.data.message}`);
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Verification failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // 🔄 Reset everything
  const handleReset = () => {
    setPreview(null);
    setSelectedFile(null);
    setStatus("");
  };

  // Helper: base64 → File
  const dataURItoFile = (dataURI, filename) => {
    const arr = dataURI.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n);
    return new File([u8arr], filename, { type: mime });
  };

  return (
    <div className="flex flex-col items-center gap-6 mt-10">
      <h1 className="text-2xl font-semibold">Face ID Verification</h1>

      {/* Webcam Capture */}
      <div className="flex flex-col items-center gap-3">
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="rounded-lg border w-72 h-72 object-cover"
          videoConstraints={{ facingMode: "user" }}
        />
        <button
          onClick={capturePhoto}
          className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700"
        >
          Capture from Webcam
        </button>
      </div>

      <div className="text-gray-500 text-sm">OR</div>

      {/* File Upload */}
      <div className="flex flex-col items-center">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="border rounded-full px-4 py-2 cursor-pointer"
        />
      </div>

      {/* Preview */}
      {preview && (
        <div className="mt-4 flex flex-col items-center">
          <p className="text-sm text-gray-600 mb-2">Preview:</p>
          <Image
            src={preview}
            width={100}
            height={100}
            alt="Preview"
            className="w-48 h-48 object-cover rounded-lg border"
          />
          <button
            onClick={handleReset}
            className="mt-3 bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-600"
          >
            Reset
          </button>
        </div>
      )}

      {/* Verify Button */}
      <button
        onClick={handleVerify}
        disabled={loading || !selectedFile}
        className="mt-5 bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? "Verifying..." : "Verify Face"}
      </button>

      {status && (
        <p
          className={`text-lg font-medium mt-3 ${
            status.includes("✅") ? "text-green-600" : "text-red-600"
          }`}
        >
          {status}
        </p>
      )}
    </div>
  );
}
