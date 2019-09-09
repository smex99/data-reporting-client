import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
	Grid,
	Paper,
	Dialog,
	Typography,
	FormControl,
	InputLabel,
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

import { makeStyles } from '@material-ui/core/styles';

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
	},
	selectEmpty: {}
}));

export default function BB8Table() {
	useEffect(() => {
		setIsLoading(true);
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
				setData(result);
				setFiltredData(result);

				setIsLoading(false);
			})
			.catch(error => console.log(error));
	}, []);

	const classes = useStyles();
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState([]); // Describe the state shape of response data object
	const [filtredData, setFiltredData] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [classesNumber, setClassesNumber] = useState(0);
	const [selectedId, setSelectedId] = useState();
	const [open, setOpen] = useState(false);
	const [openImage, setOpenImage] = useState(false);

	function handleClickOpen(id) {
		setSelectedId(id);
		setOpen(true);
	}

	function handleClose() {
		setOpen(false);
	}

	function handleOpenImage(id) {
		setOpenImage(true);
		setSelectedId(id);
	}

	function handleCloseImage() {
		setOpenImage(false);
	}

	function handleChangePage(event, newPage) {
		setPage(newPage);
	}

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(+event.target.value);
		setPage(0);
	}

	function handleChange(event) {
		setClassesNumber(event.target.value);
		filterPredictions(event.target.value);
	}

	function filterPredictions(number) {
		const filterdPrediction = data.filter(item => item.predictions === number);
		setFiltredData(filterdPrediction);
	}

	return (
		<div className={classes.root}>
			{!isLoading && (
				<Paper className={classes.paper}>
					<Toolbar>
						<Grid container direction='column'>
							<Grid item>
								<div className={classes.title}>
									<Typography color='inherit' variant='subtitle1'>
										BB8 Reading Result
									</Typography>
								</div>
							</Grid>

							<Grid item>
								<FormControl className={classes.formControl}>
									<InputLabel htmlFor='class-number'>
										Number of classes
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
							count={filtredData.length}
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
				aria-labelledby='raw-json-dialog'
				open={open}
			>
				<BB8Dialog id={selectedId} onClose={handleClose} />
			</Dialog>

			<Dialog
				maxWidth='xl'
				onClose={handleCloseImage}
				aria-labelledby='invoice-image'
				open={openImage}
			>
				<InvoiceImageDialog id={selectedId} onClose={handleCloseImage} />
			</Dialog>
		</div>
	);
}
