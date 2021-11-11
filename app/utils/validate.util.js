export function validateArray(arr){
  return !!arr && !!Array.isArray(arr);
}

export function isValid(item){
  return item !== undefined && item !== null;
}