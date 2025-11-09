import { React, useState, useEffect } from 'react'
import AxiosInstance from '../services/Axios'
import TextForm from '../components/forms/TextForm';
import { Box } from '@mui/material'
import { useFormik } from 'formik';

import AddBoxIcon from '@mui/icons-material/AddBox';
import SelectForm from '../components/forms/SelectForm';
import MultipleSelectForm from '../components/forms/MultiSelectForm';
import DescriptionForm from '../components/forms/DescriptionForm';

function AddBook() {
  const [category, setCategory] = useState([])
  const [author, setAuthor] = useState([])
  const [publisher, setPublisher] = useState([])

  console.log('Category: ', category)
  console.log('Author: ', author)
  console.log('Publisher: ', publisher)


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
  }

  useEffect(() => {
    GetData()
  }, [])

  const formik = useFormik({
    initialValues: {
      title: 'Michelangelo',
      description: '',
      total_copies: '',
      category: [],
      author: [],
      languages: [],
      publisher: '',
    },

    //formik.handleSubmit triggers onSubmit function
    onSubmit: (values) => {
      AxiosInstance.post(`book/`, values).then(() => {
        console.log('Successful Data Submitted')
      })
    }
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box className='flex items-center font-bold bg-rose-800 text-white p-2 mb-2 gap-2 rounded-lg'>
        <AddBoxIcon />
        Add New Book
      </Box>

      <Box className='w-full justify-evenly items-center p-2 mb-2 mt-2 shadow-lg grid grid-cols-3 gap-2'>
        <TextForm
          label={'Title'}
          name='title'
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <MultipleSelectForm
          label={'Authors'}
          options={author}
          value={formik.values.author}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <MultipleSelectForm
          label={'Categories'}
          options={category}
          name='category'
          value={formik.values.category}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <MultipleSelectForm
          label={'Language(s)'}
          options={category}
          value={formik.values.category}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <SelectForm
          label={'Publisher'}
          options={publisher}
          name='publisher'
          value={formik.values.publisher}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <TextForm
          label={'Total Copies'}
          name='total_copies'
          value={formik.values.total_copies}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <div className='col-span-3 w-full'>
          <DescriptionForm
            label='Description'
            rows={9}
            name='description'
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <button type="submit" className='w-full p-2 m-2 bg-rose-800 text-white rounded-lg shadow-xl'>
          Add Book
        </button>
      </Box>
    </form>
  )
}

export default AddBook