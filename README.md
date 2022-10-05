The repository contains scripts for automation boolean-based SQLi. 
This is not an alternative to sqlmap. I didn't plan to reinvent the wheel. 
The advantage and purpose of these scripts is semi-automated operation and flexibility, due to manual control of payloads and parameters.

The scripts were created for the lab: https://portswigger.net/web-security/sql-injection/blind/lab-conditional-responses
You can practice on it. You will only need to change the subdomain and cookies.

findLength.js
Defines the length of the value you are looking for.

You need to:
1) Determine the place of injection (get params, post body or headers);
2) Make an sql-query, using the operator > and 'middle' variable;
3) Assume the range in which the length of the value you are looking for;
4) Specify the value that appears on the page in case of a true sql query;

findValue.js
Defines the value you are looking for.

You need to:
1) Determine the place of injection (get params, post body or headers);
2) Make an sql-query, using the operator > and 'middle' and 'i' variable;
3) Determine the value length manually or from findLength.js;
4) Specify the value that appears on the page in case of a true sql query;

good luck!
