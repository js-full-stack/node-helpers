// const Calc = require("calc-js").Calc;

// console.log(process.argv);
// const [, , a, b] = process.argv;
// const numericResult = new Calc(parseFloat(a)).sum(parseFloat(b)).finish();

// console.log(numericResult);

//! ===================================

// const path = require("path");

// console.log("path.resolve: ", path.resolve("./currendDate.js"));
// console.log("path.join: ", path.join("./currendDate.js"));

// !=====================================
// *fs - readFile

// const fs = require("fs");
// const path = require("path");

// fs.readFile(path.resolve("./data.txt"), "utf8", (error, data) => {
//   if (error) {
//     console.error(error);
//   }
//   console.log(data);
// });

// *fs/promises - readFile
// const fs = require("fs/promises");
// const path = require("path");

// fs.readFile(path.resolve("./data.txt"), "utf8")
//   .then(console.log)
//   .catch(console.error);

//*fs/promises async/await
const fs = require("fs/promises");

const path = require("path");
(async () => {
  try {
    //   *Чтение
    const data = await fs.readFile(path.resolve("./data.txt"), "utf8");
    console.log(data);
    // * Запись и дозапись
    const newData = `${data} school`;
    await fs.writeFile("./data.txt", newData, "utf-8");

    //   *Удаление
    await fs.unlink("./currendDate.js");
  } catch (error) {
    console.log(error);
  }
})();
