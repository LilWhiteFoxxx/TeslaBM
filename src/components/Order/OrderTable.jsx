import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
// import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

import { formatDate } from '../../utils';
import { useUpdateOrderStatusMutation } from '../..//apis/orderApi';

const makeStyle = (status) => {
    if (status === 'Approved') {
        return {
            background: 'rgb(145 254 159 / 47%)',
            color: 'green',
        };
    } else if (status === 'Pending') {
        return {
            background: '#ffadad8f',
            color: 'red',
        };
    } else if (status === 'Cancelled') {
        return {
            background: 'gray',
            color: 'white',
        };
    } else {
        return {
            background: '#59bfff',
            color: 'white',
        };
    }
};

const statusOptions = [
    { id: 1, status: 'Pending' },
    { id: 2, status: 'Approved' },
    { id: 3, status: 'Cancelled' },
    { id: 4, status: 'Delivered' },
];

export default function OrderTable({ orders, refetch }) {
    const [rows, setRows] = useState([]);
    const [editRow, setEditRow] = useState(null); // State to manage editing
    const [currentStatus, setCurrentStatus] = useState(null); // State to manage current status
    const [originalStatus, setOriginalStatus] = useState(null); // State to track original status
    const [updateOrderStatus] = useUpdateOrderStatusMutation();

    useEffect(() => {
        if (orders) {
            const order = orders.map((od) => ({
                name: od.name,
                trackingId: od.id,
                createdAt: od.createdAt,
                paymentMethod: od.paymentMethodType,
                status: od.orderStatus,
                statusId: od.orderStatusId,
            }));
            setRows(order);
        }
    }, [orders]);

    const handleStatusChange = (event) => {
        setCurrentStatus(event.target.value); // Update the current status
    };

    const handleSave = async (trackingId) => {
        try {
            await updateOrderStatus({
                orderId: trackingId,
                orderStatusId: currentStatus,
            }).unwrap();
            refetch();
            setEditRow(null); // Exit edit mode
            setCurrentStatus(null); // Reset current status
            setOriginalStatus(null); // Reset original status
        } catch (error) {
            console.error('Failed to update status:', error);
        }
    };

    const handleCancel = () => {
        setEditRow(null); // Exit edit mode
        setCurrentStatus(originalStatus); // Revert to original status
        setOriginalStatus(null); // Reset original status
    };

    const startEdit = (row) => {
        setEditRow(row.trackingId);
        setCurrentStatus(row.statusId);
        setOriginalStatus(row.statusId); // Track the original status
    };

    return (
        <div className="Table">
            <div className="order-container">
                <TableContainer
                    component={Paper}
                    style={{ boxShadow: '0px 13px 20px 0px #80808029' }}
                >
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Customer</TableCell>
                                <TableCell align="center">Tracking ID</TableCell>
                                <TableCell align="center">CreatedAt</TableCell>
                                <TableCell align="center">
                                    Payment Method
                                </TableCell>
                                <TableCell align="center">Status</TableCell>
                                <TableCell align="center">
                                    Change Status
                                </TableCell>
                                <TableCell align="center"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.trackingId}
                                    sx={{
                                        '&:last-child td, &:last-child th': {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.trackingId}
                                    </TableCell>
                                    <TableCell align="center">
                                        {formatDate(row.createdAt)}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.paymentMethod}
                                    </TableCell>
                                    <TableCell align="center">
                                        {editRow === row.trackingId ? (
                                            <Select
                                                value={
                                                    currentStatus ||
                                                    row.statusId
                                                }
                                                onChange={handleStatusChange}
                                                style={{
                                                    width: '100%',
                                                    height: '35px',
                                                }}
                                            >
                                                {statusOptions.map((status) => (
                                                    <MenuItem
                                                        key={status.id}
                                                        value={status.id}
                                                    >
                                                        {status.status}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        ) : (
                                            <span
                                                className="status"
                                                style={makeStyle(
                                                    statusOptions.find(
                                                        (s) =>
                                                            s.id ===
                                                            row.statusId
                                                    )?.status || row.status
                                                )}
                                            >
                                                {statusOptions.find(
                                                    (s) => s.id === row.statusId
                                                )?.status || row.status}
                                            </span>
                                        )}
                                    </TableCell>
                                    <TableCell align="left">
                                        {editRow === row.trackingId ? (
                                            <div className="flex justify-center gap-1">
                                                {/* <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() =>
                                                        handleSave(
                                                            row.trackingId
                                                        )
                                                    }
                                                    className="btn-add"
                                                    size="small"
                                                > */}
                                                <div
                                                    onClick={() =>
                                                        handleSave(
                                                            row.trackingId
                                                        )
                                                    }
                                                >
                                                    <SaveIcon
                                                        className="btn-add rounded-full p-1"
                                                        style={{
                                                            color: 'white',
                                                        }}
                                                    />
                                                </div>
                                                {/* </Button> */}
                                                {/* <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={handleCancel}
                                                    className="btn-add"
                                                    size="small"
                                                > */}
                                                <div onClick={handleCancel}>
                                                    <CancelIcon
                                                        className="btn-add rounded-full p-1"
                                                        style={{
                                                            color: 'white',
                                                        }}
                                                    />
                                                </div>
                                                {/* </Button> */}
                                            </div>
                                        ) : (
                                            // <Button
                                            //     variant="contained"
                                            //     color="primary"
                                            //     onClick={() => startEdit(row)}
                                            //     className="btn-add"
                                            //     size="small"
                                            // >
                                            <div
                                                className="flex justify-center "
                                                onClick={() => startEdit(row)}
                                            >
                                                <EditIcon
                                                    className="btn-add rounded-full p-1"
                                                    style={{ color: 'white' }}
                                                />
                                            </div>
                                            // </Button>
                                        )}
                                    </TableCell>
                                    <TableCell align="left" className="Details">
                                        Details
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
