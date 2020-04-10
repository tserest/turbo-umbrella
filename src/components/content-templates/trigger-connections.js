import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function TriggerConnections(props) {
  const classes = useStyles();
  const {
    tags,
    exceptions,
    navigation,
  } = props;

  return (
    <>
      {tags.length > 0 && (
      <Grid container direction="row" justify="flex-start" alignItems="center">
        <Typography variant="h6">Trigger for:</Typography>
        {tags.map((tag) => {
          const tagReference = tag.match(/{{(.+)}}/)[1];
          return (
            <Button
              key={`button-${tagReference}`}
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={() => navigation(0, tagReference)}
            >
              {tagReference}
            </Button>
          );
        })}
      </Grid>
      )}
      {exceptions.length > 0 && (
        <Grid container direction="row" justify="flex-start" alignItems="center">
          <Typography variant="h6">Exception for:</Typography>
          {exceptions.map((exception) => {
            const exceptionReference = exception.match(/{{(.+)}}/)[1];
            return (
              <Button
                key={`button-${exceptionReference}`}
                variant="contained"
                color="default"
                className={classes.button}
                onClick={() => navigation(0, exceptionReference)}
              >
                {exceptionReference}
              </Button>
            );
          })}
        </Grid>
      )}
    </>
  );
}

TriggerConnections.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
  exceptions: PropTypes.arrayOf(PropTypes.string),
  navigation: PropTypes.func.isRequired,
};

TriggerConnections.defaultProps = {
  tags: [],
  exceptions: [],
};
