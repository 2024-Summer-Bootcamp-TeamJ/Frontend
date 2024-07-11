import baekImage from './assets/images/Baek.svg';
import ohImage from './assets/images/oh.svg';
import shinImage from './assets/images/shin.svg';

export const themes = {
  baek: {
    mentorNameBg: '#F7F48D',
    chatMessageBg: '#FFF9DD',
    characterImage: baekImage
  },
  oh: {
    mentorNameBg: '#CF8EC5',
    chatMessageBg: '#F3E4F7',
    characterImage: ohImage
  },
  shin: {
    mentorNameBg: '#79BFE7',
    chatMessageBg: '#AED5EB',
    characterImage: shinImage
  }
};

export type Theme = typeof themes.oh;