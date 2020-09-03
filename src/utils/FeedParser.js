/**
 * Utility module to process each feed before
 * passing as props to the FeedCard component
 */

/**
 * Must have fields of an item
 */
const requiredFields = [
  'title', 
  'date', 
  'link', 
  'content'
];
const months = [
  'Jan', 
  'Feb', 
  'Mar', 
  'Apr', 
  'May', 
  'Jun', 
  'Jul', 
  'Aug', 
  'Sep', 
  'Oct', 
  'Nov', 
  'Dec'
];

/**
 * Method to check if all the required fields
 * are present in the item.
 * 
 * @returns {Boolean} True if an item has all
 * the necessary fields required to successfully
 * render a FeedCard component.
 */
export function validateItem(item) {
  requiredFields.forEach(field => {
    if (item[field] === undefined ||
        item[field] == null ||
        item[field] === "") {
      return false;
    }
  });
  return true;
}

/**
 * Method to check for author or creator.
 * Some feeds only provide an author or creator.
 * 
 * @returns An item object with the field author.
 * If the item does not have author AND creator,
 * null is returned.
 */
export function checkAuthor(item) {

  // Check for author AND creator
  if (item.author === undefined &&
      item.creator === undefined) {
    return null;
  }

  if (item.author !== undefined) {
    return item;
  }
  item.author = item.creator;
  return item;
}

/**
 * Method to parse the date into a more human
 * readable format (YYYY MM DD)
 * 
 * @param dateStr Date in various formats
 * @returns {String} Formatted date
 */
export function parseDate(dateStr) {

  let date = new Date(dateStr);
  let result = date.getFullYear() + ' ';
  result += months[date.getMonth()] + ' ';
  result += date.getDate() + '';
  return result;
}



