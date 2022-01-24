# Data Sanitizer

This program is an attempt to respond to [this given problem](https://github.com/planity/test_recrutement/tree/master/backend_junior).

## Requirements

To run this program, you just need a working version of [Node.js](https://nodejs.org/en/) on your device.

Make sure you also fill the `conf.json` file with the following inputs of your choice:

`"hostname" :` for the source hosting the damaged data (example: recrutement-practice-default-rtdb.firebaseio.com)

`"jsonBoxHost" :`  with the address of your jsonBox host (example: localhost)

`"JsonBox" :`  with the address of your jsonBox (example: box_d8b7af7feae0ce3a9165)

## Run

A simple `npm start` is enough.

## Approach

KISS, regarding the fact this case is a one-shot need.

Since using routes would be useless, I see the use of a server framework as 'overkill'.

Also would be the use of a model-route-controller-service

I also made sure to only use pure node.js to make it funnier.



