# GraphQL exercise -- front and back end

There are a few different things to play with here.

## Back end

If you just `npm install` from the root folder of this repository, you will be ready to run one of two backend GraphQL APIs:

* `node hello` doesn't do much. It's the typical _Hello World_ implementation, useful to see the very minimum needed to run the tech.
* `node server` is the **Dogs** app. It brings a list of breeds and some features of each of them. I shamelessly borrowed some from https://dog.ceo/dog-api/breeds-list and am serving them statically -- I wasn't concerned with connecting with an external provider as I was building this.

If you go to http://localhost:4000/graphql, you will have access to the GraphQL console where you can play with queries directly.

Then, on to the...

## Front end

There's a simple TypeScript React app to query the backend and display the data.

Just open another terminal into the `client` folder and run `npm install` and `npm start`. When both frontend and backend are running, go to http://localhost:3000.

You can find your pooch by any of the fields there, or a combination of them!

## What's New

* Improved matching algorithm for better reliability on the back end
* Improved overall look and feel. Not that this is beautiful now, but boy it was ugly before.
* Added some form validation with [react-hook-form](https://react-hook-form.com/) just because.
  * *Any one* of the fields is required, but not any one in particular. The **Submit** button is there now just to trigger the validation, therefore, since the results come *on-the-fly*.
  * All fields have some max length with their own validation message.

## Things to improve

* Restrict to matches from all fields (currently matching *any* fields)
* Unite the fields into a single one, and figure the query out on the backend
* Bring the data dynamically from an external API.
