import React from 'react';
import { useTheme } from '../../ThemeContext';

const CharacterImage = () => {
  const { theme } = useTheme();
  console.log('CharacterImage theme:', theme);

  return (
    <div className="w-[100px] h-[100px] rotate-[12deg]">
      <img src={theme.characterImage} alt="캐릭터" className="w-full h-full" />
    </div>
  );
};

export default CharacterImage;