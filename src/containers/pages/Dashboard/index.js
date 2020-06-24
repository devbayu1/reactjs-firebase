import React, { Component, Fragment } from "react";
import "./Dashboard.scss";
import { connect } from "react-redux";
import {
  dataToAPI,
  getDataFromAPI,
  updateDataAPI,
  deleteDataAPI,
} from "../../../config/redux/action";

class Dashboard extends Component {
  state = {
    title: "",
    content: "",
    date: "",
    textButton: "SIMPAN",
    noteId: 0,
  };

  componentDidMount() {
    const userData = JSON.parse(localStorage.getItem("user"));
    this.props.getNotes(userData.uid);
  }

  saveNotes = () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const { title, content, textButton, noteId } = this.state;
    const { saveNotes, updateNotes } = this.props;

    const data = {
      userId: userData.uid,
      title: title,
      content: content,
      date: new Date().getTime(),
    };
    if (textButton === "SIMPAN") {
      saveNotes(data);
    } else {
      data.noteId = noteId;
      updateNotes(data);
    }
  };

  handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const val = target.value;
    this.setState({
      [name]: val,
    });
  };

  updateNotes = (note) => {
    console.log(note);
    this.setState({
      title: note.data.title,
      content: note.data.title,
      textButton: "UPDATE",
      noteId: note.id,
    });
  };

  cancelUpdate = () => {
    this.setState({
      title: "",
      content: "",
      textButton: "SIMPAN",
    });
  };

  deleteNote = (e, note) => {
    const userData = JSON.parse(localStorage.getItem("user"));
    e.stopPropagation();
    const data = {
      userId: userData.uid,
      noteId: note.id,
    };
    this.props.deleteNotes(data);
  };

  render() {
    const { title, content, textButton } = this.state;
    const { notes } = this.props;
    return (
      <div className="container">
        <div className="input-form">
          <input
            placeholder="title"
            name="title"
            id="title"
            className="input-title"
            value={title}
            onChange={this.handleChange}
          />
          <textarea
            placeholder="centent"
            name="content"
            id="content"
            className="input-content"
            value={content}
            onChange={this.handleChange}
          ></textarea>
          <div className="action-wrapper">
            {textButton === "UPDATE" ? (
              <button className="save-btn cancel" onClick={this.cancelUpdate}>
                Cancel
              </button>
            ) : (
              <div />
            )}
            <button className="save-btn" onClick={this.saveNotes}>
              {textButton}
            </button>
          </div>
        </div>
        <hr />
        {notes.length > 0 ? (
          <Fragment>
            {notes.map((item) => {
              return (
                <div
                  className="card-content"
                  key={item.id}
                  onClick={(note) => this.updateNotes(item)}
                >
                  <p className="title">{item.data.title}</p>
                  <p className="date">{item.data.date}</p>
                  <p className="content">{item.data.content}</p>
                  <div
                    className="delete-btn"
                    onClick={(e) => this.deleteNote(e, item)}
                  >
                    x
                  </div>
                </div>
              );
            })}
          </Fragment>
        ) : null}
      </div>
    );
  }
}

const reduxState = (state) => ({
  userData: state.user,
  notes: state.notes,
});

const reduxDispatch = (dispatch) => ({
  saveNotes: (data) => dispatch(dataToAPI(data)),
  getNotes: (data) => dispatch(getDataFromAPI(data)),
  updateNotes: (data) => dispatch(updateDataAPI(data)),
  deleteNotes: (data) => dispatch(deleteDataAPI(data)),
});

export default connect(reduxState, reduxDispatch)(Dashboard);
