import React from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import {
	Typography,
	DialogTitle,
	DialogContent,
	IconButton
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500]
	}
});

class FocusDialogs extends React.Component {
	state = {};

	componentDidMount() {
		const { id } = this.props;
		axios
			.get(`/api/focus/${id}`)
			.then(response => this.setState({ ...response.data[0] }))
			.catch(error => {
				console.log(error);
			});
	}

	render() {
		const { classes, onClose } = this.props;
		return (
			<>
				<DialogTitle disableTypography>
					<Typography variant='h6'>Json Output</Typography>

					<IconButton
						aria-label='close'
						className={classes.closeButton}
						onClick={onClose}
					>
						<CloseIcon />
					</IconButton>
				</DialogTitle>
				<DialogContent dividers style={{ height: 500 }}>
					<pre>{JSON.stringify(this.state, null, 2)}</pre>
				</DialogContent>
			</>
		);
	}
}

export default withStyles(styles)(FocusDialogs);
