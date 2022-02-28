#!/usr/bin/env bash
# start test postman
POSTMAN_API=PMAK-60e810bd90a70f0063a43e36-4667b780c5f556859b170ecaf74aeaccb8
POSTMAN_ENV=14835150-bb22fcfc-0ddc-4a6b-ba54-455bcd705e81 
POSTMAN_COLLECTION=14835150-c2dffeef-b252-4ea3-928d-53f3dadd4ceb


newman run https://api.getpostman.com/collections/${POSTMAN_COLLECTION}?apikey=${POSTMAN_API} --environment https://api.getpostman.com/environments/${POSTMAN_ENV}?apikey=${POSTMAN_API}