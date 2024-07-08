import React from 'react';
import ohCharacter from '/Users/jangjeongwoon/Frontend-1/src/assets/images/beak.svg';

const CharacterImage = () => {
  return (
    <div className="w-[100px] h-[100px] rotate-[12deg]">
      <img src={ohCharacter} alt="캐릭터" className="w-full h-full" />
    </div>
  );
};

export default CharacterImage;
