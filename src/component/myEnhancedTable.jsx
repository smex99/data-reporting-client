import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, lighten } from '@material-ui/core/styles';
import {
	Paper,
	Tooltip,
	IconButton,
	Checkbox,
	Switch,
	Typography,
	FormControlLabel,
	Toolbar,
	TableSortLabel,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	TablePagination
} from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import DeleteIcon from '@material-ui/icons/Delete';

// function createData(id, filename, classNumber, status) {
// 	return { id, filename, classNumber, status };
// }

// const rows = [
// 	createData('01ZFJS2834949123', 'INV_RMA_AWSOME_CAR_MARS_1', 6, false),
// 	createData('01ZFJS2834949127', 'INV_RMA_AWSOME_CAR_MARS_2', 1, false),
// 	createData('01ZFJS2834949122', 'INV_RMA_AWSOME_CAR_MARS_3', 3, false),
// 	createData('01ZFJS2834949124', 'INV_RMA_AWSOME_CAR_MARS_4', 4, false),
// 	createData('01ZFJS2834949125', 'INV_RMA_AWSOME_CAR_MARS_5', 5, false)
// ];

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
	button: {
		margin: theme.spacing(1)
	},
	visuallyHidden: {
		border: 0,
		clip: 'rect(0 0 0 0)',
		height: 1,
		margin: -1,
		overflow: 'hidden',
		padding: 0,
		position: 'absolute',
		top: 20,
		width: 1
	}
}));

