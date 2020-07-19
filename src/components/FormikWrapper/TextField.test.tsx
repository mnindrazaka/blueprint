import React from 'react'
import { render, act, fireEvent } from '@testing-library/react'
import { Formik } from 'formik'
import * as yup from 'yup'
import { TextField } from './TextField'

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

describe('text field', () => {
  it('can change text value', async () => {
    const { getByLabelText } = render(
      <Formik initialValues={{ username: '' }} onSubmit={jest.fn()}>
        <TextField label="Username" name="username" />
      </Formik>
    )
    const textField = getByLabelText('Username')
    await act(async () => {
      fireEvent.change(textField, { target: { value: 'mnindrazaka' } })
    })
    expect(textField).toHaveValue('mnindrazaka')
  })

  it('can show error message', async () => {
    const validationSchema = yup.object().shape({
      username: yup.string().required('input required'),
    })
    const { getByLabelText, findByText } = render(
      <Formik
        initialValues={{ username: '' }}
        onSubmit={jest.fn()}
        validationSchema={validationSchema}
      >
        <TextField label="Username" name="username" />
      </Formik>
    )
    const inputElement = getByLabelText('Username')
    await act(async () => {
      fireEvent.change(inputElement, { target: { value: 'mnindrazaka' } })
    })
    await act(async () => {
      fireEvent.change(inputElement, { target: { value: '' } })
    })
    const errorElement = await findByText('input required')
    expect(errorElement).toBeInTheDocument()
  })
})
