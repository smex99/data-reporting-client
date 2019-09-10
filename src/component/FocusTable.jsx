import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
	Grid,
	Paper,
	Typography,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Toolbar,
	Dialog,
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
import { makeStyles } from '@material-ui/core/styles';
import FocusDialog from './dialog/FocusDialog';
import InvoiceImageDialog from './dialog/InvoiceImageDialog';

const tableHeaders = [
	{ id: 1, label: 'Invoice id' },
	{ id: 2, label: 'Execution time (ms)' },
	{ id: 3, label: 'Model id' },
	{ id: 4, label: 'Nb classes predicted' }
];

const useStyles = makeStyles(theme => ({
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
		minWidth: 180
	}
}));

export default function FocusTable() {
	useEffect(() => {
		setIsLoading(true);
		axios
			.get('/api/report')
			.then(response => {
				// const result = response.data.map(data => ({
				// 	_id: data._id,
				// 	invoice_id: data.invoice_id,
				// 	metrics: data.metrics,
				// 	model_id: data.model_id,
				// 	nb_classes_predicted: data.nb_classes_predicted
				// }));
				setData(response.data);
				setFiltredData(response.data);
				setIsLoading(false);
			})
			.catch(error => console.log(error));
	}, []);

	const classes = useStyles();
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState([]);
	const [filtredData, setFiltredData] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [classesNumber, setClassesNumber] = useState(0);
	const [open, setOpen] = useState(false);
	const [openImage, setOpenImage] = useState(false);
	const [selectedId, setSelectedId] = useState();

	function handleClickOpen(id) {
		setSelectedId(id);
		setOpen(true);
	}

	function handleClose() {
		setOpen(false);
	}

	function handleOpenImage(id) {
		setOpenImage(true);
	}

	function handleCloseImage() {
		setOpenImage(false);
	}

	function handleChange(event) {
		setClassesNumber(event.target.value);
		filterPredictions(event.target.value);
	}

	function handleChangePage(event, newPage) {
		setPage(newPage);
	}

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(+event.target.value);
		setPage(0);
	}

	function filterPredictions(number) {
		const filterdPrediction = data.filter(
			item => item.nb_classes_predicted === number
		);
		setFiltredData(filterdPrediction);
	}

	return (
		<div className={classes.root}>
			{!isLoading && (
				<Paper className={classes.paper}>
					<Toolbar>
						<Grid container direction='column' justify='center'>
							<Grid item>
								<div className={classes.title}>
									<Typography color='inherit' variant='subtitle1'>
										Focus Reading Result
									</Typography>

									{/* <div className={classes.spacer} /> */}
								</div>
							</Grid>

							<Grid item>
								<FormControl className={classes.formControl}>
									<InputLabel htmlFor='class-number'>
										Class Predicted
									</InputLabel>
									<Select
										value={classesNumber}
										margin='dense'
										onChange={handleChange}
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
							</Grid>
						</Grid>
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
									.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									.map(item => (
										<TableRow hover key={item._id}>
											<TableCell>{item.invoice_id}</TableCell>
											<TableCell>{item.metrics.execution_time_in_ms}</TableCell>
											<TableCell>{item.model_id}</TableCell>
											<TableCell>{item.nb_classes_predicted}</TableCell>
											<TableCell>
												<IconButton
													size='small'
													color='primary'
													onClick={() => handleClickOpen(item.invoice_id)}
												>
													<CodeIcon />
												</IconButton>
											</TableCell>

											<TableCell>
												<IconButton
													size='small'
													color='primary'
													onClick={() => handleOpenImage(item.invoice_id)}
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
							count={data.length}
							rowsPerPage={rowsPerPage}
							page={page}
							backIconButtonProps={{
								'aria-label': 'previous page'
							}}
							nextIconButtonProps={{
								'aria-label': 'next page'
							}}
							onChangePage={handleChangePage}
							onChangeRowsPerPage={handleChangeRowsPerPage}
						/>
					</div>
				</Paper>
			)}

			<Dialog
				maxWidth='lg'
				onClose={handleClose}
				aria-labelledby='customized-dialog-title'
				open={open}
			>
				<FocusDialog id={selectedId} onClose={handleCloseImage} />
			</Dialog>

			<Dialog
				maxWidth='xl'
				onClose={handleCloseImage}
				open={openImage}
				aria-labelledby='invoice-image'
			>
				<InvoiceImageDialog id={selectedId} onClose={handleCloseImage} />
			</Dialog>
		</div>
	);
}
