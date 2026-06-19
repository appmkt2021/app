import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from '../api'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'

const emptyForm = {
  name: '',
  phone: '',
  email: '',
  address: '',
  city: '',
  location: '',
}

export default function ClientForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState(emptyForm)

  useEffect(() => {
    if (id) {
      axios.get(`/api/clients/${id}`).then((res) => setForm(res.data))
    }
  }, [id])

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (id) {
      await axios.put(`/api/clients/${id}`, form)
    } else {
      await axios.post('/api/clients', form)
    }
    navigate('/')
  }

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" mb={2}>
          {id ? 'Edit Client' : 'New Client'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Address"
              name="address"
              value={form.address}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="City"
              name="city"
              value={form.city}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Location"
              name="location"
              value={form.location}
              onChange={handleChange}
              required
              fullWidth
            />
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button variant="outlined" onClick={() => navigate('/')}>
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                Save
              </Button>
            </Box>
          </Stack>
        </form>
      </Paper>
    </Box>
  )
}
