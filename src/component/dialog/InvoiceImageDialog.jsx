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

class InvoiceImageDialog extends React.Component {
	state = {
		isLoding: false,
		originalFileName: ''
	};

	componentDidMount() {
		const { id } = this.props;
		this.setState({ isLoding: true });
		axios
			.get(`/api/report/filename/${id}`)
			.then(response => {
				const { originalFileName } = response.data[0];
				this.setState({ originalFileName, isLoding: false });
			})
			.catch(error => console.log(error));
	}

	componentWillUnmount() {
		this.setState({ isLoding: false, originalFileName: '' });
	}

	render() {
		const { classes, onClose } = this.props;
		const { originalFileName } = this.state;

		return (
			<>
				<DialogTitle disableTypography>
					<Typography variant='h6'>{originalFileName}</Typography>
					<IconButton
						aria-label='close'
						className={classes.closeButton}
						onClick={onClose}
					>
						<CloseIcon />
					</IconButton>
				</DialogTitle>

				<DialogContent dividers>
					<img
						src={`/image/${originalFileName}`}
						alt=''
						width='1200'
						height='auto'
					/>
				</DialogContent>
			</>
		);
	}
}

export default withStyles(styles)(InvoiceImageDialog);
