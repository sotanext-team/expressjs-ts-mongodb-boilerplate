import http from "http";
import https from "https";
import url from "url";
import querystring from "querystring";

//   formatOutputData(data, message, additionalProperties = {}) {
//     const result = {};

//     result.data = typeof data === "object" ? data : null;

//     result.message = message ? message : "{{common.success}}";

//     Object.assign(result, additionalProperties);

//     return result;
//   }

//   displayErrorMessage(error) {
//     const result = {
//       message: {},
//     };

//     try {
//       //=== SQL string error ===
//       if (typeof error == "object" && !error.errors) {
//         result.message = "{{common.somethingWentWrong}}";

//         if (error.original && error.original.detail) {
//           result.message = error.original.detail;
//         }
//       }

//       //=== validation error ===
//       if (error && error.errors && Array.isArray(error.errors)) {
//         error.errors.forEach((error) => {
//           if (
//             error.type === "Validation error" ||
//             error.type === "notNull Violation"
//           ) {
//             if (
//               typeof result.message == "string" ||
//               (typeof result.message == "object" && !result.message.validation)
//             ) {
//               result.message = {
//                 validation: true,
//               };
//             }

//             result.message[error.path] = error.message;
//           } else {
//             result.message = this.ucFirst(error.message);
//           }
//         });
//       }

//       //=== excetion ===
//       if (typeof error == "object" && error.message && !error.errors) {
//         result.message = error.message;
//       }

//       //=== other ===
//       if (
//         !(
//           (typeof error == "object" && !error.errors) ||
//           (error && error.errors && Array.isArray(error.errors))
//         )
//       ) {
//         result.message = this.ucFirst(error);
//       }
//     } catch (exception) {
//       result.message = "{{common.somethingWentWrong}}";
//     }

//     return result;
//   }

/**
 * Turn the string to camel case
 * @param str
 * @returns {string}
 */
export const camelize = (str: string) => {
  return str.trim().replace(/[-_\s]+(.)?/g, (match, c) => c.toUpperCase());
};

/**
 * Uppercase first char
 * @param str
 * @returns {string}
 */
export const ucFirst = (str: string) => {
  if (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return str;
};
/**
 * Validate a json string
 * @param str
 * @returns {boolean}
 */
export const isValidJson = (str: string) => {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
};
