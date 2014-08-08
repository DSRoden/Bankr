#!/bin/bash

mongoimport --drop --db $1 --collection accounts --file ../../db/account.json
mongoimport --drop --db $1 --collection transfers --file ../../db/transfers.json

