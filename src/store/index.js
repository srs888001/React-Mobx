import AppleStore from "./AppleStore"
import { createContext, useContext } from "react"

class RootStore {
  constructor() {
    this.appleStore = new AppleStore()
  }
}

const rootStore = new RootStore()
const RootStoreContenxt = createContext()

export const RootStoreProvider = ({ children }) => {
  return (
    <RootStoreContenxt.Provider value={rootStore}>
      {children}
    </RootStoreContenxt.Provider>
  )
}
export const useRootStore = () => {
  return useContext(RootStoreContenxt)
}
