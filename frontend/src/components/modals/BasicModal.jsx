import React, { useState, useEffect, useMemo } from 'react'
import * as yup from 'yup'
import { useFormik, validateYupSchema } from 'formik'
import TextForm from '../forms/TextForm';
import { Box, Button, Modal, Typography, IconButton } from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox'
import DescriptionForm from '../forms/DescriptionForm';
import MessageAlert from '../forms/MessageAlert';
import AxiosInstance from '../../services/Axios';

function BasicModal({ type }) {
    const [modalType, setModalType] = useState(type)
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const [alertMessage, setAlertMessage] = useState([])

    const validationSchema = yup.object({
        name: yup
            .string('Name must contain text.')
            .required('Name is required.'),
        bio: yup
            .string('Bio must contain text.')
            .required('Bio is required.'),
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
            setOpen(false)
        }
    })

    return (
        <div>
            {alertMessage}
            <Button
                onClick={handleOpen}
                className='flex items-center font-bold bg-rose-800 text-white p-2 mb-2 gap-2 rounded-lg'
            >Add {modalType}</Button>
            <Modal
                className='flex items-center justify-center min-h-screen'
                open={open}
                onClose={handleClose}
            >
                <div className='bg-white rounded-lg w-1/2 p-2'>
                    <form onSubmit={formik.handleSubmit}>
                        <Box className='flex items-center font-bold bg-rose-800 text-white p-2 mb-2 gap-2 rounded-lg'>
                            <AddBoxIcon />
                            Add New {modalType}
                        </Box>

                        <Box className='w-full justify-evenly items-center p-2 mb-2 mt-2 shadow-lg grid grid-cols-2 gap-2'>
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
                        <div className='flex flex-row'>
                            <button onClick={handleClose} className='w-1/2 p-2 mr-2 bg-gray-500 text-white rounded-lg shadow-xl'>
                                Cancel
                            </button>
                            <button type="submit" className='w-1/2 p-2 mr-2 bg-rose-800 text-white rounded-lg shadow-xl'>
                                Add Author
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    )
}

export default BasicModal