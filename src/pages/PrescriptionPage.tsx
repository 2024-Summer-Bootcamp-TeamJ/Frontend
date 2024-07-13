import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../index.css";
import ImageWithText from "@components/PostText/ImageWithText";
import { Link } from "react-router-dom";
import IconToMyPage from "../assets/images/IconToMyPage.svg";

const PrescriptionPage: React.FC = () => {
  const { prescription_id } = useParams<{ prescription_id: string }>();
  const [prescription, setPrescription] = useState<any>(null);

  useEffect(() => {
    const fetchPrescription = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/prescriptions/${prescription_id}?user_id=1`
        );
        setPrescription(response.data);
      } catch (error) {
        console.error("Error fetching prescription:", error);
      }
    };

    fetchPrescription();
  }, [prescription_id]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        width: "100vw",
        height: "100vh",
      }}
    >
      <img
        src="src/assets/images/backgroundGreen.svg"
        alt="prescription"
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
          backgroundSize: "cover",
        }}
      />
      <img
        src="src/assets/images/prescription.svg"
        alt="postcard"
        style={{
          position: "absolute",
          width: "100%",
          height: "80%",
          zIndex: 1,
        }}
      />
      {prescription && (
        <div style={{ position: "absolute", zIndex: 2 }}>
          <h1>{prescription.content}</h1>
          <p>작성일: {new Date(prescription.created_at).toLocaleString()}</p>
          <p>수정일: {new Date(prescription.updated_at).toLocaleString()}</p>
        </div>
      )}
      <ImageWithText prescriptionId={Number(prescription_id)} />{" "}
      {/* prescription_id를 number로 변환하여 전달 */}
      {/* prescription_id 전달 */}
      <div className="absolute bottom-4 right-4">
        <Link to="/mypage">
          <img
            src={IconToMyPage}
            alt="마이페이지 이동 아이콘"
            className="w-12 h-12 cursor-pointer"
            draggable="false"
          />
        </Link>
      </div>
    </div>
  );
};

export default PrescriptionPage;
