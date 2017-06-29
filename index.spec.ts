import {
  validateName,
  replaceCamelCase,
  replaceSnakeCase,
  isIncluded,
  replaceWith,
} from './templater'

declare global {
  namespace jest {
    interface Matchers<R> {
      toContainSubstring(argument: string): void
    }
  }
}

expect.extend({
  toContainSubstring(received: string, argument: string) {
    const pass = received.includes(argument)
    if (pass) {
      return {
        message: () => `expected ${received} to contain substring ${argument}`,
        pass: true,
      }
    } else {
      return {
        message: () =>
          `expected ${received} to not contain substring ${argument}`,
        pass: false,
      }
    }
  },
})

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

describe('isIncluded', () => {
  it('should be true when string is included in array', () => {
    const blacklist = ['node_modules']
    const fakePath = 'node_modules/thing/one'

    expect(isIncluded(fakePath, blacklist)).toBe(true)
  })

  it('should be false when string is not included in array', () => {
    const blacklist = ['node_modules']
    const fakePath = 'thing/one'

    expect(isIncluded(fakePath, blacklist)).toBe(false)
  })
})

describe('replacements', () => {
  it('should convert a string to camel case', () => {
    const bigTitle = 'It is a big world out there'
    const longText = '__REPLACE_ME_CC__'

    expect(replaceCamelCase(bigTitle, longText)).toBe('itIsABigWorldOutThere')
  })

  it('should convert a string to snake case', () => {
    const title = 'Super Cool Drumsticks'
    const replacement = '__REPLACE_ME_SC__'

    expect(replaceSnakeCase(title, replacement)).toBe('super_cool_drumsticks')
  })

  it('should convert a camel case string to snake case', () => {
    const title = 'superCoolDrumsticks'
    const replacement = '__REPLACE_ME_SC__'

    expect(replaceSnakeCase(title, replacement)).toBe('super_cool_drumsticks')
  })

  it('should convert strings when there is more content available', () => {
    const longText = `
      {
        "name": "__REPLACE_ME_TITLE__",
        "version": "1.0.0",
        "description": "A description fit for a package",
        "homepage": "https://github.com/nanoxd/__REPLACE_ME_CC__.git"
      }
    `

    let replacedContent = replaceWith('FakePackage', longText)

    expect(replacedContent).toContainSubstring('FakePackage')
    expect(replacedContent).toContainSubstring('fakePackage')
  })
})
