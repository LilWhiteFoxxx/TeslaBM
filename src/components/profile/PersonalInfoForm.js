import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';

import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

import { formatDate } from '../../utils';
import InputForm from './InputForm';

import './personalInfoForm.scss';

const PersonalInfoForm = () => {
    const { user } = useSelector((state) => state.auth);
    const [formValues, setFormValues] = useState({
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
        phoneNumber: user?.phoneNumber,
        gender: user?.gender ? user?.gender : 'male',
        dob: user?.dob ? formatDate(user?.dob) : '',
    });

    const [errors, setErrors] = useState({});

    const validationSchema = Yup.object({
        firstName: Yup.string().required('Required'),
        lastName: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
        phoneNumber: Yup.string().required('Required'),
        dob: Yup.date().required('Required'),
    });

    const validate = async (values) => {
        try {
            await validationSchema.validate(values, { abortEarly: false });
            return {};
        } catch (validationErrors) {
            const formErrors = {};
            validationErrors.inner.forEach((error) => {
                formErrors[error.path] = error.message;
            });
            return formErrors;
        }
    };

    const handleGenderChange = (gender) => {
        setFormValues({ ...formValues, gender });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = await validate(formValues);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            console.log(formValues);
        }
    };

    const handleReset = () => {
        setFormValues({
            firstName: user?.firstName,
            lastName: user?.lastName,
            email: user?.email,
            phoneNumber: user?.phoneNumber,
            gender: user?.gender,
            dob: user?.dob ? formatDate(user?.dob) : '',
        });
        setErrors({});
    };

    return (
        <div className="personal-info-form">
            <div className="flex justify-center items-center text-[40px] font-bold mb-[70px]">
                <h1>Personal Information</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col">
                        <InputForm
                            className="input-form"
                            title={'First Name'}
                            id="firstName"
                            name="firstName"
                            type={'text'}
                            onChange={handleChange}
                            value={formValues.firstName}
                            placeholder="Enter first name"
                        />
                        {errors.firstName ? (
                            <div className="error">{errors.firstName}</div>
                        ) : null}
                    </div>

                    <div className="flex flex-col">
                        <InputForm
                            className="input-form"
                            title={'Last Name'}
                            id="lastName"
                            name="lastName"
                            type={'text'}
                            onChange={handleChange}
                            value={formValues.lastName}
                            placeholder="Enter last name"
                        />
                        {errors.lastName ? (
                            <div className="error">{errors.lastName}</div>
                        ) : null}
                    </div>
                </div>

                <InputForm
                    className="input-form"
                    title={'Email'}
                    id="email"
                    name="email"
                    type={'email'}
                    onChange={handleChange}
                    value={formValues.email}
                    placeholder="Enter email"
                />
                {errors.email ? (
                    <div className="error">{errors.email}</div>
                ) : null}

                <div className="grid grid-cols-2 gap-3">
                    <div className="flex-col">
                        <InputForm
                            className="input-form"
                            title={'Phone Number'}
                            id="phone"
                            name="phone"
                            type={'text'}
                            onChange={handleChange}
                            value={formValues.phoneNumber}
                            placeholder="Enter phone number"
                        />
                        {errors.phone ? (
                            <div className="error">{errors.phoneNumber}</div>
                        ) : null}
                    </div>

                    <div className="flex-col">
                        <InputForm
                            className="input-form"
                            title={'Date of Birth'}
                            id="dob"
                            name="dob"
                            type={'date'}
                            onChange={handleChange}
                            value={formValues.dob}
                        />
                        {errors.dob ? (
                            <div className="error">{errors.dob}</div>
                        ) : null}
                    </div>
                </div>

                <div className="gender-selection">
                    <div
                        className={`gender-option ${
                            formValues.gender === 'male' ? 'selected' : ''
                        }`}
                        onClick={() => handleGenderChange('male')}
                    >
                        <MaleIcon />
                        Male
                    </div>
                    <div
                        className={`gender-option ${
                            formValues.gender === 'female'
                                ? 'selected-female'
                                : ''
                        }`}
                        onClick={() => handleGenderChange('female')}
                    >
                        <FemaleIcon />
                        Female
                    </div>
                </div>

                <div className="flex">
                    <button
                        type="submit"
                        className="flex w-[100px] h-[40px] bg-black text-white justify-center items-center mr-2"
                    >
                        Save
                    </button>
                    <button
                        type="button"
                        onClick={handleReset}
                        className="flex w-[100px] h-[40px] bg-red-500 text-white justify-center items-center"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PersonalInfoForm;
