import React from 'react';
import axios from 'axios';
import {
	CircularProgress,
	Grid,
	Paper,
	Dialog,
	Typography,
	FormGroup,
	FormControl,
	InputLabel,
	Input,
	Select,
	MenuItem,
	Toolbar,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	TablePagination,
	IconButton
} from '@material-ui/core';
import CodeIcon from '@material-ui/icons/Code';
import FileIcon from '@material-ui/icons/InsertDriveFile';
import { withStyles } from '@material-ui/core/styles';
import BB8Dialog from '../component/dialog/BB8Dialog';
import InvoiceImageDialog from '../component/dialog/InvoiceImageDialog';

const tableHeaders = [
	{ id: 1, label: 'Invoice id' },
	{ id: 2, label: 'Execution time (ms)' },
	{ id: 3, label: 'Loading image (ms)' },
	{ id: 4, label: 'Loading model CNN (ms)' },
	{ id: 5, label: 'Loading model OD (ms)' },
	{ id: 6, label: 'Nb classes predicted' },
	{ id: 7, label: 'Model id' }
];

const styles = theme => ({
	root: {
		width: '100%',
		marginTop: theme.spacing(3)
	},
	paper: {
		width: '100%',
		marginBottom: theme.spacing(2)
	},
	table: {
		minWidth: 750
	},
	tableWrapper: {
		overflowX: 'auto'
	},
	spacer: {
		flex: '1 1 100%'
	},
	actions: {
		color: theme.palette.text.secondary
	},
	title: {
		flex: '0 0 auto'
	},
	formControl: {
		minWidth: 180,
		margin: theme.spacing(1)
	},
	loader: {
		marginLeft: '50%',
		marginTop: '100',
		marginBottom: '100'
	},
	selectEmpty: {}
});

class BB8Table extends React.Component {
	state = {
		isLoading: false,
		page: 0,
		rowsPerPage: 10,
		keyword: '',
		open: false,
		openImane: false,
		data: [],
		filtredData: [],
		classesNumber: '',
		selectedId: ''
	};

	componentDidMount() {
		this.setState({ isLoading: true });

		// Send api request and map the response to add length of predictions for each invoice as an object proprtie.
		axios
			.get('/api/bb8')
			.then(response => {
				const result = response.data.map(data => ({
					_id: data._id,
					invoice_id: data.invoice_id,
					metrics: data.metrics,
					model_id: data.model_id,
					predictions: data.predictions.length
				}));

				this.setState({
					data: result,
					filtredData: result,
					isLoading: false
				});
			})
			.catch(error => console.log(error));
	}

	handleOpen(id) {
		this.setState({
			selectedId: id,
			open: true
		});
	}

	handleClose() {
		this.setState({ open: false });
	}

	handleOpenImage(id) {
		this.setState({ openImage: true, selectedId: id });
	}

	handleCloseImage() {
		this.setState({ openImage: false });
	}

	handleChangePage = (event, page) => {
		this.setState({ page });
	};

	handleChangeRowsPerPage = event => {
		this.setState({ rowsPerPage: event.target.value });
	};

	handleChange(event) {
		this.setState({
			classesNumber: event.target.value,
			filtredData: this.filterPredictions(event.target.value)
		});
	}

	handleChangeSearch(event) {
		const filtred = this.state.data.filter(item =>
			item.invoice_id.match(event.target.value)
		);

		this.setState({
			keyword: event.target.value,
			filtredData: filtred
		});
	}

	filterPredictions(number) {
		return this.state.data.filter(item => item.predictions === number);
	}

