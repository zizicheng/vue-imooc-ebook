import Storage from "web-storage-cache";

const localStorage = new Storage();

export function setLocalStorage(key, value) {
  return localStorage.set(key, value);
}

export function getLocalStorage(key) {
  return localStorage.get(key);
}

export function removeLocalStorage(key) {
  return localStorage.delete(key);
}

export function clearLocalStorage() {
  return localStorage.clear();
}

export function setBookObject(fileName, key, value) {
  let book = getLocalStorage(`${fileName}-info`);
  if (!book) {
    book = {};
  }
  book[key] = value;
  setLocalStorage(`${fileName}-info`, book);
}

export function getBookObject(fileName, key) {
  let book = getLocalStorage(`${fileName}-info`);
  if (book) {
    return book[key];
  }
  return null;
}

export function getFontFamily(fileName) {
  return getBookObject(fileName, "fontFamily");
}

export function saveFontFamily(fileName, font) {
  setBookObject(fileName, "fontFamily", font);
}

export function getFontSize(fileName) {
  return getBookObject(fileName, "fontSize");
}

export function saveFontSize(fileName, fontSize) {
  setBookObject(fileName, "fontSize", fontSize);
}
export function getLocation(fileName) {
  return getBookObject(fileName, "location");
}
export function saveLocation(fileName, location) {
  setBookObject(fileName, "location", location);
}
export function getReadTime(fileName) {
  return getBookObject(fileName, "readTime");
}
export function saveReadTime(fileName, readTime) {
  setBookObject(fileName, "readTime", readTime);
}
export function getLocale() {
  return getLocalStorage("locale");
}

export function saveLocale(locale) {
  setLocalStorage("locale", locale);
}

export function getTheme() {
  return getLocalStorage("theme");
}

export function saveTheme(theme) {
  setLocalStorage("theme", theme);
}
