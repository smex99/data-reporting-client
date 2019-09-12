import React, { Component } from 'react';
import { Paper, FormControl, InputLabel, Input } from '@babel/core';
import {withStyles} from '@material-ui/core';


const styles = theme => ({
paper: {}
})

class Filter extends Component {
    handleChangeId(event) {}
    
    handleChangeCalssNumber(event) {}

	render() {
		return (
			<Paper>
				<Form>
					<FormControl>
						<InputLabel htmlFor=''>Class number</InputLabel>
						<Input
							name='class_number'
							margin='dense'
							value={''}
							onChange={() => this.handleChange()}
						/>
					</FormControl>

                    <FormControl>
                        <InputLabel name='' value={} onChange={}/>
                    </FormControl>
				</Form>
			</Paper>
		);
	}
}

export default withStyles(styles)(Filter)
