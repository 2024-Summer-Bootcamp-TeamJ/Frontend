import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Member {
  id: number;
  nickName: string;
}

interface Mentor {
  id: number;
  name: string;
  description: string;
  frontCharImage: string;
  frontCardImage: string;
  backImage: string;
  choosingButtonImage: string;
}

interface Chatroom {
  id: number;
  userId: number;
  mentorId: number;
}

interface AppState {
  members: Member[];
  mentors: Mentor[];
  chatrooms: Chatroom[];
  nickname: string;
  memberId: number | null;
  userId: number | null;
  setNickname: (nickname: string) => void;
  setMemberId: (memberId: number) => void;
  setMembers: (members: Member[]) => void;
  setUserId: (userId: number) => void;
  setMentors: (mentors: Mentor[]) => void;
  setChatrooms: (chatrooms: Chatroom[]) => void;
  deleteChatroom: (chatroomId: number) => void;
}

const useStore = create<AppState>()(
  persist(
    (set) => ({
      nickname: "",
      members: [],
      mentors: [],
      chatrooms: [],
      memberId: null,
      userId: null,

      setNickname: (nickname) => set({ nickname }),
      setMemberId: (memberId) => set({ memberId }),
      setMembers: (members) => set({ members }),
      setUserId: (userId) => set({ userId }),
      setMentors: (mentors) => set({ mentors }),
      setChatrooms: (chatrooms) => set({ chatrooms }),

      deleteChatroom: (chatroomId) => {
        set((state) => ({
          chatrooms: state.chatrooms.filter((chatroom) => chatroom.id !== chatroomId),
        }));
      },

      resetState: () => {
        set({
          nickname: "",
          memberId: null,
          members: [],
          mentors: [],
          chatrooms: [],
          userId: null,
        });
      },
    }),
    {
      name: "user-store",
      storage: {
        getItem: (name) => {
          const value = localStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          localStorage.removeItem(name);
        },
      },
    }
  )
);

export { useStore };
