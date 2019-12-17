import React, { Component } from "react";
import InputDialog from "../../components/UI/Dialog/InputDialog";
import { generateInputDialogObject, valid } from "../../shared/utility";

import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

class ConfigQuicklyTask extends Component {
  state = {
    task: { id: false, name: "", list_id: false },
    controls: {
      name: {
        label: this.props.translations.quicklyTaskName,
        required: true,
        characterRestriction: 40
      }
    },
    editTask: null,
    dialog: false
  };

  componentDidMount() {
    this.initQuicklyTask(this.props.task_id);
  }

  initQuicklyTask = task_id => {
    const { translations } = this.props;
    if (task_id !== false) {
      this.props.onInitQuicklyTask(task_id, res => {
        this.setState({ task: res, editTask: true });
        this.showDialog(translations.editTask);
      });
    } else {
      this.setState({ editTask: false });
      this.showDialog(translations.newTask);
    }
  };

  updateTask = (name, value) => {
    const { task } = this.state;
    task[name] = value;
    this.setState({ task });
  };

  changeInputHandler = (name, save = false, value = this.state.task.name) => {
    const { task, controls } = this.state;
    const { list_id, toggleModal, translations } = this.props;
    valid(controls, value, name, translations, newControls => {
      this.updateTask(name, value);
      if (save && !newControls[name].error) {
        if (list_id !== false) {
          this.props.onSaveQuicklyTask(task, list_id, () => {
            delete newControls[name].error;
            toggleModal(task);
          });
        }
      }
      this.setState({ controls: newControls });
    });
  };

  showDialog = title => {
    const { task } = this.state;
    const dialog = generateInputDialogObject(
      title,
      true,
      task.name,
      value => this.changeInputHandler("name", false, value),
      {
        Save: () => this.changeInputHandler("name", true),
        Cancel: () => this.props.toggleModal()
      }
    );
    this.setState({ dialog });
  };

  render() {
    const { dialog, controls } = this.state;

    return (
      <React.Fragment>
        {dialog && (
          <InputDialog
            showModal={this.props.showModal}
            elementConfig={controls.name}
            title={dialog.title}
            focus={dialog.focus}
            value={dialog.value}
            onChange={dialog.onChange}
            buttons={dialog.buttons}
          />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    theme: state.theme.theme,
    translations: {
      ...state.settings.translations.ConfigQuicklyTask,
      ...state.settings.translations.validation
    }
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onInitQuicklyTask: (id, callback) =>
      dispatch(actions.initQuicklyTask(id, callback)),
    onSaveQuicklyTask: (task, list_id, callback) =>
      dispatch(actions.saveQuicklyTask(task, list_id, callback))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ConfigQuicklyTask);
