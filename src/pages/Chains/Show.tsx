import React from 'react'
import { Switch, Route, useParams, useRouteMatch } from 'react-router-dom'
import { v2 } from 'api'
import { NodeResource } from './ChainNodes'
import RegionalNav from './RegionalNav'
import { Resource, Chain } from 'core/store/models'
import { ChainNodes } from './ChainNodes'

export type ChainResource = Resource<Chain>

interface RouteParams {
  network: string
  chainId: string
}

export const ChainsShow = () => {
  const { chainId, network } = useParams<RouteParams>()
  const { path } = useRouteMatch()
  const [chain, setChain] = React.useState<ChainResource>()
  const [nodes, setNodes] = React.useState<NodeResource[]>([])

  const getNodes = async () => {
    const nodes = await v2.nodes.getNodes()
    setNodes(nodes.data)
  }

  React.useEffect(() => {
    getNodes()
  }, [])

  React.useEffect(() => {
    Promise.all([v2.chains.getChains(network)])
      .then(([v2Chains]) =>
        v2Chains.data.find((chain: ChainResource) => chain.id === chainId),
      )
      .then(setChain)
  }, [chainId, network])

  return (
    <>
      <RegionalNav chainId={chainId} network={network} chain={chain} />
      <Switch>
        <Route path={`${path}`}>
          {chain && <ChainNodes nodes={nodes} chain={chain} />}
        </Route>
      </Switch>
    </>
  )
}

export default ChainsShow
