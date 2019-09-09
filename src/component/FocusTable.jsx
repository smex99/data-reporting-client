import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
	Grid,
	Paper,
	Typography,
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
import NoteIcon from '@material-ui/icons/Note';
import FileIcon from '@material-ui/icons/InsertDriveFile';

import { makeStyles } from '@material-ui/core/styles';
import FocusDialog from './dialog/FocusDialog';

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
	}
}));

export default function FocusTable() {
	useEffect(() => {
		setIsLoading(true);
		axios
			.get('/api/report')
			.then(response => {
				const result = response.data.map(data => ({
					_id: data._id,
					invoice_id: data.invoice_id,
					metrics: data.metrics,
					model_id: data.model_id,
					nb_classes_predicted: data.nb_classes_predicted
				}));
				setData(response.data);
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

	function handleOpenImage() {
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
		const filterdPrediction = data.filter(item => item.predictions === number);
		setFiltredData(filterdPrediction);
	}

	async function getOriginalFileName(id) {
		const response = await axios.get(`/api/bb8/filename/${id}`);
		const { originalFileName } = response.data[0];
		alert(originalFileName);
	}

	return (
		<div className={classes.root}>
			{!isLoading && (
				<Paper className={classes.paper}>
					<Toolbar>
						<div className={classes.title}>
							<Typography color='inherit' variant='subtitle1'>
								Focus Reading Result
							</Typography>

							<div className={classes.spacer} />
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
								{data
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
												<IconButton size='small' color='primary'>
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
				<FocusDialog id={selectedId} />
			</Dialog>
		</div>
	);
}
