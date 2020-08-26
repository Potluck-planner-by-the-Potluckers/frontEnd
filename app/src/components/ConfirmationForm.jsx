import React from 'react'

export default function ConfirmationForm() {
    return (
        <div className='container confirmation-form-container'>
            <h1>Confirmation Page</h1>
            <form onSubmit="handleSubmit">
                <h2>Select the food you will bring</h2>
                <input type="checkbox" name="foodList" id="foodList" />
                <label htmlFor="foodList">{'foodlist name'}</label>
                <button type="submit" className='btn submit-btn'>Submit</button>
            </form>
        </div>
    )
}
