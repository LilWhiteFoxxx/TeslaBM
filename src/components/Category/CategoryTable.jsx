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
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

import {
    useCreateCategoryMutation,
    useGetMotorCategoryQuery,
    useDeleteCategoryMutation,
    useUpdateCategoryMutation,
} from '../../apis/categoryApi';

export default function CategoryTable() {
    const [rows, setRows] = useState([]);
    const [name, setName] = useState('');
    const [editId, setEditId] = useState(null);
    const [newNameCategory, setNewNameCategory] = useState('');

    // Fetch existing categories
    const { data, refetch } = useGetMotorCategoryQuery({
        limit: 50,
        offset: 0,
    });

    // Initialize the mutation hooks
    const [createCategory] = useCreateCategoryMutation();
    const [deleteCategory] = useDeleteCategoryMutation();
    const [updateCategory] = useUpdateCategoryMutation();

    useEffect(() => {
        if (data) {
            const categories = data.metadata.map((category) => ({
                id: category.id,
                name: category.name,
            }));
            setRows(categories);
        }
    }, [data]);

    const handleEdit = (id, currentName) => {
        setEditId(id);
        setNewNameCategory(currentName);
    };

    const handleSave = async () => {
        if (editId && newNameCategory) {
            try {
                await updateCategory({ id: editId, name: newNameCategory }).unwrap();
                setEditId(null);
                setNewNameCategory('');
                refetch();
            } catch (error) {
                console.error('Failed to update category:', error);
            }
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteCategory(id).unwrap();
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
                    setName('');
                    refetch();
                }
            } catch (error) {
                console.error('Failed to create category:', error);
            }
        }
    };

    return (
        <div className="Table">
            <div className="flex mb-3 justify-end">
                <div
                    style={{
                        marginTop: '3px',
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
                </div>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAdd}
                    className="btn-add"
                    size="small"
                    startIcon={<AddIcon />}
                >
                    Add
                </Button>
            </div>
            <div className="category-container">
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
                                    key={row.id}
                                    sx={{
                                        '&:last-child td, &:last-child th': {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell>
                                        {editId === row.id ? (
                                            <TextField
                                                value={newNameCategory}
                                                onChange={(e) => setNewNameCategory(e.target.value)}
                                                size="small"
                                            />
                                        ) : (
                                            row.name
                                        )}
                                    </TableCell>
                                    <TableCell align="left">
                                        {editId === row.id ? (
                                            <>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    size="small"
                                                    onClick={handleSave}
                                                    className="btn-add text-black"
                                                >
                                                    Save
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    size="small"
                                                    style={{ marginLeft: '10px' }}
                                                    onClick={() => setEditId(null)}
                                                    className="btn-add"
                                                >
                                                    Cancel
                                                </Button>
                                            </>
                                        ) : (
                                            <>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    size="small"
                                                    onClick={() => handleEdit(row.id, row.name)}
                                                    className="btn-add text-black"
                                                >
                                                    <EditIcon />
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    size="small"
                                                    style={{ marginLeft: '10px' }}
                                                    onClick={() => handleDelete(row.id)}
                                                    className="btn-add"
                                                >
                                                    Delete
                                                </Button>
                                            </>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}
