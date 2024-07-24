import { useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import TeslaLogo from '../../Assets/images/TeslaLogo';
import { getOrderById } from '../../apis/order';
import { formatDate } from '../../utils';

import 'jspdf-autotable';
import { getUserInfo } from '../../apis/user';

export default function Invoice() {
    const { orderId } = useParams(); // Extract orderId from URL parameters
    // const address = user?.address?.[0] || {};
    const [address, setAddress] = useState()
    const [order, setOrder] = useState({});
    const [orderLine, setOrderLine] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const buttonRef = useRef(null);
    const [user, setUser] = useState();

    useEffect(() => {
        const fetchData = async () => {
            if (!orderId) return;

            setIsLoading(true);
            try {
                const res = await getOrderById({ id: orderId }); // Pass orderId directly
                const user = await getUserInfo();
                console.log(user.metadata);
                setUser(user.metadata);
                setAddress(user.metadata?.address?.[0])
                setOrder(res.metadata);
                setOrderLine(res.metadata.orderLine);
            } catch (error) {
                console.error('Failed to fetch data', error);
                setError('Failed to load order data.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [orderId]);

    const createDate = formatDate(order.createdAt);

    const exportPDF = async () => {
        const element = document.getElementById('invoice');
        if (!element) return;

        if (buttonRef.current) {
            buttonRef.current.style.visibility = 'hidden'; // Hide button
        }

        const canvas = await html2canvas(element, {
            useCORS: true,
            backgroundColor: '#ffffff', // Ensure background color is white
        });
        const imgData = canvas.toDataURL('image/png');

        const doc = new jsPDF();
        const imgWidth = 210;
        const pageHeight = 295;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;

        let position = 0;

        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            doc.addPage();
            doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        doc.save('invoice.pdf');

        if (buttonRef.current) {
            buttonRef.current.style.visibility = 'visible'; // Show button again
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                Loading...
            </div>
        );
    }

    if (error) {
        return <div className="text-red-500 text-center">{error}</div>;
    }

    return (
        <div
            id="invoice"
            className="p-8 bg-white max-w-4xl mx-auto border rounded-lg shadow-lg mt-[100px] min-h-[97vh] mb-8 w-full"
        >
            {/* Header */}
            <div className="flex justify-between w-full mb-8">
                <TeslaLogo />
                <h2 className="text-3xl font-semibold">INVOICE</h2>
            </div>

            <div className="flex text-start mx-8 justify-between">
                {/* Billing Information */}
                <div className="mb-8">
                    <h2 className="text-lg font-semibold mb-2">BILLED TO:</h2>
                    <p className="text-sm">{`${user?.firstName} ${user?.lastName}`}</p>
                    <p className="text-sm">{user?.email}</p>
                    <p className="text-sm">+{user?.phoneNumber}</p>
                    <p className="text-sm">
                        {address?.street || ''}, {address?.ward || ''},{' '}
                        {address?.district || ''}, {address?.city || ''},{' '}
                        {address?.country || ''}
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-sm">Invoice No. {orderId}</p>
                    <p className="text-sm">{createDate}</p>
                </div>
            </div>

            {/* Cart Items */}
            <div className="mb-8">
                <table className="min-w-full">
                    <thead>
                        <tr>
                            <th className="border-t border-b px-4 py-2 text-left text-sm font-semibold">
                                Item
                            </th>
                            <th className="border-t border-b px-4 py-2 text-left text-sm font-semibold">
                                Quantity
                            </th>
                            <th className="border-t border-b px-4 py-2 text-left text-sm font-semibold">
                                Unit Price
                            </th>
                            <th className="border-t border-b px-4 py-2 text-left text-sm font-semibold">
                                Total
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderLine?.map((item) => (
                            <tr key={item.id}>
                                <td className="border-b px-4 py-2 text-sm text-start">
                                    {item?.motor?.name ||
                                        item?.accessories?.name}
                                </td>
                                <td className="border-b px-5 py-2 text-sm text-start">
                                    {item.quantity}
                                </td>
                                <td className="border-b px-4 py-2 text-sm text-start">
                                    ${item.price}
                                </td>
                                <td className="border-b px-4 py-2 text-sm text-start">
                                    ${item.price * item.quantity}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Total */}
            <div className="flex justify-between mb-8">
                <div></div>
                <div className="flex-col">
                    <div className="flex mb-1">
                        <p className="text-lg mr-1 font-bold">Subtotal:</p>
                        <p className="text-lg">${order.total}</p>
                    </div>

                    <div className="flex border-b border-gray-300 mb-1">
                        <div className="flex">
                            <p className="text-lg mr-1 font-bold">Tax (0%):</p>
                            <p className="text-lg ml-1">$0</p>
                        </div>
                    </div>

                    <div className="flex mt-2">
                        <p className="text-lg mr-1 font-bold">Total:</p>
                        <p className="text-lg">${order.total}</p>
                    </div>
                </div>
            </div>

            {/* Thank You Note */}
            <div className="flex mb-8 ml-8">
                <p className="text-lg font-semibold">Thank you!</p>
            </div>

            {/* Payment Information */}
            <div className="flex flex-col mx-8 text-start">
                <h2 className="text-lg font-semibold mb-2">
                    PAYMENT INFORMATION
                </h2>
                <p className="text-sm">Any Bank</p>
                <p className="text-sm">Account Name: Any Name</p>
                <div className="flex justify-between">
                    <div className="flex-col">
                        <p className="text-sm">Account No.: 123-456-7890</p>
                        <p className="text-sm">Pay by: {createDate}</p>
                    </div>
                    <div className="flex-col">
                        <p className="text-sm font-bold">CATMOTORARD</p>
                        <p className="text-sm">
                            123 Anywhere St., Any City, ST 1102
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex justify-center mt-12">
                <button
                    ref={buttonRef}
                    onClick={exportPDF}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    SAVE INVOICE
                </button>
            </div>
        </div>
    );
}
