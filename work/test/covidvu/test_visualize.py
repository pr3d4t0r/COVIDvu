#!/usr/bin/env python3
# See: https://github.com/VirusTrack/COVIDvu/blob/master/LICENSE
# vim: set fileencoding=utf-8:


from os.path import join

from covidvu.cryostation import Cryostation
from covidvu.predict import loadAll
from covidvu.visualize import castHexToRGBA_string
from covidvu.visualize import hexToRGB
from covidvu.visualize import plotDataAndPredictionsWithCI
from covidvu.visualize import plotPrediction
from covidvu.visualize import plotTimeSeries
from covidvu.visualize import plotTimeSeriesInteractive

import os
import re

import pandas as pd
import numpy as np


# *** constants ***

TEST_SITE_DATA = os.path.join(os.getcwd(), 'resources', 'test_site_data')

# TODO:  https://github.com/VirusTrack/COVIDvu/issues/537
REAL_DATABASE_FILE      = 'virustrack.db'
REAL_DATABASE_PATH      = './database'
REAL_DATABASE_FILE_NAME = os.path.join(REAL_DATABASE_PATH, REAL_DATABASE_FILE)


# *** functions ***
def _makeTimeSeries():
    timeIndex = pd.date_range(start='23-01-2020', end='09-03-2020', freq='1D')
    return pd.DataFrame(index = timeIndex,
                        data  = np.linspace(start=0, stop=10, num=timeIndex.shape[0]))


def _makeTimeSeriesCollection():
    timeIndex = pd.date_range(start='23-01-2020', end='09-03-2020', freq='1D')
    return pd.DataFrame(index   = timeIndex,
                        data    = np.random.uniform(size=(timeIndex.shape[0],2)),
                        columns = ('a', 'b')
                        )


def _purge(purgeDirectory, pattern):
    for f in os.listdir(purgeDirectory):
        if re.search(pattern, f):
            os.remove(join(purgeDirectory, f))


# *** tests ***
def test_plotTimeSeries():
    ts = _makeTimeSeries()
    plotTimeSeries(ts.index,
                   ts.values,
                   'test',
                   'test',
                   color='blue',
                   )

    ts2 = _makeTimeSeries()
    plotTimeSeries(x=(ts.index,
                      ts2.index,
                      ),
                   y=(ts.values,
                      ts2.values
                      ),
                   name=('test',
                         'test2'
                         ),
                   yLabel='test',
                   color=('blue',
                          'green'
                          ),
                   )


def test_plotTimeSeriesInteractive():
    ts = _makeTimeSeriesCollection()
    plotTimeSeriesInteractive(ts,
                              ts.columns,
                              log=False,
                              yLabel='test'
                              )


def test_plotPrediction():
    data = meanPredictionTS = pd.Series(data=np.arange(0,10), index=np.arange(0,10))
    percentilesTS = pd.DataFrame(data=np.ones((10,4)), index = np.arange(0,10),  columns=['2.5', '97.5', '25', '75'])
    countryName = 'US'
    _, _ = plotPrediction(data, meanPredictionTS, percentilesTS, countryName, log=False)


def test_plotDataAndPredictionsWithCI():
    meanPredictionTSAll, percentilesTSAll, = loadAll(siteData=join(TEST_SITE_DATA, 'test-predictions'))

    with Cryostation(REAL_DATABASE_FILE_NAME) as cs:
        confirmedCasesAll = cs.timeSeriesFor() # take defaults

    _ = plotDataAndPredictionsWithCI(meanPredictionTSAll,
                                 confirmedCasesAll,
                                 percentilesTSAll,
                                 ['Albania', 'Algeria'],
                                 )




def test_castHexToRGBA_string():
    rgba = castHexToRGBA_string('#f28500', 0.5)
    assert isinstance(rgba, str)
    r, g, b, a = re.search(r'^rgba\((\d+), (\d+), (\d+), ([0-9].[0-9])\)$',
                           castHexToRGBA_string('#f28500', 0.5)).groups()
    assert isinstance(r, str)
    assert isinstance(g, str)
    assert isinstance(b, str)
    assert isinstance(a, str)


def test_hexToRGB():
    rgb = hexToRGB('#f28500')
    assert isinstance(rgb, tuple)
    assert len(rgb) == 3
