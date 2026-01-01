import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import AxiosInstance from '../services/Axios'
import TextForm from '../components/forms/TextForm'
import { Box } from '@mui/material'
import { useFormik, validateYupSchema } from 'formik'
import * as yup from 'yup'

import AddBoxIcon from '@mui/icons-material/AddBox'
import DescriptionForm from '../components/forms/DescriptionForm'
import MessageAlert from '../components/forms/MessageAlert'

function AddLanguage() {
    const [bio, setBio] = useState([])
    const [name, setName] = useState([])
    const [alertMessage, setAlertMessage] = useState([])

    const navigate = useNavigate()

    const validationSchema = yup.object({
        name: yup
            .string('Name must contain text.')
            .required('Name is required.'),
        bio: yup
            .string('Description must contain text.')
            .required('Description is required.'),
    })

    const formik = useFormik({
        initialValues: {
            name: '',
            bio: '',
        },
        validationSchema: validationSchema,

        //formik.handleSubmit triggers onSubmit function
        onSubmit: (values) => {
            const formData = new FormData()
            console.log('Form Data', formData)

            Object.keys(values).forEach((key) => {
                formData.append(key, values[key])
            })

            AxiosInstance.post(`author/`, formData).then(() => {
                console.log('Successful Data Submitted')
                setAlertMessage(
                    <MessageAlert
                        messageText={'Author data successfully submitted to the database!'}
                        alertType='success'
                    />
                )
                setTimeout(() => {
                    navigate('/')
                }, 1500)
            })
                .catch((error) => {
                    console.error('Error submitting data:', error)
                    setAlertMessage(
                        <MessageAlert
                            messageText={'Failed to submit the data, please try again'}
                            alertType='error'
                        />
                    )
                })
        }
    })

    return (
        <>
            {alertMessage}
            <form onSubmit={formik.handleSubmit}>
                <Box className='flex items-center font-bold bg-rose-800 text-white p-2 mb-2 gap-2 rounded-lg'>
                    <AddBoxIcon />
                    Add New Author
                </Box>

                <Box className='w-full justify-evenly items-center p-2 mb-2 mt-2 shadow-lg grid grid-cols-3 gap-2'>
                    <TextForm
                        label={'Author Name'}
                        name='name'
                        value={formik.values.author}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.title && Boolean(formik.errors.author)}
                        helperText={formik.touched.title && formik.errors.title}
                    />
                    <div className='col-span-3 w-full'>
                        <DescriptionForm
                            label='Author Bio'
                            rows={9}
                            name='bio'
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                        />
                    </div>
                </Box>
                <button type="submit" className='w-full p-2 m-2 bg-rose-800 text-white rounded-lg shadow-xl'>
                    Add Author
                </button>
            </form>
        </>
    )
}

export default AddLanguage