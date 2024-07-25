import HighlightText from "./HightlightText";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useStore } from "../../store/store";

interface ImageWithTextProps {
  prescriptionId: number;
}

const ImageWithText: React.FC<ImageWithTextProps> = ({ prescriptionId }) => {
  const { nickname, userId } = useStore();
  const [mentorId, setMentorId] = useState<number | null>(null);
  const [summaryText, setSummaryText] = useState<string>("");

  useEffect(() => {
    const fetchMentorId = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/prescriptions/${prescriptionId}?user_id=${userId}`
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
          `${import.meta.env.VITE_API_URL}/prescriptions/${prescriptionId}?user_id=${userId}`
        );

        setSummaryText(response.data.content);
        console.log("처방전 ID는", response.data.id);
      } catch (error) {
        console.error("Error fetching prescription:", error);
      }
    };

    if (userId) {
      fetchMentorId();
      fetchPrescription();
    }
  }, [prescriptionId, userId]);

  const getMentorName = (id: number | null) => {
    switch (id) {
      case 1:
        return "백곰원";
      case 2:
        return "오은양";
      case 3:
        return "신문엽";
      default:
        return "뉘슈?";
    }
  };

  return (
    <div
      className="absolute flex flex-col justify-between"
      style={{
        zIndex: 1,
        width: "90%",
        height: "60%",
        padding: "10%",
        boxSizing: "border-box",
      }}
    >
      <p className="mb-4 text-xl font-bold text-amber-700">
        {nickname} 님
      </p>
      <div className="flex-grow">
        <HighlightText text={summaryText} />
      </div>
      <p
        className="text-xl font-bold text-amber-700"
        style={{
          textAlign: "right",
          paddingBottom: "10px",
        }}
      >
        {mentorId !== null ? ` ${getMentorName(mentorId)} 드림` : ""}
      </p>
    </div>
  );
};

export default ImageWithText;
