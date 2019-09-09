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
		originalFileName: ''
	};

	async componentWillMount() {
		const { id } = this.props;
		const response = await axios.get(`/api/bb8/filename/${id}`);
		const { originalFileName } = response.data[0];
		this.setState({ originalFileName });
	}

	render() {
		const { classes, onClose } = this.props;
		const { originalFileName } = this.state;

		return (
			<>
				<div className=''>
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

					<DialogContent dividers style={{ height: 800 }}>
						<img src={`/image/${originalFileName}`} alt='invoice-image' />
					</DialogContent>
				</div>
			</>
		);
	}
}

export default withStyles(styles)(InvoiceImageDialog);
