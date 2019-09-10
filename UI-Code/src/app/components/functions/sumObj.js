export function sumObj (obj) {
    return Object.keys(obj).reduce(function (sum, next) {
      return sum + obj[next];
    }, 0);
  };