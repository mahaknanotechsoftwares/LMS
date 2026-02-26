import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

export default function CertificatePage() {
  const { id } = useParams(); // courseId or certificateId
  const [certificate, setCertificate] = useState(null);

  useEffect(() => {
    API.get(`/students/certificate/${id}`)
      .then(res => setCertificate(res.data))
      .catch(err => alert("Error fetching certificate: " + err.message));
  }, [id]);

  if (!certificate) return <p>Loading certificate...</p>;

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div className="border-4 border-blue-600 p-10 rounded-lg shadow-lg bg-white w-full md:w-2/3 text-center">
        <h1 className="text-3xl font-bold mb-4">Certificate of Completion</h1>
        <p className="mb-2">This certifies that</p>
        <h2 className="text-2xl font-semibold mb-2">{certificate.studentName}</h2>
        <p className="mb-2">has successfully completed the course</p>
        <h3 className="text-xl font-bold mb-2">{certificate.courseTitle}</h3>
        <p className="mb-4">Date: {new Date(certificate.issueDate).toLocaleDateString()}</p>
        <p className="text-sm text-gray-600">Certificate ID: {certificate.certificateId}</p>
      </div>

      <button
        onClick={() => window.print()}
        className="mt-6 bg-green-600 text-white px-4 py-2 rounded"
      >
        Download / Print
      </button>
    </div>
  );
}