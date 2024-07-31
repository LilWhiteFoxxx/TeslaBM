import React, { useState } from 'react';
import { useGetAllColorQuery } from '../../../src/apis/colorApi';
import { useUploadFirebaseMutation } from '../../../src/apis/uploadFirebaseApi';

const ProductModal = ({ isOpen, onClose, onSubmit, categories }) => {
    const [formData, setFormData] = useState({
        name: '',
        desc: '',
        originalPrice: '',
        categoryId: '',
        mfg: '',
        img: null,
        imgHover: null,
        motorDetails: [
            {
                originalPrice: '',
                salePrice: '',
                colorId: '',
                quantity: '',
            },
        ],
        images: [],
        dataAndEquipment: {
            sound: '',
            atbOne: { atbName: '', atbNumber: '' },
            atbTwo: { atbName: '', atbNumber: '' },
            atbThree: { atbName: '', atbNumber: '' },
            atbFour: { atbName: '', atbNumber: '' },
            imgData: '',
            iconData: '',
            imgStartEngineer: '',
        },
    });

    const [images, setimages] = useState({
        img: null,
        imgHover: null,
        images: [],
    });

    const { data: colors } = useGetAllColorQuery();
    const [uploadFirebase] = useUploadFirebaseMutation();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleDataAndEquipmentChange = (e) => {
        const { name, value } = e.target;
        const [field, subfield] = name.split('.');
        if (subfield) {
            setFormData((prevData) => ({
                ...prevData,
                dataAndEquipment: {
                    ...prevData.dataAndEquipment,
                    [field]: {
                        ...prevData.dataAndEquipment[field],
                        [subfield]: value,
                    },
                },
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                dataAndEquipment: {
                    ...prevData.dataAndEquipment,
                    [field]: value,
                },
            }));
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setimages((prevData) => ({
            ...prevData,
            img: file,
        }));
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prevData) => ({
                    ...prevData,
                    img: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleHoverImageChange = (e) => {
        const file = e.target.files[0];
        setimages((prevData) => ({
            ...prevData,
            imgHover: file,
        }));
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prevData) => ({
                    ...prevData,
                    imgHover: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleMultipleImagesChange = (e) => {
        const files = Array.from(e.target.files);
        setimages((prevData) => ({
            ...prevData,
            images: files,
        }));
        const imageUrls = files.map((file) => URL.createObjectURL(file));
        setFormData((prevData) => ({
            ...prevData,
            images: imageUrls,
        }));
    };

    const handleMotorDetailChange = (index, e) => {
        const { name, value } = e.target;
        const updatedMotorDetails = formData.motorDetails.map((detail, i) =>
            i === index ? { ...detail, [name]: value } : detail
        );
        setFormData((prevData) => ({
            ...prevData,
            motorDetails: updatedMotorDetails,
        }));
    };

    const addMotorDetail = () => {
        setFormData((prevData) => ({
            ...prevData,
            motorDetails: [
                ...prevData.motorDetails,
                {
                    originalPrice: '',
                    salePrice: '',
                    colorId: '',
                    quantity: '',
                },
            ],
        }));
    };

    const removeMotorDetail = (index) => {
        setFormData((prevData) => ({
            ...prevData,
            motorDetails: prevData.motorDetails.filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = async () => {
        try {
            const imageUploadPromises = [];

            if (images.img) {
                const imgUploadPromise = uploadFirebase({
                    files: [images.img],
                }).then((response) => response.data?.metadata);
                imageUploadPromises.push(imgUploadPromise);
            }
            if (images.imgHover) {
                const imgHoverUploadPromise = uploadFirebase({
                    files: [images.imgHover],
                }).then((response) => response.data?.metadata);
                imageUploadPromises.push(imgHoverUploadPromise);
            }
            if (images.images.length > 0) {
                const multipleImagesUploadPromise = uploadFirebase({
                    files: images.images,
                }).then((response) => response.data?.metadata);
                imageUploadPromises.push(multipleImagesUploadPromise);
            }

            const [imgMetadata, imgHoverMetadata, imagesMetadata] =
                await Promise.all(imageUploadPromises);

            const imgUrls = imgMetadata ? [imgMetadata[0]] : null;
            const imgHoverUrls = imgHoverMetadata
                ? [imgHoverMetadata[0]]
                : null;
            const imagesUrls = imagesMetadata ? imagesMetadata : null;

            // Set the URLs in formData
            const updatedFormData = {
                ...formData,
                img: imgUrls ? imgUrls[0] : null,
                imgHover: imgHoverUrls ? imgHoverUrls[0] : null,
                images: imagesUrls?.length > 0 ? imagesUrls : null,
            };

            onSubmit(updatedFormData);
            onClose();
        } catch (error) {
            console.error('Error uploading images:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-add">
            <div className="modal-content">
                <h2 className="text-xl mb-4">Add New Product</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="border border-gray-300 rounded w-full p-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                        Description
                    </label>
                    <textarea
                        name="desc"
                        value={formData.desc}
                        onChange={handleChange}
                        className="border border-gray-300 rounded w-full p-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                        Original Price
                    </label>
                    <input
                        type="number"
                        name="originalPrice"
                        value={formData.originalPrice}
                        onChange={handleChange}
                        className="border border-gray-300 rounded w-full p-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                        Category
                    </label>
                    <select
                        name="categoryId"
                        value={formData.categoryId}
                        onChange={handleChange}
                        className="border border-gray-300 rounded w-full p-2"
                    >
                        <option value="">Select Category</option>
                        {categories?.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                        Manufacture Year
                    </label>
                    <input
                        type="text"
                        name="mfg"
                        value={formData.mfg}
                        onChange={handleChange}
                        className="border border-gray-300 rounded w-full p-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                        Main Image
                    </label>
                    <input
                        type="file"
                        onChange={handleImageChange}
                        className="border border-gray-300 rounded w-full p-2"
                    />
                    {formData.img && (
                        <img
                            src={formData.img}
                            alt="Preview"
                            className="mt-2 w-full h-40 object-cover"
                        />
                    )}
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                        Hover Image
                    </label>
                    <input
                        type="file"
                        onChange={handleHoverImageChange}
                        className="border border-gray-300 rounded w-full p-2"
                    />
                    {formData.imgHover && (
                        <img
                            src={formData.imgHover}
                            alt="Hover Preview"
                            className="mt-2 w-full h-40 object-cover"
                        />
                    )}
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                        Additional Images
                    </label>
                    <input
                        type="file"
                        multiple
                        onChange={handleMultipleImagesChange}
                        className="border border-gray-300 rounded w-full p-2"
                    />
                    {formData.images.length > 0 && (
                        <div className="mt-2 flex space-x-2">
                            {formData.images.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={`Additional ${index}`}
                                    className="w-20 h-20 object-cover"
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Data and Equipment Fields */}
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">
                        Data and Equipment
                    </h3>
                    <div className="mb-2">
                        <label className="block text-sm font-medium mb-1">
                            Image Data
                        </label>
                        <input
                            type="text"
                            name="imgData"
                            value={formData.dataAndEquipment.imgData}
                            onChange={handleDataAndEquipmentChange}
                            className="border border-gray-300 rounded w-full p-2"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-sm font-medium mb-1">
                            Icon Data
                        </label>
                        <input
                            type="text"
                            name="iconData"
                            value={formData.dataAndEquipment.iconData}
                            onChange={handleDataAndEquipmentChange}
                            className="border border-gray-300 rounded w-full p-2"
                        />
                    </div>
                    <label className="text-[16px] font-semibold mb-2">
                        Attribute 1
                    </label>
                    <div className="p-2">
                        <div className="mb-2">
                            <label className="block text-sm font-medium mb-1">
                                Description
                            </label>
                            <input
                                type="text"
                                name="atbOne.atbName"
                                value={formData.dataAndEquipment.atbOne.atbName}
                                onChange={handleDataAndEquipmentChange}
                                className="border border-gray-300 rounded w-full p-2"
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block text-sm font-medium mb-1">
                                Parameter
                            </label>
                            <input
                                type="text"
                                name="atbOne.atbNumber"
                                value={
                                    formData.dataAndEquipment.atbOne.atbNumber
                                }
                                onChange={handleDataAndEquipmentChange}
                                className="border border-gray-300 rounded w-full p-2"
                            />
                        </div>
                    </div>
                    <label className="text-[16px] font-semibold mb-2">
                        Attribute 2
                    </label>
                    <div className="p-2">
                        <div className="mb-2">
                            <label className="block text-sm font-medium mb-1">
                                Description
                            </label>
                            <input
                                type="text"
                                name="atbTwo.atbName"
                                value={formData.dataAndEquipment.atbTwo.atbName}
                                onChange={handleDataAndEquipmentChange}
                                className="border border-gray-300 rounded w-full p-2"
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block text-sm font-medium mb-1">
                                Parameter
                            </label>
                            <input
                                type="text"
                                name="atbTwo.atbNumber"
                                value={
                                    formData.dataAndEquipment.atbTwo.atbNumber
                                }
                                onChange={handleDataAndEquipmentChange}
                                className="border border-gray-300 rounded w-full p-2"
                            />
                        </div>
                    </div>
                    <label className="text-[16px] font-semibold mb-2">
                        Attribute 3
                    </label>
                    <div className="p-2">
                        <div className="mb-2">
                            <label className="block text-sm font-medium mb-1">
                                Description
                            </label>
                            <input
                                type="text"
                                name="atbThree.atbName"
                                value={
                                    formData.dataAndEquipment.atbThree.atbName
                                }
                                onChange={handleDataAndEquipmentChange}
                                className="border border-gray-300 rounded w-full p-2"
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block text-sm font-medium mb-1">
                                Parameter
                            </label>
                            <input
                                type="text"
                                name="atbThree.atbNumber"
                                value={
                                    formData.dataAndEquipment.atbThree.atbNumber
                                }
                                onChange={handleDataAndEquipmentChange}
                                className="border border-gray-300 rounded w-full p-2"
                            />
                        </div>
                    </div>
                    <label className="text-[16px] font-semibold mb-2">
                        Attribute 4
                    </label>
                    <div className="p-2">
                        <div className="mb-2">
                            <label className="block text-sm font-medium mb-1">
                                Description
                            </label>
                            <input
                                type="text"
                                name="atbFour.atbName"
                                value={
                                    formData.dataAndEquipment.atbFour.atbName
                                }
                                onChange={handleDataAndEquipmentChange}
                                className="border border-gray-300 rounded w-full p-2"
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block text-sm font-medium mb-1">
                                Parameter
                            </label>
                            <input
                                type="text"
                                name="atbFour.atbNumber"
                                value={
                                    formData.dataAndEquipment.atbFour.atbNumber
                                }
                                onChange={handleDataAndEquipmentChange}
                                className="border border-gray-300 rounded w-full p-2"
                            />
                        </div>
                    </div>
                    <label className="text-[16px] font-semibold mb-2">
                        Sound Engine
                    </label>
                    <div className="p-2">
                        <div className="mb-2">
                            <label className="block text-sm font-medium mb-1">
                                Image Start Engineer
                            </label>
                            <input
                                type="text"
                                name="imgStartEngineer"
                                value={
                                    formData.dataAndEquipment.imgStartEngineer
                                }
                                onChange={handleDataAndEquipmentChange}
                                className="border border-gray-300 rounded w-full p-2"
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block text-sm font-medium mb-1">
                                Sound
                            </label>
                            <input
                                type="text"
                                name="sound"
                                value={formData.dataAndEquipment.sound}
                                onChange={handleDataAndEquipmentChange}
                                className="border border-gray-300 rounded w-full p-2"
                            />
                        </div>
                    </div>
                </div>

                <div className="mb-4">
                    <button
                        type="button"
                        onClick={addMotorDetail}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Add Motor Detail
                    </button>
                </div>

                {formData.motorDetails.map((detail, index) => (
                    <div key={index} className="mb-4 border p-4 rounded">
                        <h3 className="text-lg font-semibold mb-2">
                            Motor Detail {index + 1}
                        </h3>
                        <div className="mb-2">
                            <label className="block text-sm font-medium mb-1">
                                Original Price
                            </label>
                            <input
                                type="number"
                                name="originalPrice"
                                value={detail.originalPrice}
                                onChange={(e) =>
                                    handleMotorDetailChange(index, e)
                                }
                                className="border border-gray-300 rounded w-full p-2"
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block text-sm font-medium mb-1">
                                Sale Price
                            </label>
                            <input
                                type="number"
                                name="salePrice"
                                value={detail.salePrice}
                                onChange={(e) =>
                                    handleMotorDetailChange(index, e)
                                }
                                className="border border-gray-300 rounded w-full p-2"
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block text-sm font-medium mb-1">
                                Color
                            </label>
                            <select
                                name="colorId"
                                value={detail.colorId}
                                onChange={(e) =>
                                    handleMotorDetailChange(index, e)
                                }
                                className="border border-gray-300 rounded w-full p-2"
                            >
                                <option value="">Select Color</option>
                                {colors?.metadata?.map((color) => (
                                    <option key={color.id} value={color.id}>
                                        {color.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-2">
                            <label className="block text-sm font-medium mb-1">
                                Quantity
                            </label>
                            <input
                                type="number"
                                name="quantity"
                                value={detail.quantity}
                                onChange={(e) =>
                                    handleMotorDetailChange(index, e)
                                }
                                className="border border-gray-300 rounded w-full p-2"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => removeMotorDetail(index)}
                            className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                            Remove
                        </button>
                    </div>
                ))}

                <div className="flex justify-end space-x-4 mt-4">
                    <button onClick={onClose} className="btn btn-secondary">
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;
