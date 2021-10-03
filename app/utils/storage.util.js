export function getFromStorage(itemKey) {
  return JSON.parse(localStorage.getItem(itemKey));
}

export function setIntoStorage(itemKey, valueStored) {
  return localStorage.setItem(itemKey, JSON.stringify(valueStored));
}