import React from 'react'
import { render, act, fireEvent } from '@testing-library/react'
import ProjectForm from './ProjectForm'

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

describe('ProjectForm', () => {
  it('can show validation error if form empty', async () => {
    const { getByText, findAllByText, findByText } = render(<ProjectForm />)

    const createProjectButton = getByText('Create New Project')
    act(() => {
      fireEvent.click(createProjectButton)
    })

    const submitButton = (await findAllByText('Create Project')).find(
      (el) => el.parentElement?.tagName === 'BUTTON'
    )?.parentElement

    act(() => {
      if (submitButton) fireEvent.click(submitButton)
    })

    const nameValidationMessage = await findByText('name is a required field')
    const descriptionValidationMessage = await findByText(
      'description is a required field'
    )

    expect(nameValidationMessage).toBeInTheDocument()
    expect(descriptionValidationMessage).toBeInTheDocument()
  })

  it('can show success message when create project success', async () => {})
})
