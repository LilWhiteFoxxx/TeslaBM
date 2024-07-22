import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import {
    useCreateCategoryMutation,
    useGetMotorCategoryQuery,
    useDeleteCategoryMutation,
} from '../../apis/categoryApi';

export default function CategoryTable() {
    const [rows, setRows] = useState([]);
    const [name, setName] = useState('');

    // Fetch existing categories
    const { data, refetch } = useGetMotorCategoryQuery({
        limit: 50,
        offset: 0,
    });

    // Initialize the mutation hooks
    const [createCategory] = useCreateCategoryMutation();
    const [deleteCategory] = useDeleteCategoryMutation();

    useEffect(() => {
        if (data) {
            const categories = data.metadata.map((category) => ({
                id: category.id,
                name: category.name,
            }));
            setRows(categories);
        }
    }, [data]);

    const handleEdit = (index) => {
        alert(`Edit row ${index + 1}`);
    };

    const handleDelete = async (id, index) => {
        try {
            await deleteCategory(id).unwrap();
            // const newRows = rows.filter((_, i) => i !== index);
            // setRows(newRows);
            refetch();
        } catch (error) {
            console.error('Failed to delete category:', error);
        }
    };

    const handleAdd = async () => {
        if (name) {
            try {
                const result = await createCategory({ name }).unwrap();
                if (result.metadata) {
                    // Assuming the result.metadata contains the newly created category
                    // const newCategory = {
                    //     id: result.metadata.id,
                    //     name: result.metadata.name,
                    // };
                    // setRows([...rows, newCategory]);
                    setName('');
                    // Optionally, refetch categories to get updated data
                    refetch();
                }
            } catch (error) {
                console.error('Failed to create category:', error);
            }
        }
    };

    return (
        <div className="Table">
            <TableContainer
                component={Paper}
                style={{ boxShadow: '0px 13px 20px 0px #80808029' }}
            >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>STT</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell align="left">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody style={{ color: 'white' }}>
                        {rows.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{
                                    '&:last-child td, &:last-child th': {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell align="left">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        onClick={() => handleEdit(index)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        size="small"
                                        style={{ marginLeft: '10px' }}
                                        onClick={() =>
                                            handleDelete(row.id, index)
                                        }
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <div
                style={{
                    marginTop: '20px',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <TextField
                    label="Name"
                    variant="outlined"
                    size="small"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ marginRight: '10px' }}
                />

                <Button variant="contained" color="primary" onClick={handleAdd}>
                    Add
                </Button>
            </div>
        </div>
    );
}
