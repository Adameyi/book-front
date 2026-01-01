import React, { useState, useEffect, useMemo } from 'react'
import AxiosInstance from '../services/Axios'
import TextForm from '../components/forms/TextForm'
import { useFormik, validateYupSchema } from 'formik'
import * as yup from 'yup'
import { Link } from 'react-router';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import { MaterialReactTable } from 'material-react-table'
import EditIcon from '@mui/icons-material/Edit';
import { Box, Typography, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import placeholderImage from '../assets/PlaceholderImage_column.png'
import AddBoxIcon from '@mui/icons-material/AddBox'
import DescriptionForm from '../components/forms/DescriptionForm'
import MessageAlert from '../components/forms/MessageAlert'
import BasicModal from '../components/modals/BasicModal'

function AuthorList() {
    const [bio, setBio] = useState([])
    const [name, setName] = useState([])
    const [authorData, setAuthorData] = useState([])

    // Store data after fetching
    const GetAuthorData = () => {
        AxiosInstance.get('author/').then((res) => {
            setAuthorData(res.data)
        }).catch((error) =>
            console.error('Error fetching author data', error)
        )
    }

    useEffect(() => {
        GetAuthorData()
    }, [])

    const columns = useMemo(
        () => [
            {
                accessorKey: 'image',
                header: 'Profile',
                accessorFn: (row) => row?.image || '',
                enableSorting: false,
                Cell: ({ cell }) => {
                    const imageUrl = cell.getValue()

                    return (
                        <img
                            src={imageUrl || placeholderImage}
                            alt='Author Cover'
                            className='w-30 h-48 object-cover'
                        />
                    )
                }
            },
            {
                accessorKey: 'name',
                header: 'Author Name'
            },
            {
                accessorKey: 'bio',
                header: 'Author bio'
            },
        ]
    )

    return (
        <>
            <div>
                <Box className='flex items-center font-bold bg-rose-800 text-white p-2 mb-2 gap-2 rounded-lg'>
                    <CalendarViewMonthIcon />
                    <Typography>
                        View Authors
                    </Typography>
                </Box>
                <BasicModal type={'author'} />
                <MaterialReactTable
                    columns={columns}
                    data={authorData}
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
        </>
    )
}

export default AuthorList