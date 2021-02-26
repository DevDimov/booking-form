This is a simple booking form created with HTML, CSS and Javascript.

When the HTML body loads, a Javascript function sets the earliest selectable date to the current one and the maximum to 2 weeks in the future.

When the user selects a date, a function updates the available options in the "Time" dropdown menu based on the current time of day, the date selected, and the restaurant's opening hours. The restaurant is open from 10am to 7pm on week days and from 12pm to 5pm on weekends. If a customer interacts with the form around 3pm on a Tuesday, the earliest a table could be booked for would always be at the next round hour (4pm in this case) within the opening times. If a customer is filling the form at 7am on Wednesday, the earliest a table could be booked for would be 10am when the restaurant opens.

The form would also notify the user if any required fields have been left incomplete or contain incorrect input, such as a mobile number containing less than 11 digits.

On a side note, this form was never intend to catch all possible user-generated errors, but to give me a chance to practice and improve my skills in writing HTML, CSS and Javascript.
