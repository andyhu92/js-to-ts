const $input = document.getElementById("input");
const $output = document.getElementById("output");

let SPACES = 2

const getType = (str) => {
  str = str.trim()
  if(/[\[|\]]/.test(str)) return "any[]";
  if(/["|']/.test(str)) return "string";
  if(/^[0-9]+$/.test(str)) return "number";
  return "object"
}

const transform = input => {
  input = input.trim()
  let res = `interface YouNameIt {`
  if (input[0] !== '{') return "Invalid obj"
  let i = 0, tmpStr = '', key = ''
  while (i < input.length) {
    const char = input[i]
    if(char == '{' || char == '}' ) {
      i++
      continue
    }
    tmpStr += char
    while(input[i + 1] != ":" && i < input.length) {
      tmpStr += input[++i]
    }
    key = tmpStr.trim()
    //Skip colon
    i+=2
    tmpStr = input[i]
    let strStack = []
    while(input[i + 1] !== "," && input[i + 1] !== "}" && i < input.length){
      tmpStr += input[++i]
    }
    //Skip comma
    i+=2
    let type = getType(tmpStr)
    tmpStr = ''
    res += `\n${Array(SPACES).fill(' ').join('')}${key}: ${type};`
    i++
  }


  res += '\n}'
  return res
}

["change", "keyup"].forEach(event => $input.addEventListener(event, () => $output.value = transform($input.value)))



