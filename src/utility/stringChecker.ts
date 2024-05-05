const forbiddenStrings = ["admin", "root", "user", "password", "query"];
const symbols = /[$%^*(){}\[\]"',\\/]/;
export function stringChecker(string: string) {
  if (!string) return;
  if (symbols.test(string) || forbiddenStrings.includes(string.toLowerCase()))
    return true;
  else return false;
}
