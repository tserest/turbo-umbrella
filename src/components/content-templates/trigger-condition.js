import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import VariableLink from './variable-link';

const useStyles = makeStyles(theme => ({
  inputLike: {
    borderColor: theme.palette.divider,
    borderStyle: 'solid',
    borderWidth: '1px',
    padding: theme.spacing(1),
  },
  operator: {
    fontWeight: 'bold',
  },
  operatorBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default function TriggerConditions(props) {
  const classes = useStyles();
  const { conditions, navigation } = props;

  const replaceReferenceWithLink = (stringValue, index) => {
    const stringReference = stringValue.match(/{{(.+)}}/)[1];
    return (
      <VariableLink
        key={`${stringReference}-${index}`}
        navigation={navigation}
        variableName={stringReference}
      />
    );
  };

  return (
    <>
      <Typography variant="h6">Conditions:</Typography>
      {conditions.map((condition, index) => {
        const { variable, operator, value } = condition;

        if (variable !== '{{Datalayer(2): gtm.triggers}}') {
          return (
            <Grid key={`${variable}-${operator}`} container direction="row" alignItems="center" spacing={3}>
              <Grid item xs={4}>
                <Typography variant="subtitle1" className={classes.inputLike}>{replaceReferenceWithLink(variable, index)}</Typography>
              </Grid>
              <Grid item xs={2} className={classes.operatorBox}>
                <Typography variant="body1" className={classes.operator}>{operator}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1" className={classes.inputLike}>{value}</Typography>
              </Grid>
            </Grid>
          );
        }
        return (null);
      })}
    </>
  );
}

TriggerConditions.propTypes = {
  conditions: PropTypes.arrayOf(PropTypes.shape({
    variable: PropTypes.string.isRequired,
    operator: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  navigation: PropTypes.func.isRequired,
};