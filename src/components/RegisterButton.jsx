import React, {Component} from "react";

class RegisterButton extends Component {
    constructor(props) {
        super(props);
    }

    renderButton() {
        if (this.props.validPass) {
            return (<input
                className="form-submit"
                value="Register"
                type="button"
                className="form-submit"
                onClick={this.props.onClick}
            />)
        } else {
            return (
                <div>
                    <p className="error">{this.props.errorTexts.eqPass}</p>
                    <input
                        className="form-submit"
                        value="Register"
                        type="button"
                        className={`form-submit pass-not-required`}
                    />
                </div>
            )
        }
    }

    render() {
        return (
            this.renderButton()
        )
    }
}


export default RegisterButton;
