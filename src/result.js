import React from 'react';
import { Tabs } from 'element-react';

import 'element-theme-chalk';

import TagTable from './tag-table';
import './result.css';

const Result = (props) => {
  const { parsedData } = props;

  let resultElement;
  if (parsedData) {
    resultElement = (
      <Tabs className="results">
        <Tabs.Pane label="Tags" name="1">
          <TagTable data={parsedData.tags} />
        </Tabs.Pane>
        <Tabs.Pane label="Triggers" name="2">
          triggers
        </Tabs.Pane>
        <Tabs.Pane label="Variables" name="3">
          variables
        </Tabs.Pane>
      </Tabs>
    );
  } else {
    resultElement = <div>No Results</div>;
  }

  return resultElement;
};

export default Result;
