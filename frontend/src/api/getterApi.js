import axios from "axios";
import React from "react";
import { useState } from "react";
import { AccountList } from "../data/AccountList";
const baseEndpoint = "https://localhost:8000"

export var currentUser = undefined;
export var filters = [];
export function addFilter(x){
    filters.push(x);
}
export function clearFilter(){
    filters.splice(0, filters.length)
}
export function setCurrentUser(setUser){
    currentUser = AccountList.find(x=> x.accountId == setUser);
}
export var filterOptions = ['College Town', 'Quiet Neighbourhood', 'Community', 'Nearby Attractions',
'Public Transportation', 'Families', 'Low Crime'];