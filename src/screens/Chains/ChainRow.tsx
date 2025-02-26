import React from 'react'

import { tableStyles } from 'components/Table'
import Link from 'components/Link'

import { withStyles, WithStyles } from '@material-ui/core/styles'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

interface Props extends WithStyles<typeof tableStyles> {
  chain: ChainsPayload_ResultsFields
}

export const ChainRow = withStyles(tableStyles)(({ chain, classes }: Props) => {
  return (
    <TableRow className={classes.row} hover>
      <TableCell>{chain.network}</TableCell>
      <TableCell className={classes.cell} component="th" scope="row">
        <Link
          className={classes.link}
          href={`/chains/${chain.network.toLowerCase()}/${chain.id}`}
        >
          {chain.id}
        </Link>
      </TableCell>

      <TableCell>{chain.enabled.toString()}</TableCell>
    </TableRow>
  )
})
