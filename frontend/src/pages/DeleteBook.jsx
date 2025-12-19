import { React, useState, useEffect } from 'react'
import AxiosInstance from '../services/Axios'
import { Box, Button, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router'
import AddBoxIcon from '@mui/icons-material/AddBox'
function DeleteBook() {



  const [alertMessage, setAlertMessage] = useState('')
  const [bookData, setBookData] = useState({
    isbn: '',
    title: '',
    description: '',
    total_copies: 0,
    available_copies: 0,
    category: [],
    authors: [],
    languages: [],
    publisher: '',
  })
  const navigate = useNavigate()
  const MyParameter = useParams()
  const MyId = MyParameter.id
  console.log("MyId", MyId)

  const GetData = () => {
    AxiosInstance.get(`book/${MyId}`).then((res) => {
      setBookData(res.data)
    })
  }

  const DeleteBook = (event) => {
    event.preventDefault()
    AxiosInstance.delete(`book/${MyId}`).then((res) => {
      setAlertMessage(
        <MessageAlert
          messageText={'Book data successfully deleted in the database!'}
          alertType='success'
        />
      )
      setTimeout(() => {
        navigate('/')
      }, 1500)
    })
  }

  useEffect(() => {
    GetData()
  }, [])

  return (
    <form onSubmit={DeleteBook}>
      {alertMessage}
      <Box className='flex items-center font-bold bg-rose-800 text-white p-2 mb-2 gap-2 rounded-lg'>
        <AddBoxIcon />
        Are you sure you want to delete this book - { }?
      </Box>

      <Box className='w-full justify-evenly p-2 mb-2 mt-2 grid grid-cols-3 gap-2'>
        <Typography>
          You will be deleting the book <b>{bookData.title}</b> by <b>{bookData.authors}</b>.
        </Typography>
      </Box>

      <Box className="mt-2">
        <button type="submit" className='w-full p-2 m-2 bg-rose-800 text-white rounded-lg shadow-xl'>
          Delete Book
        </button>
      </Box>
    </form>
  )
}

export default DeleteBook