import { apiUrl, DEFAULT_MESSAGE_TIMEOUT } from "../../config/constants";
import axios from "axios";
import { LOADING_USER, UserActionTypes } from "./types";
import { AppThunk } from "../types";

const loadingUser = (): UserActionTypes => ({ type: LOADING_USER });
