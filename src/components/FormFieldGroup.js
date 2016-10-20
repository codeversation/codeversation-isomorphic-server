import React, { PropTypes, Component } from 'react';
import { FormControl, FormGroup, ControlLabel } from 'react-bootstrap';

const FormFieldGroup = ({label, feedback, ...props}) => {
  return (
    <div>
      <FormGroup>
        <ControlLabel>{label}</ControlLabel>
        <FormControl {...props} />
      </FormGroup>
    </div>
  );
}

export default FormFieldGroup;
