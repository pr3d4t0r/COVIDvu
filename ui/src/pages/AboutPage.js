import React from 'react'

import {
  Box, Button, Content, Title, Notification, Level, Select, Generic
} from 'rbx'

import store from 'store2'
import ContentLayout from '../layouts/ContentLayout'

import { useHistory } from 'react-router'

import { usePageTitle } from '../hooks/ui'

import { CLIENT_COUNTRY_KEY, CLIENT_COUNTRY_CODE_KEY } from '../constants'

const isoCountries = require('../constants/iso-countries.json')

export const AboutPage = () => {
  const history = useHistory()

  usePageTitle('About the Project')

  return (

    <ContentLayout>
      <Box>
        <Content>
          <Title size={2}>About The Project</Title>

          <Notification color="info">
            Check out our
            {' '}
            <Generic as="a" onClick={() => { history.push('/whatsnew')}}>What&apos;s New</Generic>
            {' '}
            page for more details on the latest features on the site.
          </Notification>

          <p>
            Volunteers building and sharing current, accurate, near real-time COVID-19 tracking and prediction tools.
          </p>

          <Title size={4}>Methodology</Title>
          <p>
            Check out
            {' '}
            <Generic as="a" onClick={() => { history.push('/about/methodology/prediction')}}>how we model predictions</Generic>
            {' '}
            and how we arrived at the numbers seen after clicking &quot;Show Predictions&quot;.
          </p>
          <Title size={4}>How can you help?</Title>
          <p>
            If you are a backend developer we need your help with getting at more data so we can fill the graphs on the frontend. Frontend
            developers who have experience with React, we need people to help build out more features that will be useful to visitors
            to the website.
          </p>
          <p>
            Everyone, we need help to test the site, provide suggestions and post issues to
            {' '}
            <a href="https://github.com/VirusTrack/covidvu/issues" target="_new" rel="noopener noreferrer">GitHub</a>
            .
          </p>

          <Title size={4}>Helpful Links</Title>
          <ul>
            <li><a href="https://github.com/VirusTrack/COVIDvu/wiki/FAQ" target="_new" rel="noopener noreferrer">The FAQ</a></li>
            <li><a href="https://github.com/VirusTrack/covidvu" target="_new" rel="noopener noreferrer">On GitHub</a></li>
            <li><a href="https://twitter.com/covidvu" target="_new" rel="noopener noreferrer">On Twitter @covidvu</a></li>
            <li><a href="https://join.slack.com/t/covidvu/shared_invite/zt-cwdj01xj-AsW7PuCJMo7yoqmrBGuiGA" target="_new" rel="noopener noreferrer">On Slack</a></li>
          </ul>

          <Title size={4}>What else</Title>
          <p>
            Stay inside. Together (but 6 feet or more away) we can help flatten the curve. We&apos;re hoping that this website can help folks get
            a good idea about why this is important, and the state of their country. These are tools that we hope you&apos;ll share with others. If you
            can donate, please do so.
          </p>

          <Title size={4}>Debug</Title>
          <Level>
            <Level.Item align="left">
              <Button onClick={() => { store.remove(CLIENT_COUNTRY_KEY); store.remove(CLIENT_COUNTRY_CODE_KEY) }}>Clear country cache</Button>
            </Level.Item>
          </Level>
          <Level>
            <Level.Item align="left">
              Change Country:&nbsp;
              <Select.Container>
                <Select
                  defaultValue={store.get(CLIENT_COUNTRY_CODE_KEY)}
                  onChange={(event) => {
                                  const selectedCountryCode = event.target.value
                                  store.set(CLIENT_COUNTRY_KEY, selectedCountryCode === 'US' ? 'US' : isoCountries[selectedCountryCode])
                                  store.set(CLIENT_COUNTRY_CODE_KEY, selectedCountryCode)
                                }}
                >
                  {Object.keys(isoCountries).sort().map((countryCode) => (
                                  <Select.Option key={countryCode} value={countryCode}>{isoCountries[countryCode]}</Select.Option>
                                ))}
                </Select>
              </Select.Container>
            </Level.Item>
          </Level>

        </Content>
      </Box>
    </ContentLayout>
  )
}

export default AboutPage
