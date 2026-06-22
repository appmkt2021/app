import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../api'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import Typography from '@mui/material/Typography'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

export default function ClientList() {
  const [clients, setClients] = useState([])
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [selectedId, setSelectedId] = useState(null)
  const navigate = useNavigate()

  const fetchClients = () => {
    axios.get('/api/clients').then((res) => setClients(res.data))
  }

  useEffect(() => {
    fetchClients()
  }, [])

  const handleDeleteClick = (id) => {
    setSelectedId(id)
    setConfirmOpen(true)
  }

  const handleConfirmDelete = async () => {
    await axios.delete(`/api/clients/${selectedId}`)
    setConfirmOpen(false)
    setSelectedId(null)
    fetchClients()
  }

  const handleCancelDelete = () => {
    setConfirmOpen(false)
    setSelectedId(null)
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5">Clients</Typography>
        <Button variant="contained" onClick={() => navigate('/clients/new')}>
          New Client
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Location</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell>{client.name}</TableCell>
                <TableCell>{client.phone}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>{client.address}</TableCell>
                <TableCell>{client.city}</TableCell>
                <TableCell>{client.location}</TableCell>
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    onClick={() => navigate(`/clients/${client.id}/edit`)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteClick(client.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {clients.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No clients found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={confirmOpen} onClose={handleCancelDelete}>
        <DialogTitle>The Application Says</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this client? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
