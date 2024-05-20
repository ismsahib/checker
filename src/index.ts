import "./aliases";
import fs from "fs";

const parseFile = (fileName) =>
  fs
    .readFileSync(fileName, "utf8")
    .split("\n")
    .map((str) => str.trim().toLowerCase())
    .filter((str) => str.length > 10);

const collectData = () => {
  const result: Record<string, string[]> = {};
  for (let index = 5; index <= 46; index++) {
    result[index.toString()] = parseFile(`src/DATA/${index}.txt`);
  }
  return result;
};

const merklyChecker = (wallets: string[]) => {
  const result: Record<string, string[]> = {};
  const data = collectData();

  wallets.forEach((wallet) => {
    for (const [key, value] of Object.entries(data)) {
      if (value.includes(wallet)) {
        if (result[key]) {
          result[key] = [...result[key], wallet];
        } else {
          result[key] = [wallet];
        }
      }
    }
  });
  return result;
};

console.log(merklyChecker(parseFile("src/wallets.txt")));
