import HighlightText from "./HightlightText";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useStore } from "../../../store";

interface ImageWithTextProps {
  prescriptionId: number;
}

const ImageWithText: React.FC<ImageWithTextProps> = ({ prescriptionId }) => {
  const { nickname } = useStore();
  const [mentorId, setMentorId] = useState<number | null>(null); // 멘토 ID를 저장할 상태 추가
  const [summaryText, setSummaryText] = useState<string>("");

  useEffect(() => {
    const fetchMentorId = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/prescriptions/${prescriptionId}?user_id=1`
        );
        setMentorId(response.data.mentor_id);
        console.log("멘토아이디는", response.data.mentor_id);
      } catch (error) {
        console.error("Error fetching 멘토 ID:", error);
      }
    };

    const fetchPrescription = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/prescriptions/${prescriptionId}?user_id=1`
        );

        setSummaryText(response.data.content); // 가져온 처방전의 내용을 summaryText에 설정
        console.log("처방전 ID는", response.data.id); // prescription.id 출력
      } catch (error) {
        console.error("Error fetching prescription:", error);
      }
    };

    fetchMentorId();
    fetchPrescription();
  }, [prescriptionId]);

  return (
    <div className="absolute" style={{ zIndex: 1, width: "710px" }}>
      <p
        className="mb-16 text-3xl font-bold text-amber-700"
        style={{ marginLeft: "15px", paddingLeft: "3px" }}
      >
        {nickname}
      </p>
      <HighlightText text={summaryText} />
      <p
        className="text-3xl font-bold mt-14 text-amber-700"
        style={{
          textAlign: "right",
          marginRight: "30px",
          paddingRight: "15px",
          paddingBottom: "10px",
        }}
      >
        {mentorId !== null ? `멘토 ID: ${mentorId}` : "멘토 ID 없음"}{" "}
        {/* 멘토 ID 표시 */}
      </p>
    </div>
  );
};

export default ImageWithText;
