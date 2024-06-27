import React from 'react'
import ListarArticulosAReponer from './ListarArticulosAReponer'
import ListarArticulosFaltantes from './ListarArticulosFaltantes'

const ListarArticulosPage = () => {
  return (
    <div>
        <ListarArticulosAReponer/>
        <ListarArticulosFaltantes/>
    </div>
  )
}

export default ListarArticulosPage