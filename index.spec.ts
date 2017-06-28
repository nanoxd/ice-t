import { validateName } from './templater'

describe('validateName', () => {
  it('should validate name', () => {
    const name = 'Aurelius'
    expect(validateName(name)).toBe(true)
  })

  it('should return error when a name has spaces', () => {
    const invalidName = 'A name with spaces'
    expect(validateName(invalidName)).toBe(
      'Project name may only include letters, numbers, underscores and hashes.'
    )
  })
})
