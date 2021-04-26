import { kea } from "kea";
import { indiaLogicType } from "types/logics/indiaLogicType";
import { walletLogic } from "./walletLogic";

type ModalType = null | "deposit" | "withdraw";

export const indiaLogic = kea<indiaLogicType<ModalType>>({
  actions: {
    setModalState: (state: ModalType) => ({ state }),
  },
  reducers: {
    modalState: [
      null as ModalType,
      {
        setModalState: (_, { state }) => state,
      },
    ],
  },
  listeners: ({ actions }) => ({
    [walletLogic.actionTypes.stakeSuccess]: async () => {
      actions.setModalState(null);
    },
  }),
});
