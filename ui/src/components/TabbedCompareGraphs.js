import React from 'react'

import { Tab } from 'rbx'

import { TERMS } from '../constants/dictionary'
import { GRAPHSCALE_TYPES } from '../constants'

import GraphControls from './GraphControls'
import GraphWithLoader from './GraphWithLoader'

export const TabbedCompareGraphs = (
  {
    secondaryGraph,
    confirmed,
    deaths,
    mortality,
    selected,
    handleSelectedGraph,
    handleGraphScale,
    handleShowPredictions,
    predictions,
    graphScale = GRAPHSCALE_TYPES.LINEAR,

    showLog,
    showPredictions,
    parentRegion,
    htmlId,
  },
) => {
  const activeData = () => {
    if (secondaryGraph === 'Cases') {
      const newData = []

      const firstHeader = Object.keys(confirmed)[0]
      const headers = ['Country', ...Object.keys(confirmed[firstHeader])]

      for (const country of Object.keys(confirmed)) {
        if (selected.indexOf(country) !== -1) {
          const values = showLog ? Object.values(confirmed[country]).map((val) => Math.log10(1 + val)) : Object.values(confirmed[country])
          newData.push([country, ...values])
        }
      }

      return {
        headers,
        data: newData,
      }
    } if (secondaryGraph === 'Deaths') {
      const newData = []

      const firstHeader = Object.keys(deaths)[0]
      const headers = ['Country', ...Object.keys(deaths[firstHeader])]

      for (const country of Object.keys(deaths)) {
        if (selected.indexOf(country) !== -1) {
          const values = showLog ? Object.values(deaths[country]).map((val) => Math.log10(1 + val)) : Object.values(deaths[country])
          newData.push([country, ...values])
        }
      }

      return {
        headers,
        data: newData,
      }
    } if (secondaryGraph === 'Mortality') {
      const newData = []

      const firstHeader = Object.keys(mortality)[0]
      const headers = ['Country', ...Object.keys(mortality[firstHeader])]

      for (const country of Object.keys(mortality)) {
        if (selected.indexOf(country) !== -1) {
          const values = Object.values(mortality[country])
          newData.push([country, ...values])
        }
      }

      return {
        headers,
        data: newData,
      }
    }
  }

  return (
    <>
      <Tab.Group size="large" kind="boxed" id="graphTabs">
          <Tab active={secondaryGraph === 'Cases'} onClick={() => { handleSelectedGraph('Cases') }}>Cases</Tab>
          <Tab active={secondaryGraph === 'Deaths'} onClick={() => { handleSelectedGraph('Deaths') }}>Deaths</Tab>
          <Tab tooltipPosition="right" tooltip={TERMS.CFR_DEFINITION} active={secondaryGraph === 'Mortality'} onClick={() => { handleSelectedGraph('Mortality') }}>Case Fatality Rate</Tab>
      </Tab.Group>

      <GraphControls
          className="TabbedCompareGraphs__controls"
          scale
          graphScale={graphScale}
          handleGraphScale={handleGraphScale}
          showPredictions={showPredictions}
          handleShowPredictions={handleShowPredictions}
          secondaryGraph={secondaryGraph}
          parentRegion={parentRegion}
          selected={selected}
          downloadCSV
          data={activeData()}
          downloadImage
          htmlId={htmlId}
      />

      <GraphWithLoader
          graphName="Cases"
          secondaryGraph={secondaryGraph}
          graph={confirmed}
          selected={selected}
          graphScale={graphScale}
          predictions={predictions}
          showPredictions={showPredictions}
          y_title="Total confirmed cases"
      />

      <GraphWithLoader
          graphName="Deaths"
          secondaryGraph={secondaryGraph}
          graph={deaths}
          selected={selected}
          graphScale={graphScale}
          y_title="Number of deaths"
      />

      <GraphWithLoader
          graphName="Mortality"
          secondaryGraph={secondaryGraph}
          graph={mortality}
          selected={selected}
          graphScale={graphScale}
          y_title="Case Fatality Rate Percentage"
      />

    </>
  )
}

export default TabbedCompareGraphs
