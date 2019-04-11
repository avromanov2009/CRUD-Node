import React, {Component} from "react";

class UpdateButton extends Component {
    constructor(props) {
        super(props);
    }

    renderButton() {
        if (this.props.mustUpdate) {
            return (
                <input
                    className="form-submit should-update"
                    value="Update"
                    type="button"
                    onClick={this.props.onClick}
                />
            )
        } else {
            return (
                <input
                    className="form-submit"
                    value="Update"
                    type="button"
                    onClick={this.props.onClick}
                />
            )
        }
    }

    render() {
        return (
            this.renderButton()
        )
    }
}


export default UpdateButton;
