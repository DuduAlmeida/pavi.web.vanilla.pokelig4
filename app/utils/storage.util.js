export function getFromStorage(itemKey) {
  return localStorage.getItem(itemKey);
}

export function setIntoStorage(itemKey, valueStored) {
  return localStorage.setItem(itemKey, valueStored);
}