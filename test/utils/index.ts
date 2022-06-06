export const assertEq = (a, b) => {
  if (a === b || a instanceof Object && JSON.stringify(a) === JSON.stringify(b)) {
    return true
  }
  
  console.log('Assertion failed:', a, '!==', b)
  return false
}

export const defineTest = (testName: string, test: () => boolean) => {
  console.log('Testing', '"' + testName + '"')
  if (!test()) {
    console.log('Test failed!')
  } else {
    console.log('Test passed!')
  }
  console.log()
}