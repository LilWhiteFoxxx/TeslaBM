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
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

import { formatDate } from '../../utils';
import { useUpdateOrderStatusMutation } from '../..//apis/orderApi';

const makeStyle = (status) => {
    if (status === 'Approved') {
        return {
            background: 'rgb(145 254 159 / 47%)',
            color: 'green',
            padding: '4px 8px', // Add padding
            borderRadius: '4px', // Add border radius
        };
    } else if (status === 'Pending') {
        return {
            background: '#ffadad8f',
            color: 'red',
            padding: '4px 8px', // Add padding
            borderRadius: '4px', // Add border radius
        };
    } else if (status === 'Cancelled') {
        return {
            background: 'gray',
            color: 'white',
            padding: '4px 8px', // Add padding
            borderRadius: '4px', // Add border radius
        };
    } else {
        return {
            background: '#59bfff',
            color: 'white',
            padding: '4px 8px', // Add padding
            borderRadius: '4px', // Add border radius
        };
    }
};

const statusOptions = [
    { id: 1, status: 'Pending' },
    { id: 2, status: 'Approved' },
    { id: 3, status: 'Cancelled' },
    { id: 4, status: 'Delivered' },
];

export default function RecentOrderTable({ orders, refetch }) {
    const [rows, setRows] = useState([]);
    const [editRow, setEditRow] = useState(null);
    const [currentStatus, setCurrentStatus] = useState(null);
    const [originalStatus, setOriginalStatus] = useState(null);
    const [updateOrderStatus] = useUpdateOrderStatusMutation();
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [openDetailsModal, setOpenDetailsModal] = useState(false);

    useEffect(() => {
        if (orders) {
            const order = orders.map((od) => ({
                name: od.name,
                trackingId: od.id,
                createdAt: od.createdAt,
                paymentMethod: od.paymentMethodType,
                status: od.orderStatus,
                statusId: od.orderStatusId,
                orderLines: od.orderLines, // Add orderLines here
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

    const showDetails = (order) => {
        setSelectedOrder(order); // Set selected order for details view
        setOpenDetailsModal(true); // Open the modal
    };

    const handleCloseDetailsModal = () => {
        setOpenDetailsModal(false); // Close the modal
        setSelectedOrder(null); // Clear the selected order
    };

    return (
        <div className="Table">
            <h2 className="text-[18px] font-bold">Recent Orders</h2>
            <div className="order-container">
                <TableContainer
                    component={Paper}
                    style={{ boxShadow: '0px 13px 20px 0px #80808029' }}
                >
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead className="sticky top-0 bg-white z-10">
                            <TableRow>
                                <TableCell>Customer</TableCell>
                                <TableCell align="center">
                                    Tracking ID
                                </TableCell>
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
                                                <div onClick={handleCancel}>
                                                    <CancelIcon
                                                        className="btn-add rounded-full p-1"
                                                        style={{
                                                            color: 'white',
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        ) : (
                                            <div
                                                className="flex justify-center "
                                                onClick={() => startEdit(row)}
                                            >
                                                <EditIcon
                                                    className="btn-add rounded-full p-1"
                                                    style={{ color: 'white' }}
                                                />
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell align="left" className="Details">
                                        <button
                                            className="btn-add w-6 h-6 p-1 rounded-full text-white font-medium items-center justify-center flex"
                                            onClick={() => showDetails(row)}
                                        >
                                            <VisibilityIcon style={{ width: '18px', height: '18px'}}/>
                                            {/* Details */}
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            {/* Details Modal */}
            <Dialog
                open={openDetailsModal}
                onClose={handleCloseDetailsModal}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>
                    <p className="font-bold text-[18px]">Order Details</p>
                </DialogTitle>
                <DialogContent style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                    {selectedOrder && (
                        <div>
                            <p>
                                <strong>Tracking ID:</strong>{' '}
                                {selectedOrder.trackingId}
                            </p>
                            <p>
                                <strong>Customer:</strong> {selectedOrder.name}
                            </p>
                            <p>
                                <strong>Created At:</strong>{' '}
                                {formatDate(selectedOrder.createdAt)}
                            </p>
                            <p>
                                <strong>Payment Method:</strong>{' '}
                                {selectedOrder.paymentMethod}
                            </p>
                            <p>
                                <strong>Status:</strong>{' '}
                                {
                                    statusOptions.find(
                                        (s) => s.id === selectedOrder.statusId
                                    )?.status
                                }
                            </p>
                            <p>
                                <strong>Order Lines:</strong>
                            </p>
                        </div>
                    )}
                    {selectedOrder?.orderLines.map((line) => (
                        <div key={line.id} className="mb-4">
                            {line.motorId ? (
                                <div>
                                    {/* <h3 className="text-[16px] font-semibold">
                                        Motor Details
                                    </h3> */}
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={line.motorImg}
                                            alt={line.motorName}
                                            style={{
                                                width: '100px',
                                                height: 'auto',
                                            }}
                                        />
                                        <div className="flex flex-col">
                                            <div className="flex gap-4">
                                                <p className="font-semibold">
                                                    Motor Name:
                                                </p>
                                                <p>{line.motorName}</p>
                                            </div>
                                            <div className="flex gap-4">
                                                <p className="font-semibold">
                                                    Price:
                                                </p>
                                                <p>{line.motorOriginalPrice}</p>
                                            </div>
                                            <div className="flex gap-4">
                                                <p className="font-semibold">
                                                    Manufactured Year:
                                                </p>
                                                <p>{line.motorMfg}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    {/* <h3 className="text-[16px] font-semibold">
                                        Accessory Details
                                    </h3> */}
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={line.accessoriesImg}
                                            alt={line.accessoriesName}
                                            style={{
                                                width: '100px',
                                                height: 'auto',
                                            }}
                                        />
                                        <div className="flex flex-col">
                                            <div className="flex gap-4">
                                                <p className="font-semibold">
                                                    Accessory Name:
                                                </p>
                                                <p>{line.accessoriesName}</p>
                                            </div>
                                            <div className="flex gap-4">
                                                <p className="font-semibold">
                                                    Price:
                                                </p>
                                                <p>
                                                    {
                                                        line.accessoriesOriginalPrice
                                                    }
                                                </p>
                                            </div>
                                            <div className="flex gap-4">
                                                <p className="font-semibold">
                                                    Manufactured Year:
                                                </p>
                                                <p>{line.accessoriesMfg}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDetailsModal}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
