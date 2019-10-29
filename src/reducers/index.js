import { combineReducers } from "redux";
import formVisible from "./formVisible.reducer";
import noteList from "./noteList.reducer";

export default combineReducers({ formVisible, noteList });