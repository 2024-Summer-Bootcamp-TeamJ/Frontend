import { create, StateCreator } from "zustand";
import { persist, PersistStorage } from "zustand/middleware";

// 인터페이스 정의
interface Member {
  id: number;
  nickName: string;
}

interface AppState {
  members: Member[];
  nickname: string;
  memberId: number | null;
  setNickname: (nickname: string) => void;
  setMemberId: (memberId: number) => void;
  setMembers: (members: Member[]) => void;
}

interface StoreState extends AppState {
  resetState: () => void;
}

// localStorage를 PersistStorage 타입으로 변환하는 함수
const storage: PersistStorage<StoreState> = {
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
};

// Zustand 상태 생성기
const stateCreator: StateCreator<StoreState> = (set, get) => ({
  nickname: "",
  members: [],
  memberId: null,
  // 닉네임 저장
  setNickname: (nickname) => set({ nickname }),
  setMemberId: (memberId) => set({ memberId }),
  setMembers: (members) => set({ members }),

  resetState: () => {
    set({
      nickname: "",
      memberId: null,
      members: [],
    });
  },
});

// Zustand store 생성
export const useStore = create<StoreState>()(
  persist(stateCreator, {
    name: "user-store", // 로컬 스토리지에 저장될 키 이름
    storage: storage, // localStorage를 persist storage로 변환하여 사용
  })
);
