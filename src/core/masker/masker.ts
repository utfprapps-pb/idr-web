// https://github.com/vanilla-masker/vanilla-masker

export class Masker {
  static readonly DIGIT = '9'

  static readonly ALPHA = 'A'

  static readonly ALPHA_NUM = 'S'

  static mask(pattern: string) {
    return (value: string) => Masker.toPattern({ value, pattern })
  }

  private static toPattern(params: { value: string; pattern: string }) {
    const { value, pattern } = params

    const output = pattern.split('')
    const outputLength = output.length

    const values = value.toString().replace(/\W/g, '')
    const charsValues = values.replace(/\W/g, '')
    const patternChars = pattern.replace(/\W/g, '')

    let index = 0
    let i

    for (i = 0; i < outputLength; i += 1) {
      if (index >= values.length) {
        if (patternChars.length === charsValues.length) {
          return output.join('')
        }
        break
      } else if (
        (output[i] === Masker.DIGIT && values[index].match(/\d/)) ||
        (output[i] === Masker.ALPHA && values[index].match(/[a-zA-Z]/)) ||
        (output[i] === Masker.ALPHA_NUM && values[index].match(/[0-9a-zA-Z]/))
      ) {
        output[i] = values[index]
        index += 1
      } else if (
        output[i] === Masker.DIGIT ||
        output[i] === Masker.ALPHA ||
        output[i] === Masker.ALPHA_NUM
      ) {
        return output.slice(0, i).join('')
      } else if (output[i] === values[index]) {
        index += 1
      }
    }
    return output.join('').slice(0, i)
  }
}
