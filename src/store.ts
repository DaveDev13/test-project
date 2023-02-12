// import { useLocalObservable } from "mobx-react-lite";
// import { createContext, FC, ReactElement, ReactNode, useContext } from "react";
// import rootStore, { RootStore } from "./stores";

// const StoreContext = createContext<RootStore | null>(null);

// // export const StoreProvider = ({ children }: { children: ReactNode }) => {
// //     const store = useLocalObservable(() => rootStore);
// //     return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
// // };

// export type StoreComponent = FC<{
//     store: RootStore;
//     children: ReactNode;
// }>;

// export const StoreProvider: StoreComponent = ({ children, store }): ReactElement => {
//     // @ts-ignore
//     return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
// };
// export const useStore = () => {
//     const store = useContext(StoreContext);

//     if (!store) {
//         // this is especially useful in TypeScript so you don't need to be checking for null all the time
//         throw new Error("useStore must be used within a StoreProvider.");
//     }

//     return store;
// };

export {};
