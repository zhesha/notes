import { combineReducers } from "redux";
import formVisible from "./formVisible.reducer";
import noteList from "./noteList.reducer";
import newNote from "./newNote.reducer";

export default combineReducers({ formVisible, noteList, newNote });