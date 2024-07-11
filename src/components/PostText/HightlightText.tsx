import React from 'react';

interface HighlightTextProps {
  text: string;
}

const HighlightText: React.FC<HighlightTextProps> = ({ text }) => {
  // 정규식을 사용하여 문장을 나눕니다.
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap'}}>
      {sentences.map((sentence, index) => (
        <span 
            key={index} 
            className="block p-2 mb-2 font-semibold bg-gray-400 rounded bg-opacity-20 text-amber-800" style={{fontSize: '16px'}}
        >
          {sentence.trim()}
        </span>
      ))}
    </div>
  );
};

export default HighlightText;
