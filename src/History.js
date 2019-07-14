export default function History() {
  const initialState = ''
  const commits = []

  return {
    push(change) {
      // if (typeof change === 'string' && commits.length > 0) {
      //   throw new Error('Cannot push string onto initialized history.')
      // }

      // if (typeof change !== 'function' && commits.length > 0) {
      //   throw new Error('History transormation must be of type function.')
      // }

      commits.push(change)
    },

    get last() {
      // TODO: should this calculate the latest state?
      // rn it assumes we're just pushing whole map states
      // also cache it so we don't have to calc every time
      return commits[commits.length - 1]
    }
  }
}

History.of = function(initialState) {
  const hist = History()
  hist.push(initialState)
  return hist
}