function desc(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function stableSort(array, cmp) {
	const stabilizedThis = array.map((el, index) => [el, index]);

	stabilizedThis.sort((a, b) => {
		const order = cmp(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
	return order === 'desc'
		? (a, b) => desc(a, b, orderBy)
		: (a, b) => -desc(a, b, orderBy);
}

const headRows = [
	{ id: 'id', numeric: false, disablePadding: true, label: 'Invoice id' },
	{
		id: 'filename',
		numeric: false,
		disablePadding: false,
		label: 'Filename'
	},
	{
		id: 'classNumber',
		numeric: true,
		disablePadding: false,
		label: 'Class number'
	},
	{
		id: 'status',
		numeric: false,
		disablePadding: false,
		label: 'Status'
	}
];

function EnhancedTableHead(props) {
	const {
		classes,
		onSelectAllClick,
		order,
		orderBy,
		numSelected,
		rowCount,
		onRequestSort
	} = props;

	const createSortHandler = property => event => {
		onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow>
				<TableCell padding='checkbox'>
					<Checkbox
						indeterminate={numSelected > 0 && numSelected < rowCount}
						checked={numSelected === rowCount}
						onChange={onSelectAllClick}
						inputProps={{ 'aria-label': 'select all invoices' }}
					/>
				</TableCell>
				{headRows.map(row => (
					<TableCell
						key={row.id}
						align={row.numeric ? 'right' : 'left'}
						padding={row.disablePadding ? 'none' : 'default'}
						sortDirection={orderBy === row.id ? order : false}
					>
						<TableSortLabel
							active={orderBy === row.id}
							direction={order}
							onClick={createSortHandler(row.id)}
						>
							{row.label}
							{orderBy === row.id ? (
								<span className={classes.visuallyHidden}>
									{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
								</span>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

EnhancedTableHead.propTypes = {
	classes: PropTypes.object.isRequired,
	numSelected: PropTypes.number.isRequired,
	onRequestSort: PropTypes.func.isRequired,
	onSelectAllClick: PropTypes.func.isRequired,
	order: PropTypes.oneOf(['asc', 'desc']).isRequired,
	orderBy: PropTypes.string.isRequired,
	rowCount: PropTypes.number.isRequired
};

const useToolbarStyle = makeStyles(theme => ({
	root: {
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(1)
	},
	highlight:
		theme.palette.type === 'light'
			? {
					color: theme.palette.secondary.main,
					backgroundColor: lighten(theme.palette.secondary.light, 0.85)
			  }
			: {
					color: theme.palette.text.primary,
					backgroundColor: theme.palette.secondary.dark
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

const EnhancedTableToolbar = props => {
	const classes = useToolbarStyle();
	const { numSelected } = props;

	return (
		<Toolbar
			className={clsx(classes.root, {
				[classes.highlight]: numSelected > 0
			})}
		>
			<div className={classes.title}>
				{numSelected > 0 ? (
					<Typography color='inherit' variant='subtitle1'>
						{numSelected} selected
					</Typography>
				) : (
					<Typography variant='h6' id='tableTitle'>
						Result list
					</Typography>
				)}
			</div>
			<div className={classes.spacer} />
			<div className={classes.actions}>
				{numSelected > 0 ? (
					<Tooltip title='Delete'>
						<IconButton aria-label='delete'>
							<DeleteIcon />
						</IconButton>
					</Tooltip>
				) : (
					<Tooltip title='Filter list'>
						<IconButton aria-label='filter list'>
							<FilterListIcon />
						</IconButton>
					</Tooltip>
				)}
			</div>
		</Toolbar>
	);
};

EnhancedTableToolbar.propTypes = {
	numSelected: PropTypes.number.isRequired
};

export default function EnhancedTable() {
	useEffect(() => {
		axios
			.get('/api/metrics')
			.then(response => setRows(response.data.readingResult))
			.catch(error => console.log(error));
	}, []);

	const classes = useStyles();
	const [order, setOrder] = useState('asc');
	const [orderBy, setOrderBy] = useState('id');
	const [selected, setSelected] = useState([]);
	const [page, setPage] = useState(0);
	const [dense, setDense] = useState(false);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const [rows, setRows] = useState([]);

	function handleRequestSort(event, property) {
		const isDesc = orderBy === property && order === 'desc';
		setOrder(isDesc ? 'asc' : 'desc');
		setOrderBy(property);
	}

	function handleSelectAllClick(event) {
		if (event.target.checked) {
			const newSelecteds = rows.map(n => n.name);
			setSelected(newSelecteds);
			return;
		}
		setSelected([]);
	}

	function handleClick(event, name) {
		const selectedIndex = selected.indexOf(name);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, name);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1)
			);
		}

		setSelected(newSelected);
	}

	function handleChangePage(event, newPage) {
		setPage(newPage);
	}

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(+event.target.value);
		setPage(0);
	}

	function handleChangeDense(event) {
		setDense(event.target.checked);
	}

	const isSelected = name => selected.indexOf(name) !== -1;

	const emptyRows =
		rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

	return (
		<div className={classes.root}>
			<Paper className={classes.paper}>
				<EnhancedTableToolbar numSelected={selected.length} />
				<div className={classes.tableWrapper}>
					<Table
						className={classes.table}
						aria-labelledby='tableTitle'
						size={dense ? 'small' : 'medium'}
					>
						<EnhancedTableHead
							classes={classes}
							numSelected={selected.length}
							order={order}
							orderBy={orderBy}
							onSelectAllClick={handleSelectAllClick}
							onRequestSort={handleRequestSort}
							rowCount={rows.length}
						/>

						<TableBody>
							{stableSort(rows, getSorting(order, orderBy))
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((row, index) => {
									const isItemSelected = isSelected(row.id);
									const labelId = `enhanced-table-checkbox-${index}`;

									return (
										<TableRow
											hover
											onClick={event => handleClick(event, row.id)}
											role='checkbox'
											aria-checked={isItemSelected}
											tabIndex={-1}
											key={row.id}
											selected={isItemSelected}
										>
											<TableCell
												padding='checkbox'
												onClick={event => handleClick(event)}
											>
												<Checkbox
													checked={isItemSelected}
													inputProps={{ 'aria-labelledby': labelId }}
												/>
											</TableCell>
											<TableCell
												component='th'
												id={labelId}
												scope='row'
												padding='none'
											>
												{row.id}
											</TableCell>
											<TableCell align='right'>{row.filename}</TableCell>
											<TableCell align='right'>{row.classNumber}</TableCell>
											<TableCell align='right'>
												{row.status === true ? 'OK' : 'KO'}
											</TableCell>
										</TableRow>
									);
								})}
							{emptyRows > 0 && (
								<TableRow style={{ height: 49 * emptyRows }}>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
					</Table>

					<TablePagination
						rowsPerPageOptions={[5, 10, 25]}
						component='div'
						count={rows.length}
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

			<FormControlLabel
				control={<Switch checked={dense} onChange={handleChangeDense} />}
				label='Dense style'
			/>
		</div>
	);
}
