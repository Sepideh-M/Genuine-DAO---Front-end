import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";

import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, sepolia, WagmiConfig } from 'wagmi'
import { goerli, arbitrum, mainnet, polygon, polygonMumbai } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { infuraProvider } from 'wagmi/providers/infura'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'

const chains = [polygonMumbai]

const projectId = 'bf654e6fc9d49befea8caee62446e467'
// const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
// const { publicClient } = configureChains(chains, [alchemyProvider({ apiKey: '91JTokNoULLEKwDuyJLGqeIrm9h-1A01' })])
const { publicClient } = configureChains(chains, [infuraProvider({ apiKey: '8097fe91aa604f66b0cab468b13f2dba' })])
// const { publicClient } = configureChains(chains, [jsonRpcProvider({rpc: {http: "https://rpc.ankr.com/polygon_mumbai/bf22a1af586c8f23c56205136ecbee0965c7d06d57c29d414bcd8ad877a0afc4"}})])
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  publicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
  <WagmiConfig config={wagmiConfig}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </WagmiConfig>
  <Web3Modal projectId={projectId} ethereumClient={ethereumClient} defaultChain={polygonMumbai}/>
  </>
);
