import '@/styles/globals.css'
import { DataContextProvider } from "@/Context/DataContext";
import { ChakraProvider } from '@chakra-ui/react'

function MyApp({ Component, pageProps }) {
  return (
      <ChakraProvider>
  <DataContextProvider>
      <Component {...pageProps} />
  </DataContextProvider>
    </ChakraProvider>
  )
}

export default MyApp;