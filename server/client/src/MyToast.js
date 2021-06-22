import Toast from 'react-bootstrap/Toast';
import {Component} from "react";

class MyToast extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title || 'Rank me',
            time: Date.now(),
            message: this.props.message
        }
    }

    render() {
        console.log("Toast")
        return(
            <Toast>
                <Toast.Header>
                    <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                    <strong className="mr-auto">{this.state.title}</strong>
                    <small>11 mins ago</small>
                </Toast.Header>
                <Toast.Body>{this.state.message}</Toast.Body>
            </Toast>
        )
    }
}

export default MyToast
