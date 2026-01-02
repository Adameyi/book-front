import React, { useState, useEffect, useMemo } from 'react'
import * as yup from 'yup'
import { useFormik, validateYupSchema } from 'formik'
import { useDropzone } from 'react-dropzone'
import { useNavigate } from 'react-router'
import TextForm from '../forms/TextForm';
import SelectForm from '../forms/SelectForm'
import MultipleSelectForm from '../forms/MultiSelectForm'
import { Box, Button, Modal, Typography, IconButton } from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox'
import DescriptionForm from '../forms/DescriptionForm';
import MessageAlert from '../forms/MessageAlert';
import AxiosInstance from '../../services/Axios';

function BasicModal({ type }) {
    const [category, setCategory] = useState([])
    const [author, setAuthor] = useState([])
    const [publisher, setPublisher] = useState([])
    const [languages, setLanguages] = useState([])
    const [imagePreview, setImagePreview] = useState(null)
    const [imageFile, setImageFile] = useState(null)
    const [modalType, setModalType] = useState(type)
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const [alertMessage, setAlertMessage] = useState([])

    let capitalizedType = modalType.charAt(0).toUpperCase() + modalType.slice(1)

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
    };


    useEffect(() => {
        GetData()
    }, [])


    const generateISBN = () => {
        let isbn = '978' + Math.floor(Math.random() * 1000000000).toString().padStart(9, '0')
        let sum = 0
        for (let i = 0; i < 12; i++) {
            sum += parseInt(isbn[i]) * (i % 2 === 0 ? 1 : 3)
        }
        const checkDigit = (10 - (sum % 10)) % 10
        return isbn + checkDigit
    };

    const authorValidationSchema = yup.object({
        name: yup
            .string('Name must contain text.')
            .required('Name is required.'),
        bio: yup
            .string('Bio must contain text.')
            .required('Bio is required.'),
    })

    const authorInitialValues = {
        name: '',
        bio: '',
    };

    const bookValidationSchema = yup.object({
        isbn: yup
            .string('Name must contain 13 digits.')
            .matches(/^\d{13}$/, 'ISBN must be exactly 13 digits.')
            .required('ISBN is required.'),
        title: yup
            .string('Title must contain text.')
            .required('title is required.'),
        description: yup
            .string('Description must contain text.')
            .required('description is required.'),
        total_copies: yup
            .number('Total copies must be a number.')
            .positive('Must be a positive number.')
            .integer()
            .required('Number of total copies is required.'),
        available_copies: yup
            .number('Available copies must be a number.')
            .positive('Must be a positive number.')
            .integer()
            .required('Number of available copies is required.'),
        category: yup
            .array()
            .min(1, 'Select at least ONE category.')
            .required('Category is required.'),
        authors: yup
            .array()
            .min(1, 'Select at least ONE author.')
            .required('An author is required.'),
        languages: yup
            .array()
            .min(1, 'Select at least ONE language.')
            .required('Language is required.'),
        publisher: yup
            .string('Publisher must contain text.')
            .required('book must have a publisher.'),
    })

    const bookInitialValues = {
        isbn: '',
        image: null,
        title: '',
        description: '',
        total_copies: '',
        available_copies: '',
        category: [],
        authors: [],
        languages: [],
        publisher: '',
    };

    const initialValues = modalType === 'author' ? { ...authorInitialValues } : { ...bookInitialValues }
    const validationSchema = modalType === 'author' ? { ...authorValidationSchema } : { ...bookValidationSchema }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,

        //formik.handleSubmit triggers onSubmit function
        onSubmit: (values) => {
            const formData = new FormData()
            console.log('Form Data', formData)

            Object.keys(values).forEach((key) => {
                formData.append(key, values[key])
            })

            AxiosInstance.post(`${modalType}/`, formData).then(() => {
                console.log('Successful Data Submitted')
                setAlertMessage(
                    <MessageAlert
                        messageText={` ${capitalizedType} data successfully submitted to the database!`}
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

    // Handle file input change (for manual file selection and formik update).
    const handleImageChange = (event) => {
        const file = event.target.files[0]
        if (file) {
            formik.setFieldValue('image', file)

            //Store image file
            setImageFile(file)
            console.log('Image File: ', file)

            //Preview the image via URL
            setImagePreview(URL.createObjectURL(file))
        }
    }

    //Dropzone options
    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => {
            const file = acceptedFiles[0]
            if (file) {
                formik.setFieldValue('image', file)

                //Store image file
                setImageFile(file)

                //Preview the image via URL
                setImagePreview(URL.createObjectURL(file))
            }
        },
        accept: 'image/*', //Only allow image files
    })


    return (
        <div>
            {alertMessage}
            <Button
                onClick={handleOpen}
                className='flex items-center font-bold bg-rose-800 text-white p-2 mb-2 gap-2 rounded-lg'
            >Add {capitalizedType}</Button>
            <Modal
                className='flex items-center justify-center min-h-screen'
                open={open}
                onClose={handleClose}
            >
                <div className='bg-white rounded-lg w-1/2 p-2'>
                    <form onSubmit={formik.handleSubmit}>
                        <Box className='flex items-center font-bold bg-rose-800 text-white p-2 mb-2 gap-2 rounded-lg'>
                            <AddBoxIcon />
                            Add New {capitalizedType}
                        </Box>

                        {modalType === 'author' &&
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
                        }
                        {modalType === 'book' &&
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
                                {/* Image Upload Section */}
                                <div>
                                    <label htmlFor="image">Cover Image</label>
                                    <div {...getRootProps()} className='border-2 rounded-lg border-dashed p-2 cursor-pointer text-center'>
                                        <input {...getInputProps()} />
                                        <p>Drag & Drop an Image Here or Click to Select</p>
                                    </div>
                                    <input
                                        id='image'
                                        name='image'
                                        type='file'
                                        accept='image/*'
                                        onChange={handleImageChange}
                                        className='mt-2'
                                    />

                                    {/* Image Preview */}
                                    {imagePreview && (
                                        <div>
                                            <h4>Image Preview</h4>
                                            <img
                                                src={imagePreview}
                                                alt="Cover Image (Preview)"
                                                className='w-2/3 h-48 object-cover'
                                            />
                                        </div>
                                    )}
                                </div>
                            </Box>
                        }
                        <div className='flex flex-row'>
                            <button onClick={handleClose} className='w-1/2 p-2 mr-2 bg-gray-500 text-white rounded-lg shadow-xl'>
                                Cancel
                            </button>
                            <button
                                type="submit" className='w-1/2 p-2 mr-2 bg-rose-800 text-white rounded-lg shadow-xl'>
                                Add {capitalizedType}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    )
}

export default BasicModal