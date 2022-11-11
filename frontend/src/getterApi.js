import axios from "axios";
import React from "react";
import { useState } from "react";
import { AccountList } from "./data/AccountList";
const baseEndpoint = "https://localhost:8000"

export var currentUser = undefined;
export function setCurrentUser(setUser){
    currentUser = AccountList.find(x=> x.accountId == setUser);
}