	render() {
		const { classes } = this.props;
		const {
			isLoading,
			keyword,
			page,
			rowsPerPage,
			open,
			openImage,
			classesNumber,
			filtredData,
			selectedId
		} = this.state;

		return (
			<div className={classes.root}>
				<Grid container direction='column'>
					<Paper className={classes.paper} elevation={0}>
						<FormGroup row>
							<FormControl className={classes.formControl}>
								<InputLabel htmlFor='class-number'>Class number</InputLabel>
								<Select
									value={classesNumber}
									margin='dense'
									onChange={event => this.handleChange(event)}
									inputProps={{
										name: 'class-number',
										id: 'class-number'
									}}
								>
									<MenuItem value={0}>0</MenuItem>
									<MenuItem value={1}>1</MenuItem>
									<MenuItem value={2}>2</MenuItem>
									<MenuItem value={3}>3</MenuItem>
									<MenuItem value={4}>4</MenuItem>
									<MenuItem value={5}>5</MenuItem>
									<MenuItem value={6}>6</MenuItem>
									<MenuItem value={7}>7</MenuItem>
									<MenuItem value={8}>8</MenuItem>
									<MenuItem value={9}>9</MenuItem>
									<MenuItem value={10}>10</MenuItem>
									<MenuItem value={11}>11</MenuItem>
								</Select>
							</FormControl>

							<FormControl className={classes.formControl}>
								<InputLabel htmlFor='search'>Invoice Id</InputLabel>
								<Input
									name='search'
									value={keyword}
									margin='dense'
									onChange={event => this.handleChangeSearch(event)}
								/>
							</FormControl>
						</FormGroup>
					</Paper>

					{!isLoading ? (
						<Paper className={classes.paper} elevation={0}>
							<Toolbar>
								<div className={classes.title}>
									<Typography variant='h6'>BB8 Reading Table</Typography>
								</div>
							</Toolbar>
							<div className={classes.tableWrapper}>
								<Table className={classes.table} size='small'>
									<TableHead>
										<TableRow>
											{tableHeaders.map(item => (
												<TableCell key={item.id}>{item.label}</TableCell>
											))}
											<TableCell>Json</TableCell>
											<TableCell>Image</TableCell>
										</TableRow>
									</TableHead>

									<TableBody>
										{filtredData
											.slice(
												page * rowsPerPage,
												page * rowsPerPage + rowsPerPage
											)
											.map(item => (
												<TableRow hover key={item._id}>
													<TableCell>{item.invoice_id}</TableCell>
													<TableCell>
														{item.metrics.execution_time_in_ms.toFixed(2)}
													</TableCell>
													<TableCell>
														{item.metrics.loading_image.toFixed(2)}
													</TableCell>
													<TableCell>
														{item.metrics.loading_model_cnn.toFixed(2)}
													</TableCell>
													<TableCell>
														{item.metrics.loading_model_od.toFixed(2)}
													</TableCell>

													<TableCell>{item.predictions}</TableCell>
													<TableCell>{item.model_id}</TableCell>
													<TableCell>
														<IconButton
															size='small'
															color='primary'
															onClick={() => this.handleOpen(item.invoice_id)}
														>
															<CodeIcon />
														</IconButton>
													</TableCell>

													<TableCell>
														<IconButton
															size='small'
															color='primary'
															onClick={() =>
																this.handleOpenImage(item.invoice_id)
															}
														>
															<FileIcon />
														</IconButton>
													</TableCell>
												</TableRow>
											))}
									</TableBody>
								</Table>

								<TablePagination
									rowsPerPageOptions={[10, 25, 50]}
									component='div'
									count={filtredData.length}
									rowsPerPage={rowsPerPage}
									page={page}
									backIconButtonProps={{
										'aria-label': 'previous page'
									}}
									nextIconButtonProps={{
										'aria-label': 'next page'
									}}
									onChangePage={this.handleChangePage}
									onChangeRowsPerPage={this.handleChangeRowsPerPage}
								/>
							</div>
						</Paper>
					) : (
						<CircularProgress className={classes.loader} />
					)}
				</Grid>

				<Dialog
					open={open}
					maxWidth='lg'
					onClose={() => this.handleClose()}
					aria-labelledby='json-output'
				>
					<BB8Dialog id={selectedId} onClose={() => this.handleClose()} />
				</Dialog>

				<Dialog
					open={openImage}
					maxWidth='lg'
					onClose={() => this.handleCloseImage()}
					aria-labelledby='invoice-image'
				>
					<InvoiceImageDialog
						id={selectedId}
						onClose={() => this.handleCloseImage()}
					/>
				</Dialog>
			</div>
		);
	}
}

export default withStyles(styles)(BB8Table);
