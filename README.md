# contact-email-server

contact-email-server is a RestAPI which can be implemented in a contact-form

## Installation

Install all packages.

```bash
npm install
```

## .env
Now add a .env file in project directory. The project works with [nodemailer](https://nodemailer.com/usage/using-gmail/) and currently only with the gmail service. Look at the [nodemailer-gmail](https://nodemailer.com/usage/using-gmail/) docs for more information. For the .env file copy the following code.

```
# .env 
# application stage (dev, tst, pro)
STAGE=dev

# port
PORT=8080

# Mail options (DO NOT CHANGE THE SERVICE)
EMAIL_SERVICE=gmail
EMAIL_USER=YOUR EMAIL
EMAIL_PASSWORD=YOUR PASSWORD
EMAIL_TO=THE EMAILADDRESS WHERE YOU WOULD LIKE TO RECEIVE THE EMAIL
```

## Deployment
Start the server

```bash
npm start
```

The server will start on the port 3000 but you can change the port in the .env file

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)