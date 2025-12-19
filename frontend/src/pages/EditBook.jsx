import { React, useState, useEffect } from 'react'
import AxiosInstance from '../services/Axios'
import TextForm from '../components/forms/TextForm'
import { Box } from '@mui/material'
import { useFormik, validateYupSchema } from 'formik'
import * as yup from 'yup'

import AddBoxIcon from '@mui/icons-material/AddBox'
import SelectForm from '../components/forms/SelectForm'
import MultipleSelectForm from '../components/forms/MultiSelectForm'
import DescriptionForm from '../components/forms/DescriptionForm'
import MessageAlert from '../components/forms/MessageAlert'
import { useNavigate, useParams } from 'react-router'

function EditBook() {
  const MyParameter = useParams()
  const MyId = MyParameter.id
  console.log("MyId", MyId)

  const [category, setCategory] = useState([])
  const [author, setAuthor] = useState([])
  const [publisher, setPublisher] = useState([])
  const [languages, setLanguages] = useState([])
  const [alertMessage, setAlertMessage] = useState([])
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

  const generateISBN = () => {
    let isbn = '978' + Math.floor(Math.random() * 1000000000).toString().padStart(9, '0')
    let sum = 0
    for (let i = 0; i < 12; i++) {
      sum += parseInt(isbn[i]) * (i % 2 === 0 ? 1 : 3)
    }
    const checkDigit = (10 - (sum % 10)) % 10
    return isbn + checkDigit
  }

  const validationSchema = yup.object({
    isbn: yup
      .string('ISBN must contain text.')
      .required('ISBN is required.'),
    title: yup
      .string('Name must contain text.')
      .required('Name is required.'),
    description: yup
      .string('Description must contain text.')
      .required('Description is required.'),
    total_copies: yup
      .number("Total copies must contain a number.")
      .required('Number of total copies is required.'),
    category: yup
      .array()
      .min(1, 'Select at least ONE category.')
  })

  // Store data after fetching

  const GetData = () => {
    AxiosInstance.get(`category/`).then((res) => {
      setCategory(res.data)
    })
    AxiosInstance.get(`author/`).then((res) => {
      setAuthor(res.data)
    })
    AxiosInstance.get(`publisher/`).then((res) => {
      setPublisher(res.data)
    })
    AxiosInstance.get(`language/`).then((res) => {
      setLanguages(res.data)
    })
    AxiosInstance.get(`book/${MyId}`).then((res) => {
      setBookData(res.data)
    })
  }

  useEffect(() => {
    GetData()
  }, [])

  console.log(bookData.title)
  const formik = useFormik({
    initialValues: {
      isbn: bookData.isbn,
      title: bookData.title,
      description: bookData.description,
      total_copies: bookData.total_copies,
      available_copies: bookData.available_copies,
      category: bookData.category,
      authors: bookData.authors,
      languages: bookData.languages,
      publisher: bookData.publisher,
    },
    enableReinitialize: true,
    validationSchema: validationSchema,

    //formik.handleSubmit triggers onSubmit function
    onSubmit: (values) => {
      AxiosInstance.put(`book/${MyId}/`, values).then(() => {
        console.log('Successful Data Submitted')
        setAlertMessage(
          <MessageAlert
            messageText={'Book data successfully updated data in the database!'}
            alertType='success'
          />
        )
        setTimeout(() => {
          navigate('/')
        }, 1500)
      })
    }
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box className='flex items-center font-bold bg-rose-800 text-white p-2 mb-2 gap-2 rounded-lg'>
        <AddBoxIcon />
        Edit Book - { }
      </Box>

      {/* Form Box */}
      <Box className='w-full justify-evenly items-center p-2 mb-2 mt-2 shadow-lg grid grid-cols-3 gap-2'>
        <TextForm
          label={'ISBN'}
          name='isbn'
          value={formik.values.isbn}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.isbn && Boolean(formik.errors.isbn)}
          helperText={formik.touched.isbn && formik.errors.isbn}
        />
        <TextForm
          label={'Title'}
          name='title'
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />
        <MultipleSelectForm
          label={'Authors'}
          options={author}
          name='authors'
          value={formik.values.authors}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.authors && Boolean(formik.errors.authors)}
          helperText={formik.touched.authors && formik.errors.authors}
        />
        <MultipleSelectForm
          label={'Categories'}
          options={category}
          name='category'
          value={formik.values.category}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.category && Boolean(formik.errors.category)}
          helperText={formik.touched.category && formik.errors.category}
        />
        <MultipleSelectForm
          label={'Language(s)'}
          options={languages}
          name='languages'
          value={formik.values.languages}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.languages && Boolean(formik.errors.languages)}
          helperText={formik.touched.languages && formik.errors.languages}
        />
        <SelectForm
          label={'Publisher'}
          options={publisher}
          name='publisher'
          value={formik.values.publisher}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.publisher && Boolean(formik.errors.publisher)}
          helperText={formik.touched.publisher && formik.errors.publisher}
        />
        <TextForm
          label={'Total Copies'}
          name='total_copies'
          value={formik.values.total_copies}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.total_copies && Boolean(formik.errors.total_copies)}
          helperText={formik.touched.total_copies && formik.errors.total_copies}
        />
        <TextForm
          label={'Available Copies'}
          name='available_copies'
          value={formik.values.available_copies}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.available_copies && Boolean(formik.errors.available_copies)}
          helperText={formik.touched.available_copies && formik.errors.available_copies}
        />
        <div className='col-span-3 w-full'>
          <DescriptionForm
            label='Description'
            rows={9}
            name='description'
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
          />
        </div>
        <button type="submit" className='w-full p-2 m-2 bg-rose-800 text-white rounded-lg shadow-xl'>
          Edit Book
        </button>
      </Box>
    </form>
  )
}

export default EditBook