export default class Rule {
  constructor(target, ...properties) {
    this.target = target
    this.properties = properties
  }

  getName() {
    var target = this.target.name
    var properties = this.properties.map(p => p.name)
    return `${target} is ${properties.join('and')}`
  }

  hasProperty(propertyName) {
    return this.properties.some(p => p.name === propertyName)
  }
}

Rule.fromArray = function(blocks) {
  // we have a valid rule IF:
  // 1. NOUN + IS + NOUN
  // 2. NOUN + IS + PROP
  // 3. NOUN + IS + PROP + AND + PROP
  var rules = []
  for (var i = 0; i < blocks.length; i++) {
    var sample = [
      blocks[i],
      blocks[i+1],
      blocks[i+2],
      blocks[i+3],
      blocks[i+4]
    ].filter(Boolean)

    if (sample.length < 3) break

    if (
      // trying to cut down on samples unlikely to be rule groups
      // or likely to duplicate valid rules
      (sample[0].isBlank() && sample[2].isBlank()) ||
      (sample[1].isBlank() && sample[3].isBlank()) ||
      (sample[0].isBlank() && sample[4].isBlank())
    ) {
      continue
    }

    var rule = validateRuleGroup(sample)
    if (rule) rules.push(rule)
  }
  return rules
}

function validateRuleGroup(blocks) {
  if (blocks.length < 2 || blocks.length > 5) return false
  if (blocks.every(b => b.isIcon() || b.isBlank())) return false

  var one = blocks[0]
  var two = blocks[1]
  var thr = blocks[2]
  var four = blocks[3]
  var five = blocks[4]

  if (validateFiveBlocks(...blocks)) {
    return new Rule(one, thr, five)
  }

  if (validateThreeBlocks(one, two, thr)) {
    return new Rule(one, thr)
  }

  if (validateThreeBlocks(two, thr, four)) {
    return new Rule(two, four)
  }

  if (validateThreeBlocks(thr, four, five)) {
    return new Rule(thr, five)
  }
}

function validateFiveBlocks(...blocks) {
  return [
    b => b.isNoun(),
    b => b.isJoiner() && b.name === 'Is',
    b => b.isProperty(),
    b => b.isJoiner() && b.name === 'And',
    b => b.isProperty()
  ].every((test, i) => test(blocks[i]))
}

function validateThreeBlocks(...blocks) {
  return [
    b => b.isNoun(),
    b => b.isJoiner() && b.name === 'Is',
    b => b.isNoun() || b.isProperty()
  ].every((test, i) => test(blocks[i]))
}
