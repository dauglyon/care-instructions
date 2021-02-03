import React, { FC, useState } from 'react';
import './css/App.css';


import { Wash } from './components/Wash/Wash';
import { Bleach } from './components/Bleach/Bleach';
import { Dry } from './components/Dry/Dry';
import { Iron } from './components/Iron/Iron';

import { WashForm, defaultWashOptions } from './components/Wash/WashForm';
import { BleachForm, defaultBleachOptions } from './components/Bleach/BleachForm';
import { DryForm, defaultDryOptions } from './components/Dry/DryForm';
import { IronForm, defaultIronOptions } from './components/Iron/IronForm';

import { WashOptions, BleachOptions, DryOptions, IronOptions } from "./types/options";
import { SVGDownloader } from './components/SVGDownloader';

const App: FC = () => {

  const [wash, setWash] = useState<WashOptions>(defaultWashOptions);
  const [bleach, setBleach] = useState<BleachOptions>(defaultBleachOptions);
  const [dry, setDry] = useState<DryOptions>(defaultDryOptions);
  const [iron, setIron] = useState<IronOptions>(defaultIronOptions);


  return (
    <div className="container">
      <div className="row">
        <div className="twelve columns">
          <h1>Laundry Care Construction</h1>
        </div>
      </div>
      <div className="row">
        <div className="eight columns">
          <h3>Wash</h3>
          <WashForm onChange={setWash} />
        </div>
        <div className="four columns">
          <SVGDownloader>
            <Wash {...wash}></Wash>
          </SVGDownloader>
        </div>
      </div>
      <div className="row">
        <div className="eight columns">
          <h3>Bleach</h3>
          <BleachForm onChange={setBleach} />
        </div>
        <div className="four columns">
          <SVGDownloader>
            <Bleach {...bleach}></Bleach>
          </SVGDownloader>
        </div>
      </div>
      <div className="row">
        <div className="eight columns">
          <h3>Dry</h3>
          <DryForm onChange={setDry} />
        </div>
        <div className="four columns">
          <SVGDownloader>
            <Dry {...dry}></Dry>
          </SVGDownloader>
        </div>
      </div>
      <div className="row">
        <div className="eight columns">
          <h3>Iron</h3>
          <IronForm onChange={setIron} />
        </div>
        <div className="four columns">
          <SVGDownloader>
            <Iron {...iron}></Iron>
          </SVGDownloader>
        </div>
      </div>
    </div>
  );
};

export default App;