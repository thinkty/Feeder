/**
 * Utility module to handle local storage related actions
 */

/**
 * Check if an object specified by the given key exists in local storage
 * 
 * @param {String} key 
 */
export function checkItem(key) {

  assertKey(key);

  return !!localStorage.getItem(key);
}

/**
 * Retrieve an item specified by the given key from local storage.
 * 
 * @param {String} key 
 * @param {boolean} isJSON Whether the item to retrieve is a JSON object
 */
export function getItem(key, isJSON) {

  assertKey(key);

  if (isJSON) {
    return JSON.parse(localStorage.getItem(key));
  }
  return localStorage.getItem(key);
}

/**
 * Retrieve an item specified by the given key from local storage. If the item
 * does not exist, return null.
 * 
 * @param {String} key 
 * @param {Object} data Object to store
 * @param {boolean} isJSON Whether the item to retrieve is a JSON object
 */
export function setItem(key, data, isJSON) {

  assertKey(key);

  if (isJSON) {
    localStorage.setItem(key, JSON.stringify(data));
  } else {
    localStorage.setItem(key, data);
  }
}

/**
 * Helper function to check whether given key valid: not null and not empty
 * 
 * @param {String} key
 */
function assertKey(key) {
  if (!key || key === '') {
    throw new Error(`Assertion failed for given key: ${key}`);
  }
}