/**
 * Value transformation
 * From [[{file}, {file}], [{file}, {file}]]
 * To [{folder1: [{file}, {file}]}, {folder2: [{file},{file}]}]
 */



import _ from 'lodash';
import data from './data';

const values = _.flatten(data);

const folders = values
// create unique folders from common key path
  .reduce((acc: any[], curr: any) => {
    const path = curr['Key'];
    const folder = path.substring(0, path.lastIndexOf('/'));
    if (!acc.includes(folder)) {
      acc.push(folder);
    }
    return acc;
  }, [])
// create object type from folders
  .reduce((acc: any[], curr: any[]) => {
    acc.push({ [curr]: [] });
    return acc;
  }, []);

  // loop through all the files, add them to their folder
values.forEach((data) => {
  folders.forEach((folder) => {
    const key = data.Key.substring(0, data.Key.lastIndexOf('/'));
    const dir = Object.keys(folder)[0];
    if (key === dir) {
      folder[key].push(data);
    }
  });
});

console.log(folders);
 
