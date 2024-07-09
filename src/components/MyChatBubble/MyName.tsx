import React from 'react';
import { useTheme } from '../../ThemeContext';

const MyName = () => {
  const { theme } = useTheme();
  console.log('MyName theme:', theme);

  return (
    <div
      className="w-[110px] h-[35px] rounded-[20px] rotate-[6deg] flex justify-center items-center text-sm"
      style={{ backgroundColor: theme.mentorNameBg }}
    >
      멘토
    </div>
  );
};

export default MyName;
