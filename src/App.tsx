import React, { FC, useState, useRef } from "react";
import copy from "copy-to-clipboard";

import { ReactComponent as GHLogo } from "./img/github.svg";

import {
  WashForm,
  defaultWashOptions,
  WashIcon,
  washText,
  NoWringIcon,
} from "./components/Wash";
import {
  BleachForm,
  defaultBleachOptions,
  BleachIcon,
  bleachText,
} from "./components/Bleach";
import {
  DryForm,
  defaultDryOptions,
  MainDryIcon,
  dryText,
} from "./components/Dry";
import {
  DrycleanPreview,
  DrycleanForm,
  defaultDrycleanOptions,
} from "./components/Dryclean";
import {
  IronForm,
  defaultIronOptions,
  IronIcon,
  ironText,
} from "./components/Iron";

import {
  WashOptions,
  BleachOptions,
  DryOptions,
  IronOptions,
  DrycleanOptions,
} from "./types/Options";
import { SVGDownloader } from "./components/SVGDownloader";
import { AltDryIcon } from "./components/Dry/index";

const Section: FC<{
  title: string;
  form: React.ReactNode;
  icons: React.ReactNode[];
  text: string;
}> = ({ title, form, icons, text }) => {
  const iconsWrapperRef = useRef<HTMLDivElement>(null);
  return (
    <section className="card block">
      <header className="card-header">
        <p className="card-header-title title is-5">{title}</p>
      </header>

      <div className="card-content columns is-vcentered">
        <div className="column">
          <div
            className="box content"
            style={{
              textAlign: "center",
              paddingLeft: 0,
              paddingRight: 0,
              paddingBottom: 0,
            }}
            ref={iconsWrapperRef}
          >
            <div className="block">{icons}</div>
            <blockquote>{text}</blockquote>
          </div>
        </div>
        <div className="column is-narrow">{form}</div>
      </div>
      <footer className="card-footer">
        <SVGDownloader
          downloadFrom={iconsWrapperRef}
          className="button is-ghost card-footer-item"
        >
          <span className="icon">&#11015;</span>
          <span>Download SVG</span>
        </SVGDownloader>
        <button
          className="button is-ghost card-footer-item"
          onClick={() => {
            copy(text);
          }}
        >
          Copy Text
        </button>
      </footer>
    </section>
  );
};

const App: FC = () => {
  const [wash, setWash] = useState<WashOptions>(defaultWashOptions);
  const [bleach, setBleach] = useState<BleachOptions>(defaultBleachOptions);
  const [dry, setDry] = useState<DryOptions>(defaultDryOptions);
  const [dryclean, setDryclean] = useState<DrycleanOptions>(
    defaultDrycleanOptions
  );
  const [iron, setIron] = useState<IronOptions>(defaultIronOptions);

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">
          Laundry Care Construction{" "}
          <a className="button" href={process.env.REACT_APP_REPO}>
            <span className="icon">
              <GHLogo />
            </span>
            <span>View Source on GitHub</span>
          </a>
        </h1>

        <div className="columns">
          <div className="column is-half">
            <Section
              title="Wash"
              form={<WashForm onChange={setWash} />}
              icons={[<WashIcon {...wash} />, <NoWringIcon {...wash} />]}
              text={washText(wash)}
            ></Section>
            <Section
              title="Bleach"
              form={<BleachForm onChange={setBleach} />}
              icons={[<BleachIcon {...bleach} />]}
              text={bleachText(bleach)}
            ></Section>
            <Section
              title="Dry"
              form={<DryForm onChange={setDry} />}
              icons={[<MainDryIcon {...dry} />, <AltDryIcon {...dry} />]}
              text={dryText(dry)}
            ></Section>
            <Section
              title="Iron"
              form={<IronForm onChange={setIron} />}
              icons={[<IronIcon {...iron} />]}
              text={ironText(iron)}
            ></Section>
            <div style={{ display: "none" }}>
              <div className="column is-two-thirds">
                <h2 className="title is-4">Dryclean</h2>
                <DrycleanForm onChange={setDryclean} />
              </div>
              <div className="column is-one-third">
                <DrycleanPreview {...dryclean}></DrycleanPreview>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <section className="card block">
              <header className="card-header">
                <p className="card-header-title title is-5">
                  Generated Care Instructions
                </p>
              </header>
              <div className="card-content content">
                <div>
                  <WashIcon {...wash} /> <NoWringIcon {...wash} />
                  <BleachIcon {...bleach} />
                  <MainDryIcon {...dry} /> <AltDryIcon {...dry} />
                  <IronIcon {...iron} />
                </div>
                <blockquote>
                  {[
                    washText(wash),
                    bleachText(bleach),
                    dryText(dry),
                    ironText(iron),
                  ].join(". ")}
                </blockquote>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
};

export default App;
