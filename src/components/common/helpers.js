export const RegPhone = new RegExp(/^[+]?[(]?[0-9]{1,4}[)]?[-\s0-9]*$/)
export const RegEmail = new RegExp(/^(\w[-.%+\w]*\w@\w[-.\w]*\w\.\w{2,})$/)
const RegCapital = new RegExp(/^(?=.*[A-Z])/)
const RegNum = new RegExp(/^(?=.*[0-9])/)

export const getDateFromString = value => {
  if (!value) return null
  return new Date(parseInt(value))
}

export const convertDateToString = value => {
  if (!value) return null
  const date = new Date(parseInt(value))
  return date.toISOString()
}

export const isEqualObject = (a, b) => {
  if (!a || !b) return false
  let aProps = Object.getOwnPropertyNames(a)
  let bProps = Object.getOwnPropertyNames(b)
  if (aProps.length !== bProps.length) {
    return false
  }
  for (let i = 0; i < aProps.length; i++) {
    let propName = aProps[i]
    if (!Array.isArray(a[propName]) && a[propName] !== b[propName]) {
      return false
    }
  }
  return true
}

export function passwordPassed (msgs) {
  if (!msgs || msgs.length === 0) return true
  return msgs.filter(msg => !msg.passed).length === 0
}

export function checkValidPassword (p) {
  let validationMsgs = []
  if (!p) return [{ text: 'Password required', passed: false }]
  validationMsgs.push({
    text: '8 characters minimum',
    passed: p.length > 7
  })
  validationMsgs.push({
    text: '1 capital letter',
    passed: RegCapital.test(p)
  })
  validationMsgs.push({
    text: '1 number',
    passed: RegNum.test(p)
  })
  return validationMsgs
}
