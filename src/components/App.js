import AppleBasket from "./AppleBasket"
import { RootStoreProvider } from "../store"

function App() {
  return (
    <RootStoreProvider>
      <AppleBasket />
    </RootStoreProvider>
  )
}

export default App
