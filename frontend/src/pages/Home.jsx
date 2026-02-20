import AxiosInstance from '../services/Axios'
import { React, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import { MaterialReactTable } from 'material-react-table'
import EditIcon from '@mui/icons-material/Edit';
import { Box, Chip, Typography, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import placeholderImage from '../assets/PlaceholderImage_column.png'
import BasicModal from '../components/modals/BasicModal'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router';

function Home() {
  const [bookData, setBookData] = useState([])

  const { isAuthenticated, user, logout } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to='/login' />
  }

  // Store data after fetching
  const GetData = () => {
    AxiosInstance.get('book/').then((res) => {
      setBookData(res.data)
    }).catch((error) =>
      console.error('Error fetching book data', error)
    )
  }

  useEffect(() => {
    GetData()
  }, [])

  const columns = useMemo(
    () => [
      {
        accessorKey: 'image',
        header: 'Cover',
        accessorFn: (row) => row?.image || '',
        enableSorting: false,
        Cell: ({ cell }) => {
          const imageUrl = cell.getValue()

          return (
            <img
              src={imageUrl || placeholderImage}
              alt='Book Cover'
              className='w-30 h-48 object-cover'
            />
          )
        }
      },
      {
        accessorKey: 'title',
        header: 'Title'
      },
      {
        accessorKey: 'author_names',
        header: 'Authors'
      },
      {
        accessorKey: 'publisher_name',
        header: 'Publisher'
      },
      {
        accessorKey: 'category_details',
        header: 'Category',
        Cell: ({ cell }) => (
          <div className='flex flex-wrap gap-2'>
            {
              cell.getValue()?.map((category, index) => (
                <Chip key={index} label={category.name} />
              ))
            }
          </div>
        )
      }
    ]
  )

  return (
    <div>
      <Box className='flex items-center font-bold bg-rose-800 text-white p-2 mb-2 gap-2 rounded-lg'>
        <CalendarViewMonthIcon />
        <Typography>
          View Books
        </Typography>
      </Box>
      <BasicModal type={'book'} />
      <MaterialReactTable
        columns={columns}
        data={bookData}
        enableRowActions
        renderRowActions={({ row }) => (
          <Box className='flex flex-nowrap gap-2'>
            <IconButton className='bg-rose-800' component={Link} to={`editbook/${row.original.id}`}>
              <EditIcon />
            </IconButton>
            <IconButton className='error' component={Link} to={`deletebook/${row.original.id}`}>
              <DeleteIcon />
            </IconButton>
          </Box>
        )}
      />
    </div>
  )
}

export default Home